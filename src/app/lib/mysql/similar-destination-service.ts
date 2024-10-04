import { prismaClient } from "./init";

export async function getDataBorobudur() {
  const averageRating = await prismaClient.sentiments.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tempat_wisata: "Borobudur Temple",
    },
  });

  const totalReviews = await prismaClient.sentiments.count({
    where: {
      tempat_wisata: "Borobudur Temple",
    },
  });

  const positifReviews = await prismaClient.sentiments.count({
    where: {
      label: "positif",
      tempat_wisata: "Borobudur Temple",
    },
  });

  const positivePercentage = Math.round((positifReviews / totalReviews) * 100);

  return {
    ratePrice: "Coming Soon",
    performa: averageRating._avg,
    responseRate: "100%",
    reviews: totalReviews,
    popularity: positivePercentage,
    overallRating: positifReviews,
    location:
      "Jalan Borobudur, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  };
}

export async function getDataLikupang() {
  const averageRating = await prismaClient.sentiments.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tempat_wisata: "Pantai Paal",
    },
  });

  const totalReviews = await prismaClient.sentiments.count({
    where: {
      tempat_wisata: "Pantai Paal",
    },
  });

  const positifReviews = await prismaClient.sentiments.count({
    where: {
      label: "positif",
      tempat_wisata: "Pantai Paal",
    },
  });

  const positivePercentage = Math.round((positifReviews / totalReviews) * 100);

  return {
    ratePrice: "Coming Soon",
    performa: averageRating._avg,
    responseRate: "100%",
    reviews: totalReviews,
    popularity: positivePercentage,
    overallRating: positifReviews,
    location:
      "Jalan Paal, Kecamatan Paal, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  };
}

export async function getDataMandalika() {
  const averageRating = await prismaClient.sentiments.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tempat_wisata: "Sirkuit Internasional Pertamina Mandalika",
    },
  });

  const totalReviews = await prismaClient.sentiments.count({
    where: {
      tempat_wisata: "Sirkuit Internasional Pertamina Mandalika",
    },
  });

  const positifReviews = await prismaClient.sentiments.count({
    where: {
      label: "positif",
      tempat_wisata: "Sirkuit Internasional Pertamina Mandalika",
    },
  });

  const positivePercentage = Math.round((positifReviews / totalReviews) * 100);

  return {
    ratePrice: "Coming Soon",
    performa: averageRating._avg,
    responseRate: "100%",
    reviews: totalReviews,
    popularity: positivePercentage,
    overallRating: positifReviews,
    location:
      "Jalan Mandalika, Kecamatan Mandalika, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  };
}

export async function getDataLabuanBajo() {
  const averageRating = await prismaClient.sentiments.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tempat_wisata: "Gua Batu Cermin",
    },
  });

  const totalReviews = await prismaClient.sentiments.count({
    where: {
      tempat_wisata: "Gua Batu Cermin",
    },
  });

  const positifReviews = await prismaClient.sentiments.count({
    where: {
      label: "positif",
      tempat_wisata: "Gua Batu Cermin",
    },
  });

  const positivePercentage = Math.round((positifReviews / totalReviews) * 100);

  return {
    ratePrice: "Coming Soon",
    performa: averageRating._avg,
    responseRate: "100%",
    reviews: totalReviews,
    popularity: positivePercentage,
    overallRating: positifReviews,
    location:
      "Jalan Batu Cermin, Kecamatan Labuan Bajo, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  };
}

export async function getDataDanauToba() {
  const averageRating = await prismaClient.sentiments.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      tempat_wisata: "Danau Toba",
    },
  });

  const totalReviews = await prismaClient.sentiments.count({
    where: {
      tempat_wisata: "Danau Toba",
    },
  });

  const positifReviews = await prismaClient.sentiments.count({
    where: {
      label: "positif",
      tempat_wisata: "Danau Toba",
    },
  });

  const positivePercentage = Math.round((positifReviews / totalReviews) * 100);

  return {
    ratePrice: "Coming Soon",
    performa: averageRating._avg,
    responseRate: "100%",
    reviews: totalReviews,
    popularity: positivePercentage,
    overallRating: positifReviews,
    location:
      "Jalan Toba, Kecamatan Toba, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  };
}
