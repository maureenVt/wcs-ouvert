const mysql = require('mysql');
const jwtSecret = process.env.DB_JWTSECRET;

const dbHandle = mysql.createConnection(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${
    process.env.DB_DATABASE
  }`
);
dbHandle.connect(err => {
  if (err) throw err;
});

const userTransporter = {
  user: process.env.DBTRANSPORTER_USER,
  pass: process.env.DBTRANSPORTER_PASSWORD
};

const apiKey = {
  key: process.env.DB_APIKEY
};

const saltRounds = process.env.DB_SALTROUND;
const portServer = process.env.DB_PORTSERVER;
module.exports = {
  userTransporter,
  jwtSecret,
  dbHandle,
  saltRounds,
  portServer,
  apiKey
};
