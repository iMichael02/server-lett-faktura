import { errors } from "../utils/errors.js";

export const globalErrorHandler = (err, req, res, next) => {
    const errorCodes = Object.values(errors).map((error) => error.code);

    if (err.code && errorCodes.includes(err.code)) {
        return res
            .status(err.status)
            .json({ status: err.status, message: err.message, success: false });
    }

    res.status(500).json({
        status: 500,
        message: err.message || "Internal Server Error",
        success: false,
    });
};
