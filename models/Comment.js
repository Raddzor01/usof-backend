import Model from "./Model.js";
import dbService from "../utils/dbService.js";
import moment from "moment/moment.js";

export default class Comments extends Model {

    constructor() {
        super("comments");
    }

    async delete(comment_id) {
        try {
            const sql = "DELETE FROM comments WHERE id = ?;";

            return await dbService.makeRequest(sql, [comment_id]);
        } catch (err) {
            throw err;
        }
    }

    async checkAccess(comment_id, user_id) {
        try {
            let sql = "SELECT author_id FROM comments WHERE id = ?; ";
            let result = await dbService.makeRequest(sql, [comment_id]);

            return result[0][0].author_id === user_id;
        } catch (err) {
            throw new Error(err);
        }
    }

    async create(user_id, content, postId) {
        try {
            let sql = "INSERT INTO comments (author_id, publish_date, content, post_id) VALUES (?, ?, ?, ?)";

            return await dbService.makeRequest(sql, [user_id, moment().format('YYYY-MM-DD HH:mm:ss'), content, postId]);
        } catch (err) {
            throw new Error(err);
        }
    }

    async selectByPost(post_id) {
        try {
            const sql = "SELECT * FROM comments WHERE post_id = ? ;";

            return await dbService.makeRequest(sql, [post_id]);
        } catch (err) {
            throw err;
        }
    }

    async selectById(comment_id) {
        try {
            const sql = "SELECT * FROM comments WHERE id = ? ;";

            return await dbService.makeRequest(sql, [comment_id]);
        } catch (err) {
            throw err;
        }
    }
}