import express from "express";
import cors from "cors";
import helmet from "helmet";

import { globalErrorHandler } from "./middlewares/errorHandler.js";
import apiRoutes from "./routes/index.js";

const port = Number(process.env.PORT) || 3000;
const bootstrap = async () => {
    try {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({ origin: "*" }));
        app.use(helmet());
        app.use("/", apiRoutes);
        app.get("/healthcheck", (req, res) => {
            res.send("OK");
        });
        app.use("*", (req, res) => {
            res.status(404).json({
                status: 404,
                message: "Not Found",
            });
        });
        app.use(globalErrorHandler);

        return app;
    } catch (error) {
        process.exit(1);
    }
};

bootstrap().then((app) =>
    app.listen(port, () => console.log(`Server started on port ${port}`)),
);

export default bootstrap;
