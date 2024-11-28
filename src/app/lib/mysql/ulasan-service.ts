import { prismaClient } from "./init";

export const getUlasanFiltered = async (
  tempatWisata: string[],
  source: string,
  sentiment: string,
  page: number,
  limit: number
) => {
  try {
    const [result, total] = await prismaClient.$transaction([
      prismaClient.sentiments.findMany({
        select: {
          komentar: true,
          source: true,
          rating: true,
          date: true,
        },
        where: {
          tempat_wisata:
            tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
          source: source !== "OTA" ? { equals: source } : undefined,
          label: sentiment !== "Sentiment" ? { equals: sentiment } : undefined,
        },
        orderBy: {
          date: "desc",
        },
        skip: (page - 1) * limit, // Skip items for pagination
        take: limit, // Limit items
      }),
      prismaClient.sentiments.count({
        where: {
          tempat_wisata:
            tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
          source: source !== "OTA" ? { equals: source } : undefined,
          label: sentiment !== "Sentiment" ? { equals: sentiment } : undefined,
        },
      }),
    ]);

    return { data: result, total };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
};
