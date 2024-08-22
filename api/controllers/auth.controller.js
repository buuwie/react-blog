import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'Vui lòng nhập đầy đủ thông tin!'));
    }
    if (req.body.username) {
      if (req.body.username.length < 5 || req.body.username.length > 20) {
          return next(errorHandler(400, 'Tên người dùng phải bao gồm từ 5 đến 20 kí tự'));
      }
      if (req.body.username.includes(' ')) {
          return next(errorHandler(400, 'Tên người dùng không bao gồm khoảng trống'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, 'Tên người dùng không được in hoa'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandler(400, 'Tên người dùng chỉ bao gồm chữ cái và số')
          );
      }
      const existUsername = await User.findOne({username: req.body.username})
      if (existUsername) {
        return next(errorHandler(400, 'Tên người dùng này đã tồn tại'))
      }
  }

    const hash = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username, email, password: hash,
    });

    try {
        await newUser.save();
        res.json({message: 'Đăng kí thành công'});
    } catch (error) {
        next(error);
    }
    
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !email || !password || email === '' || password === '') {
        next(errorHandler(400, 'Vui lòng nhập đầy đủ thông tin đăng nhập!'));
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'Người dùng không tồn tại (Hãy kiểm tra lại email)!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(404, 'Sai mật khẩu!'));
        }
        const token = jwt.sign(
            {
                id: validUser._id,
                isAdmin: validUser.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '43200s' }
        );

        const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie(
          'access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 43200000)
        }).json(rest);
    } catch (error) { 
        next(error)
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '43200s' }
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 43200000)
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '43200s' }
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 43200000)
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };