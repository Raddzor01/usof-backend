import jsonwebtoken from "jsonwebtoken";
import config from "../config.json" assert { type: 'json' };
export default class TokenService {

    static async generateToken(payload) {
        try {
            return jsonwebtoken.sign(payload, config.jswt.secretKey, {expiresIn: config.jswt.tokenLife});
        } catch (err) {
            throw err;
        }
    }

    static async checkToken(req, res, next) {
        let token = req.cookies.token;
        if (!token) {
            res.status(401).end();
            return;
        }
        jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
            if (err) {
                res.status(401).clearCookie('token').end();
                return;
            }
            req.user = decoded;
        });
        next();
    }

    static async getTokenData(token) {
        let data;
        if (!token)
            return false;
        jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
            if (err) {
                return false;
            }
            data = decoded;
        });
        return data;
    }
}
