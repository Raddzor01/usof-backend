import express from "express";

import TokenService from "../utils/tokenService.js";
import controller from "../controllers/postsController.js";

const router = express.Router();

router.get('/', TokenService.checkToken, controller.getAllPosts);
router.get('/:postId', TokenService.checkToken, controller.getPostData);
router.get('/:postId/comments', TokenService.checkToken, controller.getPostComments);
router.post('/:postId/comments', TokenService.checkToken, controller.postComment);
router.get('/:postId/categories', TokenService.checkToken, controller.getPostCategories);
router.get('/:postId/like', TokenService.checkToken, controller.getPostLikes);
router.post('/', TokenService.checkToken, controller.createPost);
router.post('/:postId/like', TokenService.checkToken, controller.postLike);
router.patch('/:postId', TokenService.checkToken, controller.updatePost);
router.delete('/:postId', TokenService.checkToken, controller.deletePost);

export default router;