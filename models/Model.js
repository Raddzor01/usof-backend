import dbService from "../utils/dbService.js";

export default class Model {

    constructor(table) {
        this.table = table;
    }

    async save(data) {
        const propertyValues = [];
        for(const property in data)
            if (property !== "id")
                propertyValues.push(data[property]);

        const sql = `INSERT INTO ${this.table} (login, email, password) VALUES (?, ?, ?);`;
        let res = await dbService.makeRequest(sql);

        if (typeof res === 'string')
            return res;

        if(!data.id)
            return res[0].insertId;

        return res[0].affectedRows;
    }

    async find(id) {
        try {
            const sql = 'SELECT * FROM ' + this.table + ' WHERE id = ' + id + ';';
            return await dbService.makeRequest(sql);
        } catch (error) {
            console.error('Ошибка SQL:', error.message);
            return null;
        }
    }

    async checkData(data) {
        const sql = 'SELECT * FROM ' + this.table + ' WHERE ' + data.name + ' = \'' + data.value + '\';';
        const result = await dbService.makeRequest(sql);
        return !!result[0].length;
    }


    async updateField(data) {
        try {
            const sql = `UPDATE ${this.table} SET ${data.name} = ? WHERE id = ? ;`;
            await dbService.makeRequest(sql, [data.value, data.id]);
        } catch (err) {
            throw err;
        }
    }
}