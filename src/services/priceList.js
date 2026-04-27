import { prisma } from "../lib/prisma";

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
