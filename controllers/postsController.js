import User from '../models/User.js';
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import dbService from "../utils/dbService.js";
import TokenService from "../utils/tokenService.js";
import moment from "moment";
import Category from "../models/Category.js";
import Like from "../models/Like.js";

export default class postsController {

    static async deletePost(req, res, next) {
        try {
            const usersTable = new User();
            const postsTable = new Post();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userRole = await usersTable.checkPermission(tokenData.id);
            const { postId } = req.params;

            if (!await postsTable.checkAccess(postId, tokenData.id) && userRole !== "admin") {
                res.status(401).send("Access denied");
                return;
            }

            await postsTable.delete(postId);

            res.status(200).send("Post successfully deleted");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const postsTable = new Post();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const postId = req.params.postId;

            if(!await postsTable.checkAccess(postId, tokenData.id)) {
                res.status(401).send("Access denied");
                return;
            }

            const names = req.body.names.split(",");
            const values = req.body.values.split(",");

            if(values.length !== names.length) {
                res.status(400).end();
                return;
            }

            for (let i = 0; i < names.length; i++)
                await postsTable.updateField({id: postId, name: names[i], value: values[i]});

            res.status(200).send("Success post update");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async postLike(req, res, next) {
        try {
            const likesTable = new Like();

            const postId = req.params.postId;

            if(!req.body.type) {
                res.status(400).end();
                return;
            }

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const like = await likesTable.selectByUser(tokenData.id, 1, postId);

            if(like[0][0]) {
                res.status(200).send("Like exists");
                return;
            }

            const result = await likesTable.create(tokenData.id, 1, postId, req.body.type);
            const like_id = result[0].insertId;

            res.status(200).json({
                msg: "Success like creation",
                like_id: like_id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async createPost(req, res, next) {
        try {
            const { title, content, categories } = req.body;

            if(!title || !content) {
                res.status(400).end();
                return;
            }

            const postsTable = new Post();

            const tokenData = await TokenService.getTokenData(req.cookies.token);

            const result = await postsTable.create(tokenData.id, title, content);
            const post_id = result[0].insertId;

            if(categories) {
                const sql = "INSERT INTO postscategories (post_id, category_id) VALUES (?, ?)";

                for(let element of categories.split(","))
                    await dbService.makeRequest(sql, [post_id, element]);
            }

            res.status(200).json({
                msg: "Success post creation",
                post_id: post_id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async getPostLikes(req, res, next) {
        try {
            const likesTable = new Like();

            const postId = req.params.postId;

            const result = await likesTable.selectByEntity(1, postId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async getPostCategories(req, res, next) {
        try {
            const categoriesTable = new Category();

            const postId = req.params.postId;

            const result = await categoriesTable.selectPostCategories(postId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async postComment(req, res, next) {
        try {

            const { content } = req.body;
            const postId = req.params.postId;

            if(!content) {
                res.status(402).end();
                return;
            }

            const usersTable = new User();
            const commentsTable = new Comment();

            const tokenData = await TokenService.getTokenData(req.cookies.token);

            const userRole = await usersTable.checkPermission(tokenData.id);

            if(userRole !== "admin") {
                let sql = "SELECT posts.status, posts.author_id FROM posts WHERE id = ?; ";
                let result = await dbService.makeRequest(sql, [postId]);

                if(result[0].status === false && result[0].author_id !== tokenData.id) {
                    res.status(401).send("Access denied");
                    return;
                }
            }

            const result = await commentsTable.create(tokenData.id, content, postId);
            const comment_id = result[0].insertId;

            res.status(200).json({
                msg: "Successful comment post",
                comment_id: comment_id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async getPostComments(req, res, next) {
        try {
            const commentsTable = new Comment();

            const postId = req.params.postId;

            const result = await commentsTable.selectByPost(postId);

            res.status(200).json(result[0]);
        } catch (err) {
            next(err);
        }
    }

    static async getPostData(req, res) {
        try {
            const userTable = new User();
            const postsTable = new Post();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const postId = req.params.postId;

            const userRole = await userTable.checkPermission(tokenData.id);

            const result = await postsTable.selectId(tokenData.id, postId, userRole);

            res.status(200).json(result[0]);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getAllPosts(req, res) {
        try {
            const usersTable = new User();
            const postsTable = new Post();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userRole = await usersTable.checkPermission(tokenData.id);
            const filters = {
                category: req.body.category,
                dateFrom: req.body.dateFrom,
                dateTo: req.body.dateTo,
                status: req.body.status,
                sortBy: req.body.sortBy
            };

            const result = await postsTable.selectAll(tokenData.id, userRole, filters);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

}
