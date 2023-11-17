import User from '../models/User.js';
import Category from "../models/Category.js";
import TokenService from "../utils/tokenService.js";
import dbService from "../utils/dbService.js";
import Post from "../models/Post.js";

export default class categoriesController {

    static async updateCategory(req, res) {
        try {

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userTable = new User();

            if(await userTable.checkPermission(tokenData.id) !== "admin") {
                res.status(403).send("Permission denied");
                return;
            }

            const categoriesTable = new Category();

            const names = req.body.names.split(",");
            const values = req.body.values.split(",");

            if(values.length !== names.length) {
                res.status(400).end();
                return;
            }

            for (let i = 0; i < names.length; i++)
                await categoriesTable.updateField({id: req.params.categoryId, name: names[i], value: values[i]});

            res.status(200).send("Successful category update");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

    static async deleteCategory(req, res) {
        try {
            const userTable = new User();
            const categoriesTable = new Category();

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const categoryId = req.params.categoryId;

            if(await userTable.checkPermission(tokenData.id) !== "admin") {
                res.status(403).send("Permission denied");
                return;
            }

            await categoriesTable.delete(categoryId);

            res.status(200).send("Successful category delete");
        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }

    static async getCategoryPosts(req, res) {
        try {
            const postsTable = new Post();

            const categoryId = req.params.categoryId;

            const result = await postsTable.selectCategoryPosts(categoryId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

    static async createCategory(req, res) {
        try {
            const [title, description] = req.body;

            if(!title) {
                res.status(401).end();
                return;
            }

            const categoriesTable = new Category();

            const result = await categoriesTable.create(title, description);

            res.status(200).json({
                id: result[0].insertId,
                msg: "Successful category creation"
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

    static async getCategory(req, res) {
        try {
            const categoriesTable = new Category();

            const categoryId = req.params.categoryId;

            const result = await categoriesTable.selectById(categoryId);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

    static async getAllCategories(req, res) {
        try {
            const categoriesTable = new Category();

            const result = await categoriesTable.selectAll();

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("" + err);
        }
    }
}