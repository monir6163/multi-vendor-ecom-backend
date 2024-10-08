import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundError } from "./middlewares/errorHandler.js";

// initialize express app
const app = express();

//middlewares setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

//route imports
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

//default route
app.get("/", (_req, res) => {
  res.send("Hello World");
});

//error handling middlewares
app.use(notFoundError);
app.use(errorHandler);

export { app };
