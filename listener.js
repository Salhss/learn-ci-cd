const { app, PORT } = require("./app");
const connectToMongoDB = require("./config/mongoConnect");

// -- CONNECT MONGODB --

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
});
