import express from "express";
import userRouter from "./routers/users.router.js";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
