const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign, JsonWebTokenError } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });

        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            return res.json({
                success: 1,
                data: "Updated Successfully"
            });

        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results ) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            
            }
            console.log(res.affectedRows);
            return res.json({
                success: 1,
                data: "User Deleted Successfully"
            });
        });
    },
    // for authentication
    login: (req, res) => {
        const body = req.body;

        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "apiPractice30041904", {
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: "Login Successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password",

                });
            }

        });
    }

}