import Model from "./Model.js";
import dbService from "../utils/dbService.js";
import moment from "moment";

export default class Post extends Model {

    constructor() {
        super("posts");
    }

    async selectCategoryPosts(category_id) {
        try {
            const sql = "SELECT * FROM posts INNER JOIN postscategories ON posts.id = postscategories.post_id WHERE category_id = ?;";

            return await dbService.makeRequest(sql, [category_id]);
        } catch (err) {
            throw err;
        }
    }

    async selectAll(user_id, user_role, filters) {
        try {
            let sql = "SELECT posts.id, posts.author_id, posts.title, posts.publish_date, posts.status, posts.content, users.login FROM posts, users WHERE posts.author_id = users.id"
            const params = [];

            if (filters.dateFrom) {
                sql += " AND publish_date >= ?";
                params.push(filters.dateFrom);
            }

            if (filters.dateTo) {
                sql += " AND publish_date <= ?";
                params.push(filters.dateTo);
            }

            if (filters.status && user_role === "admin") {
                sql += " AND status = ?";
                params.push(filters.status);
            } else {
                sql += " AND status = true OR (status = false AND author_id = ?)";
                params.push(user_id);
            }

            if (filters.category && filters.category.length > 0) {
                for(let element of filters.category.split(","))
                    sql += ` AND posts.id IN (
                            SELECT post_id
                            FROM postsCategories
                            JOIN categories ON postsCategories.category_id = categories.id
                            WHERE categories.name IN (${element})
                            )`;
            }

            if (filters.sortBy !== "date") {
                sql += ' ORDER BY (SELECT COUNT(*) FROM likes WHERE entity_id = posts.id AND entity_type = 1) DESC';
            } else {
                sql += ' ORDER BY publish_date DESC';
            }

            return await dbService.makeRequest(sql + ";", params);

        } catch (err) {
            throw err;
        }
    }

    async checkAccess(post_id, user_id) {
        try {
            const sql = "SELECT posts.author_id FROM posts WHERE id = ?; ";
            const result = await dbService.makeRequest(sql, [post_id]);
            return result[0][0].author_id === user_id;
        } catch (err) {
            throw err;
        }
    }

    async delete(post_id) {
        try {
            const sql = 'DELETE FROM posts WHERE id = ?';
            return await dbService.makeRequest(sql, [post_id]);
        } catch (err) {
            throw err;
        }
    }

    async create(user_id, title, content) {
        try {
            const sql = "INSERT INTO posts (author_id, title, publish_date, content) VALUES (?, ?, ?, ?);";
            return await dbService.makeRequest(sql, [user_id, title, moment().format('YYYY-MM-DD HH:mm:ss'), content]);
        } catch (err) {
            throw err;
        }
    }

    async selectId(userId, postId, role) {
        try {
            let sql = "SELECT * FROM posts WHERE id = ?";

            if(role === "user")
                sql += ` AND (status = true OR author_id = ${userId})`;

            return await dbService.makeRequest(sql + ";", [postId]);
        } catch (err) {
            throw err;
        }
    }

}