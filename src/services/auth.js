import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma.js";
import { errors } from "../utils/errors.js";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "1h",
        },
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
        },
    );
};

export const register = async (email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error(errors.USER_ALREADY_EXISTS.message, {
            code: errors.USER_ALREADY_EXISTS.code,
            status: errors.USER_ALREADY_EXISTS.status,
        });
    }

    const hashedPassword = await bcrypt.hash(
        password,
        process.env.BCRYPT_SALT_ROUNDS || 12,
    );
    const newUserData = {
        email,
        password: hashedPassword,
    };
    await prisma.user.create({ data: newUserData });
};

export const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error(errors.INVALID_CREDENTIALS.message, {
            code: errors.INVALID_CREDENTIALS.code,
            status: errors.INVALID_CREDENTIALS.status,
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error(errors.INVALID_CREDENTIALS.message, {
            code: errors.INVALID_CREDENTIALS.code,
            status: errors.INVALID_CREDENTIALS.status,
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    return { accessToken, refreshToken };
};

export const logout = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error(errors.INVALID_CREDENTIALS.message, {
            code: errors.INVALID_CREDENTIALS.code,
            status: errors.INVALID_CREDENTIALS.status,
        });
    }

    const existingToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken, isRevoked: false },
    });

    if (!existingToken) {
        throw new Error(errors.INVALID_CREDENTIALS.message, {
            code: errors.INVALID_CREDENTIALS.code,
            status: errors.INVALID_CREDENTIALS.status,
        });
    }

    await prisma.refreshToken.update({
        where: { token: refreshToken },
        data: { isRevoked: true },
    });
};
