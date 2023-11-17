import express from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = express.Router();

router.use("/auth", (req, res, next) => next(), authRouter);
router.use('/users', (req, res, next) => next(), usersRouter);
router.use('/posts', (req, res, next) => next(), postsRouter);
router.use('/categories', (req, res, next) => next(), categoriesRouter);
router.use('/comments', (req, res, next) => next(), commentsRouter);

export default router;