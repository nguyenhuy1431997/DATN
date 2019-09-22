const userRouter = require("../Routers/user");

const authRouter = require("../Routers/auth");

const teamRouter = require("../Routers/Team");

const productAge = require("../Routers/productAge");

const productGender = require("../Routers/productGender");

const productType = require("../Routers/productType");

const productColor = require("../Routers/productColor");

const product = require("../Routers/product");

const productImage = require("../Routers/productImage");

const app = require("./app");

const apiPrefix = "/api/v1";
//Router
app.use(`${apiPrefix}/auth`, authRouter);

app.use(`${apiPrefix}/users`, userRouter);

app.use(`${apiPrefix}/teams`, teamRouter);

app.use(`${apiPrefix}/productages`, productAge);

app.use(`${apiPrefix}/productgenders`, productGender);

app.use(`${apiPrefix}/producttypes`, productType);

app.use(`${apiPrefix}/productcolors`, productColor);

app.use(`${apiPrefix}/products`, product);

app.use(`${apiPrefix}/productimages`, productImage);
