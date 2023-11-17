import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Like from "../models/Like.js";
import TokenService from "../utils/tokenService.js";
import dbService from "../utils/dbService.js";
import moment from "moment";

export default class commentsController {

    static async updateComment(req, res) {
        try {
            const commentsTable = new Comment();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const commentId = req.params.commentId;
            const { content } = req.body;

            if (!await commentsTable.checkAccess(commentId, tokenData.id)) {
                res.status(401).send("Access denied");
                return;
            }

            await commentsTable.updateField({id: commentId, name: "content", value: content });

            res.status(200).json("Success comment update");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async deleteCommentLike(req, res) {
        try {
            const likesTable = new Like();

            const tokenData = await TokenService.getTokenData(req.cookies.token);

            const commentId = req.params.commentId;

            if (!await likesTable.checkAccess(commentId, tokenData.id)) {
                res.status(401).send("Access denied");
                return;
            }

            await likesTable.delete(0, commentId);

            res.status(200).send("Successful comment like delete");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

    static async deleteComment(req, res) {
        try {
            const usersTable = new User();
            const commentsTable = new Comment();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const commentId = req.params.commentId;

            if (!await commentsTable.checkAccess(commentId, tokenData.id) && await usersTable.checkPermission(tokenData.id) !== "admin") {
                res.status(401).send("Access denied");
                return;
            }

            await commentsTable.delete(commentId);

            res.status(200).send("Successful comment delete");
        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }

    static async postLike(req, res) {
        try {
            const likesTable = new Like();

            const commentId = req.params.commentId;

            if(!req.body.type) {
                res.status(400).end();
                return;
            }

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const like = await likesTable.selectByUser(tokenData.id, 0, commentId);

            if(like[0][0]) {
                res.status(200).send("Like exists");
                return;
            }

            const result = await likesTable.create(tokenData.id, 0, commentId, req.body.type);
            const like_id = result[0].insertId;

            res.status(200).json({
                msg: "Success like creation",
                like_id: like_id
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }

    static async getCommentLikes(req, res) {
        try {
            const likesTable = new Like();
            const commentId = req.params.commentId;

            const result = await likesTable.selectByEntity(0, commentId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }

    static async getComment(req, res) {
        try {
            const commentsTable = new Comment();

            const commentId = req.params.commentId;

            const result = await commentsTable.selectById(commentId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }

}