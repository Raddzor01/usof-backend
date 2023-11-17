import config from "../config.json" assert { type: 'json' };
import User from '../models/User.js';
import TokenService from "../utils/tokenService.js";
import dbService from "../utils/dbService.js";
import hashPassword from "../utils/hashPassword.js";
import nodemailer from "nodemailer";

export default class usersController {


    static async updateAvatar(req, res) {
        try {
            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userTable = new User();

            if(await userTable.checkPermission(tokenData.id) !== "admin" || req.body.userId === tokenData.id) {
                res.status(403).send("Permission denied");
                return;
            }

            const filePath = '/pics/IMG_' + Date.now() + '.' + req.files.photo.name.split('.').pop();
            await req.files.photo.mv("public" + filePath);
            await userTable.updateField({id: req.body.userId, name: 'picture', value: filePath});

            res.status(200).send("Successful photo update");
        } catch (err) {
            console.error("Error: " + err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async deleteUser(req, res) {
        try {
            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userTable = new User();

            if(await userTable.checkPermission(tokenData.id) !== "admin" || req.params.userId === tokenData.id) {
                res.status(403).send("Permission denied");
                return;
            }

            const sql = 'DELETE FROM users WHERE id = ?';

            let result = await dbService.makeRequest(sql, [req.params.userId]);

            if(typeof result === "string")
                throw new Error(result);

            res.status(200).send("User successfully deleted");
        } catch (err) {
            console.error("Error: " + err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async updateUserData(req, res) {
        try {
            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userTable = new User();

            if(await userTable.checkPermission(tokenData.id) !== "admin" || req.params.userId === tokenData.id) {
                res.status(403).send("Permission denied");
                return;
            }

            const names = req.body.names.split(",");
            const values = req.body.values.split(",");

            if(values.length !== names.length) {
                res.status(400).end();
                return;
            }

            for (let i = 0; i < names.length; i++)
                await userTable.updateField({id: req.params.userId, name: names[i], value: values[i]});

            res.status(200).send("Successful user data update");
        } catch (err) {
            console.error("Error: " + err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async createUser(req, res) {
        try {
            const data = req.body;

            if(!data.login || !data.password || !data.email || !data.full_name || !data.role) {
                res.status(400).end();
                return;
            }

            const tokenData = await TokenService.getTokenData(req.cookies.token);
            const userTable = new User();

            if(await userTable.checkPermission(tokenData.id) !== "admin") {
                res.status(403).send("Permission denied");
                return;
            }

            if (await userTable.checkData({ name: 'login', value: data.login })) {
                res.status(409).send('User exists');
                return;
            }

            if(await userTable.checkData({ name: 'email', value: data.email })) {
                res.status(409).send('Email in use');
                return;
            }

            data.password = await hashPassword(data.password);

            let err = await userTable.save(data);
            if(err)
                throw new Error(err);

            const token = await TokenService.generateToken({email: req.body.email});
            const transporter = nodemailer.createTransport(config.nodemailer);
            await transporter.sendMail({
                to: data.email,
                subject: 'Registration on forum',
                html: `Please click this email to confirm your email: <a href="http://127.0.0.1:8080/confirm-email/${token}">Click here</a>`,
            });
            res.status(200).send("Successful user creation");
        } catch (err) {
            console.error("Error: " + err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async getUserData(req, res){
        try {
            const userId = req.params.userId;
            const sql = 'SELECT id, login, rating, role, online, picture FROM users WHERE id = ?;';

            let result = await dbService.makeRequest(sql, [userId]);

            if(typeof result === "string")
                throw new Error(result);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }

    static async getAllUsers(req, res) {
        try {
            const sql = 'SELECT id, login, rating, role, online, picture FROM users;';

            let result = await dbService.makeRequest(sql);

            if(typeof result === "string")
                throw new Error(result);

            res.status(200).json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error: " + err);
        }
    }
}

