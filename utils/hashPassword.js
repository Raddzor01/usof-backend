import crypto from "crypto";

export default async function hashPassword(password) {
    try {
        const hash = crypto.createHmac('sha512', 'salt');
        hash.update(password);
        return hash.digest('hex');
    } catch (err) {
        throw err;
    }
}