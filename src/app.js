import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
const app = express();
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

//route imports

//default route

app.get("/", (req, res) => {
  res.send("Hello World");
});

export { app };
