import { Router } from "express";
import { login, logout, register } from "../services/auth.js";

const authRoutes = Router();

authRoutes.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        await register(email, password);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        next(error);
    }
});

authRoutes.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await login(
            email,
            password,
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            accessToken,
            user,
        });
    } catch (error) {
        next(error);
    }
});

authRoutes.post("/logout", async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await logout(refreshToken);

        res.clearCookie("refreshToken");
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
});

export default authRoutes;
