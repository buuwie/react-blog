import Post from "../models/post.model.js";
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'Bạn không được phép tạo bài viết mới'));
      }
      if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết'));
      }
      if (req.body.title) {
        const existingTitle = await Post.findOne({title: req.body.title})
        if (existingTitle) return next(errorHandler(400, 'Tiêu đề này đã tồn tại'))
      } 
    
      const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
      const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
      });
      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }
      
}

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
            $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
        }),
        })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });

    } catch (error) {
        next(error);
    }
}

export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Bạn không có quyền xóa bài viết này'));
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json('Bài viết đã được xóa');
    } catch (error) {
      next(error);
    }
  };

export const getRandomPostsByCategory = async (req, res, next) => {
  try {
    const category = req.query.category
    const limit = parseInt(req.query.limit) || 3; // Số lượng bài viết ngẫu nhiên cần lấy, mặc định là 5
    const matchStage = category ? { $match: { category } } : null;
    const sampleStage = { $sample: { size: limit } };

    const pipeline = [];
    if (matchStage) pipeline.push(matchStage);
    pipeline.push(sampleStage);

    const randomPostsByCategory = await Post.aggregate(pipeline);

    res.status(200).json({
      randomPostsByCategory,
    });

  } catch (error) {
      next(error);
  }
}

export const getRandomPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3; // Số lượng bài viết ngẫu nhiên cần lấy, mặc định là 5

    const randomPosts = await Post.aggregate([
      { $sample: { size: limit } }
  ]);

    res.status(200).json({
      randomPosts,
    });

  } catch (error) {
      next(error);
  }
}
  
  export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Bạn không có quyền chỉnh sửa bài viết này'));
    }
    try {
      const currentPost = await Post.findById(req.params.postId);
      if (!currentPost) {
        return next(errorHandler(404, 'Bài viết không tồn tại'));
      }

      // Check if title has changed
      if (req.body.title && req.body.title !== currentPost.title) {
        const existingTitle = await Post.findOne({ title: req.body.title });
        if (existingTitle) {
          return next(errorHandler(400, 'Tiêu đề này đã tồn tại'));
        }
      }
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };