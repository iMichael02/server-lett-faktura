import { Router } from "express";
import { getPriceList } from "../services/priceList.js";
import { authenticateToken } from "../middlewares/auth.js";

const priceListRoutes = Router();

priceListRoutes.use(authenticateToken);

priceListRoutes.get("/", async (req, res, next) => {
    try {
        const { sortedBy, order } = req.query;
        const priceList = await getPriceList(sortedBy || [], order || []);

        res.json({
            success: true,
            data: priceList,
        });
    } catch (error) {
        next(error);
    }
});

priceListRoutes.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const priceData = req.body;

        const updatedPrice = await updatePrice(id, priceData);

        res.json({
            success: true,
            data: updatedPrice,
        });
    } catch (error) {
        next(error);
    }
});

export default priceListRoutes;
