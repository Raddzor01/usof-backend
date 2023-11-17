import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class Category extends Model {

    constructor() {
        super("categories");
    }

    async selectAll() {
        try {
            const sql = "SELECT * FROM categories;";

            return await dbService.makeRequest(sql);
        } catch (err) {
            throw err;
        }
    }

    async selectById(category_id) {
        try {
            const sql = "SELECT * FROM categories WHERE id = ?;";

            return await dbService.makeRequest(sql, [category_id]);
        } catch (err) {
            throw err;
        }
    }

    async selectPostCategories(postId) {
        try {
            const sql = "SELECT * FROM categories INNER JOIN postscategories ON categories.id = postscategories.category_id WHERE post_id = ? ;";

            return await dbService.makeRequest(sql, [postId]);
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(category_id) {
        try {
            const sql = "DELETE FROM categories WHERE id = ?;";

            return await dbService.makeRequest(sql, [category_id]);
        } catch (err) {
            throw err;
        }
    }

    async create(title, description = "") {
        try {
            let sql = "INSERT INTO categories(title, description) VALUES(?, ?);";

            return await dbService.makeRequest(sql, [title, description]);
        } catch (err) {
            throw new Error(err);
        }
    }

}