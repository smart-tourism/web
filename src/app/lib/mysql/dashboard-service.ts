import { prismaClient } from "./init";

function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getData = async (tempatWisata: string) => {
  try {
    // no filter
    if (tempatWisata === "none") {
      // rata-rata rating
      const averageRating = await prismaClient.sentiments.aggregate({
        _avg: {
          rating: true,
        },
      });

      // total ulasan
      const totalReviews = await prismaClient.sentiments.count();

      // jumlah ulasan lima hari terakhir
      const lastFiveDates = await prismaClient.sentiments.findMany({
        select: {
          date: true,
        },
        distinct: ["date"],
        orderBy: {
          date: "desc",
        },
        take: 5,
      });

      const dates = lastFiveDates.map((item) => item.date);

      const reviews = await prismaClient.sentiments.groupBy({
        by: ["date"],
        _count: {
          id: true,
        },
        where: {
          date: {
            in: dates,
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      const reviewsByDate = reviews.map((item) => {
        return {
          date: formatDate(item.date),
          count: item._count.id,
        };
      });

      // top keywords
      const sentiments = await prismaClient.sentiments.findMany({
        select: {
          tokenized: true,
        },
      });

      const keywordMap: { [key: string]: number } = {};

      sentiments.forEach((sentiment) => {
        const fixedTokenized = sentiment.tokenized.replace(/'/g, '"');

        let tokens;
        try {
          tokens = JSON.parse(fixedTokenized);
        } catch (error) {
          console.error("Error parsing tokenized data:", error);
          return;
        }

        for (let i = 0; i < tokens.length - 1; i++) {
          const phrase = `${tokens[i].trim()} ${tokens[i + 1].trim()}`;
          if (keywordMap[phrase]) {
            keywordMap[phrase]++;
          } else {
            keywordMap[phrase] = 1;
          }
        }
      });

      const topKeywords = Object.entries(keywordMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

      const dataTopKeywords = topKeywords.map(([text, count]) => ({
        text,
        count,
      }));

      // total ulasan positif, netral, dan negatif
      const sentimentCounts = await prismaClient.sentiments.groupBy({
        by: ["label"],
        _count: {
          label: true,
        },
      });

      const result = {
        positive: sentimentCounts.find((item) => item.label === "positif")
          ?._count.label,
        neutral: sentimentCounts.find((item) => item.label === "netral")?._count
          .label,
        negative: sentimentCounts.find((item) => item.label === "negatif")
          ?._count.label,
      };

      // response
      const response = {
        averageRating: averageRating._avg.rating,
        totalReviews,
        reviewsByDate,
        positive: result.positive,
        netral: result.neutral,
        negative: result.negative,
        dataTopKeywords,
      };

      return response;
    }

    // with filter tempat_wisata
    // rata-rata rating
    const averageRating = await prismaClient.sentiments.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        tempat_wisata: tempatWisata,
      },
    });

    // total ulasan
    const totalReviews = await prismaClient.sentiments.count({
      where: {
        tempat_wisata: tempatWisata,
      },
    });

    // jumlah ulasan lima hari terakhir
    const lastFiveDates = await prismaClient.sentiments.findMany({
      select: {
        date: true,
      },
      distinct: ["date"],
      orderBy: {
        date: "desc",
      },
      where: {
        tempat_wisata: tempatWisata,
      },
      take: 5,
    });

    const dates = lastFiveDates.map((item) => item.date);

    const reviews = await prismaClient.sentiments.groupBy({
      by: ["date"],
      _count: {
        id: true,
      },
      where: {
        date: {
          in: dates,
        },
        tempat_wisata: tempatWisata,
      },
      orderBy: {
        date: "asc",
      },
    });

    const reviewsByDate = reviews.map((item) => {
      return {
        date: formatDate(item.date),
        count: item._count.id,
      };
    });

    // top keywords
    const sentiments = await prismaClient.sentiments.findMany({
      select: {
        tokenized: true,
      },
      where: {
        tempat_wisata: tempatWisata,
      },
    });

    const keywordMap: { [key: string]: number } = {};

    sentiments.forEach((sentiment) => {
      const fixedTokenized = sentiment.tokenized.replace(/'/g, '"');

      let tokens;
      try {
        tokens = JSON.parse(fixedTokenized);
      } catch (error) {
        console.error("Error parsing tokenized data:", error);
        return;
      }

      for (let i = 0; i < tokens.length - 1; i++) {
        const phrase = `${tokens[i].trim()} ${tokens[i + 1].trim()}`;
        if (keywordMap[phrase]) {
          keywordMap[phrase]++;
        } else {
          keywordMap[phrase] = 1;
        }
      }
    });

    const topKeywords = Object.entries(keywordMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    const dataTopKeywords = topKeywords.map(([text, count]) => ({
      text,
      count,
    }));

    // total ulasan positif, netral, dan negatif
    const sentimentCounts = await prismaClient.sentiments.groupBy({
      by: ["label"],
      _count: {
        label: true,
      },
      where: {
        tempat_wisata: tempatWisata,
      },
    });

    const result = {
      positive: sentimentCounts.find((item) => item.label === "positif")?._count
        .label,
      neutral: sentimentCounts.find((item) => item.label === "netral")?._count
        .label,
      negative: sentimentCounts.find((item) => item.label === "negatif")?._count
        .label,
    };

    // response
    const response = {
      averageRating: averageRating._avg.rating,
      totalReviews,
      reviewsByDate,
      positive: result.positive,
      netral: result.neutral,
      negative: result.negative,
      dataTopKeywords,
    };
    return response;
  } catch (error) {
    console.error("Error fetching average rating with Prisma: ", error);
    throw error;
  }
};
