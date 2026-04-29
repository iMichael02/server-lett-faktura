import { prisma } from "../lib/prisma.js";

const getOrderBy = (sortedBy, order) => {
    const orderBy = [];

    for (let i = 0; i < sortedBy.length; i++) {
        const field = sortedBy[i];
        orderBy.push({ [field]: order[i] });
    }

    orderBy.push({ createdAt: "desc" });

    return orderBy;
};

export const getPriceList = async (sortedBy, order) => {
    const priceList = await prisma.price.findMany({
        orderBy: getOrderBy(sortedBy, order),
    });

    return priceList;
};

export const updatePrice = async (id, priceData) => {
    const updatedPrice = await prisma.price.update({
        where: { id },
        data: {
            articleNo: priceData.articleNo,
            product: priceData.product,
            price: Number(priceData.price),
            inPrice: Number(priceData.inPrice),
            unit: priceData.unit,
            inStock: Number(priceData.inStock),
            description: priceData.description,
        },
    });
    return updatedPrice;
};
