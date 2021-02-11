const pool = require('../../config/database');

module.exports = {
    // Post Data
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
            values (?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    // Get Data 
    getUsers: callBack => {
        pool.query(
            `select id, firstName, lastName, gender, email, number from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },
    // Get User by ID 
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, firstName, lastName, gender, email, number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        );
    },
    // Update Data
    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstName = ?, lastName = ?, gender = ?,
             email = ?, password = ?, number = ? where id = ?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        );
    },
    // Delete Data
    deleteUser: (id, callBack) => {
        pool.query(
            `delete from registration where id = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }

        );
    },

    // for authentication
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            'select * from registration where email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};