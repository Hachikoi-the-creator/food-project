const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = 1313;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`-_-listening on localhost:${PORT}`); // eslint-disable-line no-console
  });
});

// TODO: ADD ANIME GIRL
