import { prismaClient } from "./init";

// format tanggal
function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// type for average rating
type AverageRatingResult = {
  _avg: {
    rating: number | null;
  };
};

// type for data sentimen
type SentimentCount = {
  label: string;
  _count: {
    label: number;
  };
};

// type for data source
type SourceCount = {
  source: string;
  _count: {
    source: number;
  };
};

export const getData = async (tempatWisata: string[], dateRange: any) => {
  try {
    const queries = [
      // query average rating
      prismaClient.sentiments.aggregate({
        _avg: { rating: true },
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
          ...(dateRange?.from && dateRange?.to
            ? { date: { gte: dateRange.from, lte: dateRange.to } }
            : {}),
        },
      }),

      // query total ulasan
      prismaClient.sentiments.count({
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
          ...(dateRange?.from && dateRange?.to
            ? { date: { gte: dateRange.from, lte: dateRange.to } }
            : {}),
        },
      }),

      // query total ulasan positif
      prismaClient.sentiments.count({
        where: {
          label: "positif",
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
          ...(dateRange?.from && dateRange?.to
            ? { date: { gte: dateRange.from, lte: dateRange.to } }
            : {}),
        },
      }),

      // query last 5 dates
      prismaClient.sentiments.findMany({
        select: { date: true },
        distinct: ["date"],
        orderBy: { date: "desc" },
        take: 5,
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
          ...(dateRange?.from && dateRange?.to
            ? { date: { gte: dateRange.from, lte: dateRange.to } }
            : {}),
        },
      }),

      // query total per label (positif, netral, negatif)
      prismaClient.sentiments.groupBy({
        by: ["label"],
        _count: { label: true },
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
          ...(dateRange?.from && dateRange?.to
            ? { date: { gte: dateRange.from, lte: dateRange.to } }
            : {}),
        },
      }),
    ];

    const [
      averageRatingResult,
      totalReviews,
      positiveReviews,
      lastFiveDates,
      sentimentCounts,
    ] = await Promise.all(queries);

    // final average rating
    const averageRating = (averageRatingResult as AverageRatingResult)._avg
      .rating;

    // final total reviews
    const totalReviewsCount =
      typeof totalReviews === "number" ? totalReviews : 0;

    // final positive percentage
    const positivePercentage =
      totalReviewsCount && typeof positiveReviews === "number"
        ? Math.round((positiveReviews / totalReviewsCount) * 100)
        : 0;

    // final last 5 dates
    const dates = (lastFiveDates as { date: Date }[]).map((item) => item.date);
    const reviews = await prismaClient.sentiments.groupBy({
      by: ["date"],
      _count: { id: true },
      where: {
        date: { in: dates },
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
      },
      orderBy: { date: "asc" },
    });

    const reviewsByDate = reviews.map((item) => ({
      date: formatDate(item.date),
      count: item._count.id,
    }));

    // query tokenized
    const sentiments = await prismaClient.sentiments.findMany({
      select: { tokenized: true },
      where: {
        ...(tempatWisata.length > 0
          ? { tempat_wisata: { in: tempatWisata } }
          : {}),
        ...(dateRange?.from && dateRange?.to
          ? { date: { gte: dateRange.from, lte: dateRange.to } }
          : {}),
      },
    });

    // final top keywords
    const keywordMap: { [key: string]: number } = {};
    sentiments.forEach((sentiment) => {
      const fixedTokenized = sentiment.tokenized.replace(/'/g, '"');
      try {
        const tokens = JSON.parse(fixedTokenized);
        for (let i = 0; i < tokens.length - 1; i++) {
          const phrase = `${tokens[i].trim()} ${tokens[i + 1].trim()}`;
          keywordMap[phrase] = (keywordMap[phrase] || 0) + 1;
        }
      } catch (error) {
        console.error("Error parsing tokenized data:", error);
      }
    });

    const topKeywords = Object.entries(keywordMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([text, count]) => ({ text, count }));

    // final total ulasan positif, netral, dan negatif
    const sentimentCountsArray = sentimentCounts as SentimentCount[];
    const result = sentimentCountsArray.reduce(
      (acc, sentiment) => {
        if (sentiment.label === "positif") {
          acc.positive = sentiment._count.label;
        } else if (sentiment.label === "netral") {
          acc.neutral = sentiment._count.label;
        } else if (sentiment.label === "negatif") {
          acc.negative = sentiment._count.label;
        }
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 }
    );

    // final total source
    const sourceCounts = await prismaClient.sentiments.groupBy({
      by: ["source"],
      _count: { source: true },
      where: {
        ...(tempatWisata.length > 0
          ? { tempat_wisata: { in: tempatWisata } }
          : {}),
        ...(dateRange?.from && dateRange?.to
          ? { date: { gte: dateRange.from, lte: dateRange.to } }
          : {}),
      },
    });

    const sourceCountsArray = sourceCounts as SourceCount[];
    const sourceResult = sourceCountsArray.reduce(
      (acc, sentiment) => {
        if (sentiment.source === "google") {
          acc.google = sentiment._count.source;
        } else if (sentiment.source === "tripadvisor") {
          acc.tripadvisor = sentiment._count.source;
        } else if (sentiment.source === "traveloka") {
          acc.traveloka = sentiment._count.source;
        } else if (sentiment.source === "tiket") {
          acc.tiket = sentiment._count.source;
        }
        return acc;
      },
      { google: 0, tripadvisor: 0, traveloka: 0, tiket: 0 }
    );

    // final positive and negative feedback
    const positiveFeedbacks = [
      "bagus",
      "oke",
      "nyaman",
      "indah",
      "murah",
      "recommended",
      "keren",
      "enak",
      "mantep",
    ];

    const negativeFeedbacks = [
      "jelek",
      "kotor",
      "bau",
      "jijik",
      "mahal",
      "tidak nyaman",
      "basi",
      "buruk",
      "lama",
    ];

    const analyzeFeedback = (sentimentFeedback: { tokenized: string }[]) => {
      const positiveFeedbackCountMap: { [key: string]: number } = {};
      const negativeFeedbackCountMap: { [key: string]: number } = {};

      positiveFeedbacks.forEach((feedback) => {
        positiveFeedbackCountMap[feedback] = 0;
      });

      negativeFeedbacks.forEach((feedback) => {
        negativeFeedbackCountMap[feedback] = 0;
      });

      sentimentFeedback.forEach((sentiment) => {
        const fixedTokenized = sentiment.tokenized.replace(/'/g, '"');

        let tokens;
        try {
          tokens = JSON.parse(fixedTokenized);
        } catch (error) {
          console.error("Error parsing tokenized data:", error);
          return;
        }

        const uniqueTokens = new Set(
          tokens.map((token: string) => token.trim().toLowerCase())
        );

        positiveFeedbacks.forEach((positiveFeedback) => {
          if (uniqueTokens.has(positiveFeedback)) {
            positiveFeedbackCountMap[positiveFeedback]++;
          }
        });

        negativeFeedbacks.forEach((negativeFeedback) => {
          if (uniqueTokens.has(negativeFeedback)) {
            negativeFeedbackCountMap[negativeFeedback]++;
          }
        });
      });

      // sort hasil umpan balik positif dan negatif
      const sortedPositiveFeedback = Object.entries(positiveFeedbackCountMap)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc: Record<string, number>, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const sortedNegativeFeedback = Object.entries(negativeFeedbackCountMap)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc: Record<string, number>, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      return { sortedPositiveFeedback, sortedNegativeFeedback };
    };

    const { sortedPositiveFeedback, sortedNegativeFeedback } =
      analyzeFeedback(sentiments);

    // final response
    return {
      averageRating,
      totalReviews,
      positivePercentage,
      reviewsByDate,
      positive: result.positive,
      netral: result.neutral,
      negative: result.negative,
      dataTopKeywords: topKeywords,
      sortedPositiveFeedback,
      sortedNegativeFeedback,
      google: sourceResult.google,
      tripadvisor: sourceResult.tripadvisor,
      traveloka: sourceResult.traveloka,
      tiket: sourceResult.tiket,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
