import { prismaClient } from "./init";

export const getDataDampak = async (tempatWisata: string[]) => {
  try {
    const sentiments = await prismaClient.sentiments.groupBy({
      by: ["source"],
      _count: { id: true },
      where: {
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
      },
    });

    const sentimentData = await Promise.all(
      sentiments.map(async (item) => {
        const total = item._count.id;

        const positiveCount = await prismaClient.sentiments.count({
          where: {
            tempat_wisata:
              tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
            source: item.source,
            label: "positif",
          },
        });

        const neutralCount = await prismaClient.sentiments.count({
          where: {
            tempat_wisata:
              tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
            source: item.source,
            label: "netral",
          },
        });

        const negativeCount = await prismaClient.sentiments.count({
          where: {
            tempat_wisata:
              tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
            source: item.source,
            label: "negatif",
          },
        });

        return {
          source: item.source,
          positivePercentage: (positiveCount / total) * 100,
          neutralPercentage: (neutralCount / total) * 100,
          negativePercentage: (negativeCount / total) * 100,
        };
      })
    );

    return sentimentData;
  } catch (error) {
    console.error("Error fetching sentiment percentages:", error);
    throw error;
  }
};
