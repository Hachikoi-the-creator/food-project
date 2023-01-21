const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 1313;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`-_-listening on localhost:${PORT}`); // eslint-disable-line no-console
  });
});
