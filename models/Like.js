import Model from "./Model.js";
import dbService from "../utils/dbService.js";
import moment from "moment"

export default class Like extends Model {
    constructor() {
        super("likes");
    }

    async selectByEntity(entity_type, entity_id) {
        try {
            const sql = "SELECT * FROM likes WHERE entity_type = ? AND entity_id = ?;";

            return await dbService.makeRequest(sql, [entity_type, entity_id]);
        } catch (err) {
            throw err;
        }
    }

    async selectByUser(user_id, entity_type, entity_id) {
        try {
            const sql = "SELECT * FROM likes WHERE user_id = ? AND entity_type = ?  AND entity_id = ?";
            return await dbService.makeRequest(sql, [user_id, entity_type, entity_id]);
        } catch (err) {
            throw err;
        }
    }

    async create(user_id, entity_type, entity_id, type) {
        try {
            const sql = "INSERT INTO likes (user_id, publish_date, entity_type, entity_id, type) VALUES (?, ?, ?, ?, ?);";

            return await dbService.makeRequest(sql, [user_id, moment().format('YYYY-MM-DD HH:mm:ss'),  entity_type, entity_id, type]);
        } catch (err) {
            throw err;
        }
    }

    async checkAccess(entity_id, user_id) {
        try {
            let sql = "SELECT user_id FROM likes WHERE id = ? LIMIT 1; ";
            let result = await dbService.makeRequest(sql, [entity_id]);

            return result[0][0].user_id === user_id;
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(type, id) {
        try {
            const sql = "DELETE FROM likes WHERE entity_type = ? AND entity_id = ?;";
            const result = await dbService.makeRequest(sql, [type, id]);

        } catch (err) {
            throw new Error(err);
        }
    }
}