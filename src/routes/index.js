import { Router } from "express";
import authRoutes from "./auth.js";
import priceListRoutes from "./pricelist.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/pricelist", priceListRoutes);

export default apiRoutes;
