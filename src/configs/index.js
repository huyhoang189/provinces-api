"use strict";

require("dotenv").config();

const config = {
    api: {
        port: process.env.DEV_PORT_APP || 3030,
    },
    database: {
        database: process.env.DEV_DB_NAME || "adapter_86z",
        username: "username",
        password: "password",
        port: process.env.DEV_DB_PORT || 27017,
        host: process.env.DEV_DB_HOST || "localhost",
        dialect: process.env.DEV_DB_TYPE || "mongodb",
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
    },
    secretKeyJWT: process.env.SECRET_KEY,
};

module.exports = config;