import { Router } from "express";
import authRoutes from "./auth.js";
import priceListRoutes from "./priceList.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/pricelist", priceListRoutes);

export default apiRoutes;
