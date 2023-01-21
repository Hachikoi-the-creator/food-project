const {
  CLOUD_USER,
  CLOUD_PSW,
  CLOUD_HOST,
  CLOUD_PORT,
  CLOUD_DB_NAME,
  LOCAL_DB_PSW,
} = process.env;

const USERNAME = CLOUD_USER || "postgres";
const THE_PSW = CLOUD_PSW || LOCAL_DB_PSW;
const HOST_AND_PORT = CLOUD_PORT
  ? `${CLOUD_HOST}:${CLOUD_PORT}`
  : "localhost:5432";
const DATABASE = CLOUD_DB_NAME || "food";

const CONNECTION_STRING = `postgres://${USERNAME}:${THE_PSW}@${HOST_AND_PORT}/${DATABASE}`;

module.exports = CONNECTION_STRING;
