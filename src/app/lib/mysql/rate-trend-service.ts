import { prismaClient } from "./init";

// format tanggal
function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getDataRate = async (activeTab: any, tempatWisata: string[]) => {
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

    const dates = (lastTenDates as { date: Date }[]).map((item) => item.date);

    const reviews = await prismaClient.sentiments.groupBy({
      by: ["date"],
      _count: { id: true },
      where: {
        date: { in: dates },
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
        source: activeTab,
      },
      orderBy: { date: "asc" },
    });

    const uniqueReviewsByDate = reviews.reduce<
      { date: string; count: number }[]
    >((acc, item) => {
      const formattedDate = formatDate(item.date);
      const existingEntry = acc.find((entry) => entry.date === formattedDate);

      if (existingEntry) {
        existingEntry.count += item._count.id;
      } else {
        acc.push({ date: formattedDate, count: item._count.id });
      }

      return acc;
    }, []);

    return uniqueReviewsByDate;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
