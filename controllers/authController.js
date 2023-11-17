import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from '../models/User.js';
import config from "../config.json" assert { type: 'json' };
import hashPassword from "../utils/hashPassword.js";
import TokenService from "../utils/tokenService.js";
import dbService from "../utils/dbService.js";

export default class authController {

    static async login(req, res) {
        try {
            if(req.cookies.token) {
                jsonwebtoken.verify(req.cookies.token, config.jswt.secretKey, (err) => {
                    if (err)
                        res.clearCookie('token').status(401).end();
                });
            } else {
                const newUser = new User();
                const data = req.body;

                data.password = await hashPassword(data.password);

                let userId = await newUser.check(data);

                if(userId === -1) {
                    res.status(401).send('Invalid login or password');
                    return;
                }

                await newUser.find(userId);

                const token = await TokenService.generateToken({ id: newUser.id , login: newUser.login });

                await newUser.updateField({id: newUser.id, name: 'online', value: true});

                res.cookie("token", token);
                res.json({
                    msg: 'Success',
                    user: {
                        user_id: newUser.id,
                        login: newUser.login,
                        role: newUser.role
                    }
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }


    static async registration(req, res) {
        try {
            const data = req.body;

            if(!data.login || !data.password || !data.email || !data.full_name) {
                res.status(400).end();
                return;
            }

            const userTable = new User();

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
            res.status(200).send("Successful registration");
        } catch (err) {
            console.error("Error: " + err);
            res.status(500).send("Server error");
        }
    }

    static async logout(req, res) {
        try {
            if(req.cookies.token) {
                let id;
                jsonwebtoken.verify(req.cookies.token, "securepass", (err, decoded) => {
                    if (err)
                        throw new Error(err);

                    id = decoded.id;
                });
                const userTable = new User();
                res.clearCookie('token');
                await userTable.updateField({id: id, name: 'online', value: false});
            }
            res.status(200).send("Successful logout");
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }

    static async password_reset(req, res) {
        try {
            const token = await TokenService.generateToken({email: req.body.email});
            const transporter = nodemailer.createTransport(config.nodemailer);
            const url = `http://127.0.0.1:8080/password-reset/${token}`;
            await transporter.sendMail({
                from: "raddzor.101@gmail.com",
                to: req.body.email,
                subject: 'Confirm Password Reset',
                html: `<a href="${url}">Please click on this text to confirm your password reset on forum.</a>`,
            });
            res.status(200).send("Success");
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }

    static async set_new_password(req, res) {
        try {
            const token = req.params.confirmToken;
            let email;
            await TokenService.getTokenData(token).then(value => email = value.email);
            const hash = await hashPassword(req.body.password);

            const sql = `UPDATE users SET password = ? WHERE email = ? ; `;

            await dbService.makeRequest(sql);

            res.status(200).send("Success");
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }
}