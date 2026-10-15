import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Bạn không được phép thay đổi thông tin người dùng này'));
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
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Mật khẩu phải bao gồm ít nhất 6 kí tự'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              profilePicture: req.body.profilePicture,
              password: req.body.password,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }
}

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'Bạn không được phép xóa người dùng này'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('Người dùng đã được xóa');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('Đã đăng xuất');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'Bạn không được phép xem thông tin các người dùng'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'Không tìm thấy người dùng'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json("Vui lòng nhập đầy đủ thông tin đăng nhập")
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Người dùng không tồn tại!'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Sai mật khẩu!'
      });
    }

    // save session
    req.session = req.session || {};
    req.session.userId = user._id;

    const token = jwt.sign(
        {
            id: validUser._id,
            isAdmin: validUser.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: '43200s' }
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Đăng nhập thành công'
    // });
    const {password: pass, ...rest} = validUser._doc;
    res.status(200).cookie(
      'access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 43200000)
    }).json({success: true, message: 'Đăng nhập thành công'});

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false, 
      message: 'Lỗi khi đăng nhập',
    });
  }
};