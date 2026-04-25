import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { globalErrorHandler } from "./middlewares/errorHandler.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const bootstrap = async () => {
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(cors({ origin: "*" }));
        app.use(helmet());
        app.use("/", apiRoutes);
        app.get("/healthcheck", (_, res) => {
            res.send("OK");
        });
        app.use((_, res) => {
            res.status(404).json({
                status: 404,
                message: "Not Found",
            });
        });
        app.use(globalErrorHandler);

        return app;
    } catch (error) {
        console.error("Bootstrap failed:", error);
        process.exit(1);
    }
};

bootstrap().then((app) =>
    app.listen(port, () => console.log(`Server started on port ${port}`)),
);

export default bootstrap;
