import { prismaClient } from "./init";

// type for average rating
type AverageRatingResult = {
  _avg: {
    rating: number | null;
  };
};

export const getDataMaps = async (tempatWisata: string[]) => {
  try {
    const queries = [
      // query average rating
      prismaClient.sentiments.aggregate({
        _avg: { rating: true },
        where:
          tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : undefined,
      }),

      // query total ulasan
      prismaClient.sentiments.count({
        where:
          tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : undefined,
      }),

      // query total ulasan positif
      prismaClient.sentiments.count({
        where: {
          label: "positif",
          tempat_wisata:
            tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        },
      }),

      // query total ulasan negatif
      prismaClient.sentiments.count({
        where: {
          label: "negatif",
          tempat_wisata:
            tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        },
      }),
    ];

    const [averageRatingResult, totalReviews, positifReviews, negatifReviews] =
      await Promise.all(queries);

    // final average rating
    const averageRating = (averageRatingResult as AverageRatingResult)._avg
      .rating;

    return {
      total: totalReviews,
      positif: positifReviews,
      negatif: negatifReviews,
      performa: averageRating,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
