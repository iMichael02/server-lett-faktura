import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        req.user = decoded;
        next();
    });
};
