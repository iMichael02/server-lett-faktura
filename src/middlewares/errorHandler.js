export const globalErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
};
