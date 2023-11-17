import express from "express";

import controller from "../controllers/categoriesController.js";

const router = express.Router();

router.get('/', controller.getAllCategories);
router.get('/:categoryId', controller.getCategory);
router.get('/:categoryId/posts', controller.getCategoryPosts);
router.post('/', controller.createCategory);
router.patch('/:categoryId', controller.updateCategory);
router.delete('/:categoryId', controller.deleteCategory);

export default router;