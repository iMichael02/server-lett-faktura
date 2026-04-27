import { Router } from "express";
import { getPriceList } from "../services/priceList";

const priceListRoutes = Router();

priceListRoutes.get("/", async (req, res) => {
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

export default priceListRoutes;
