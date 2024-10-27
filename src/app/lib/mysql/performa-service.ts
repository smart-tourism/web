import { prismaClient } from "./init";

// Format tanggal
function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getDataPerforma = async (
  activeTab: any,
  tempatWisata: string[]
) => {
  try {
    const lastTenDates = await prismaClient.sentiments.findMany({
      select: { date: true },
      distinct: ["date"],
      orderBy: { date: "desc" },
      take: 10,
      where: {
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        source: activeTab,
      },
    });

    const dates = lastTenDates.map((item) => item.date);

    const reviews = await prismaClient.sentiments.groupBy({
      by: ["date"],
      _avg: { rating: true },
      where: {
        date: { in: dates },
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        source: activeTab,
      },
      orderBy: { date: "asc" },
    });

    const averageRatingByDate = reviews.reduce<{ date: string; avg: number }[]>(
      (acc, item) => {
        const formattedDate = formatDate(item.date);
        const existingEntry = acc.find((entry) => entry.date === formattedDate);

        if (existingEntry) {
          existingEntry.avg = (existingEntry.avg + (item._avg.rating || 0)) / 2;
        } else {
          acc.push({
            date: formattedDate,
            avg: item._avg.rating || 0,
          });
        }

        return acc;
      },
      []
    );

    return averageRatingByDate;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
