import mysql from 'mysql2';
import config from '../config.json' assert { type: 'json' };

export default class dbService {
    static async makeRequest(sql, values = null) {
        try {
            const db = await this.connectToDatabase();
            let result = await db.promise().execute(sql, values).catch(reason => { throw new Error(reason.sqlMessage) });
            db.end();

            return result;
        } catch (err) {
            throw err;
        }
    }

    static async connectToDatabase() {
        const db = mysql.createConnection(config.db);
        db.connect((err) => {
            if (err) return console.error("Error: " + err.message);
        });
        return db;
    }
}