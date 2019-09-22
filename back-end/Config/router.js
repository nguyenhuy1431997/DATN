const userRouter = require("../Routers/user");

const authRouter = require("../Routers/auth");

const district = require("../Routers/district");

const roomType = require("../Routers/roomType");

const imageType = require("../Routers/imageType");

const room = require("../Routers/room");

const roomImage = require("../Routers/roomImage");

const app = require("./app");

const apiPrefix = "/api/v1";
//Router
app.use(`${apiPrefix}/auth`, authRouter);

app.use(`${apiPrefix}/users`, userRouter);

app.use(`${apiPrefix}/districts`, district);

app.use(`${apiPrefix}/roomtypes`, roomType);

app.use(`${apiPrefix}/imagetypes`, imageType);

app.use(`${apiPrefix}/rooms`, room);

app.use(`${apiPrefix}/roomimages`, roomImage);
