import { prismaClient } from "./init";

export const getSentimentDataByKeywords = async (
  keywords: string[],
  tempatWisata: string[]
) => {
  try {
    // Membuat objek untuk menyimpan hasil berdasarkan keyword
    const result = keywords.reduce((acc, keyword) => {
      acc[keyword] = [];
      return acc;
    }, {} as Record<string, { date: string; ota: string; comment: string }[]>);

    // Mengambil data dari tabel sentiment berdasarkan setiap kata kunci
    for (const keyword of keywords) {
      const sentiments = await prismaClient.sentiments.findMany({
        where: {
          komentar: {
            contains: keyword,
          },
          tempat_wisata:
            tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        },
        orderBy: {
          date: "desc",
        },
        take: 10,
        select: {
          date: true,
          source: true,
          komentar: true,
        },
      });

      // Memformat hasil pencarian
      result[keyword] = sentiments.map((sentiment) => ({
        date: sentiment.date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        ota: sentiment.source,
        comment: sentiment.komentar,
      }));
    }

    return result;
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    throw error;
  }
};
