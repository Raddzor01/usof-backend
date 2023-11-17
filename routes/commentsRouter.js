import express from "express";

import controller from "../controllers/commentsController.js"

const router = express.Router();

router.get('/:commentId', controller.getComment);
router.get('/:commentId/like', controller.getCommentLikes);
router.post('/:commentId/like', controller.postLike);
router.patch('/:commentId', controller.updateComment);
router.delete('/:commentId', controller.deleteComment);
router.delete('/:commentId/like', controller.deleteCommentLike);

export default router;