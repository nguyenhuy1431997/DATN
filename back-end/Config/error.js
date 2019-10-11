const app = require("./app");

app.use((req, res, next) => {
  next({
    code: 404,
    data: null
  });
});

app.use((error, req, res, next) => {
  return res.status(200).json(error);
});
