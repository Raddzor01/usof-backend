import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class User extends Model {
    constructor() {
        super("users");
    }

    async login() {
        try {

        } catch (err) {

        }
    }

    async save(data) {
        const sql = `INSERT INTO users(login, full_name, email, password) VALUES(?, ?, ?, ?);`;
        let res = await dbService.makeRequest(sql, [data.login, data.full_name, data.email, data.password]);

        return this.find(res[0].insertId);

    }

    async find(id) {
        const data = await super.find(id);
        this.id = data[0][0].id;
        this.login = data[0][0].login;
        this.password = data[0][0].password;
        this.email = data[0][0].email;
        this.picture_path = data[0][0].picture_path;
        this.wins = data[0][0].wins;
        this.loses = data[0][0].loses;
        this.full_name = data[0][0].full_name;
    }

    async check(data) {
        const sql = 'SELECT * FROM users WHERE login=? AND password=?;';

        let result = await dbService.makeRequest(sql, [data.login, data.password]);

        if (result[0].length)
            return result[0][0].id;
        return -1;
    }

    async checkPermission(id) {
        try {
            const sql = 'SELECT role FROM users WHERE id = ?;';
            let result = await dbService.makeRequest(sql, [id]);

            if(typeof result === "string")
                return new Error(result);
            else
                return result[0][0].role === 2 ? "admin" : "user";
        } catch (err) {
            throw err;
        }
    }
}