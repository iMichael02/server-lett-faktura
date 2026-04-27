import { errors } from "../utils/errors.js";

export const globalErrorHandler = (err, req, res, next) => {
    const errorCodes = Object.values(errors).map((error) => error.code);

    if (err.message && errorCodes.includes(err.message)) {
        const errorInfo = errors[err.message];
        res.status(errorInfo.status).json({
            status: errorInfo.status,
            message: errorInfo.message,
            success: false,
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: err.message || "Internal Server Error",
        success: false,
    });
};
