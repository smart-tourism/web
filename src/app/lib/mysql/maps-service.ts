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

  const negatifReviews = await prismaClient.sentiments.count({
    where: {
      label: "negatif",
      tempat_wisata: "Borobudur Temple",
    },
  });

  return {
    total: totalReviews,
    positif: positifReviews,
    negatif: negatifReviews,
    performa: averageRating._avg,
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

  const negatifReviews = await prismaClient.sentiments.count({
    where: {
      label: "negatif",
      tempat_wisata: "Pantai Paal",
    },
  });

  return {
    total: totalReviews,
    positif: positifReviews,
    negatif: negatifReviews,
    performa: averageRating._avg,
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

  const negatifReviews = await prismaClient.sentiments.count({
    where: {
      label: "negatif",
      tempat_wisata: "Sirkuit Internasional Pertamina Mandalika",
    },
  });

  return {
    total: totalReviews,
    positif: positifReviews,
    negatif: negatifReviews,
    performa: averageRating._avg,
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

  const negatifReviews = await prismaClient.sentiments.count({
    where: {
      label: "negatif",
      tempat_wisata: "Gua Batu Cermin",
    },
  });

  return {
    total: totalReviews,
    positif: positifReviews,
    negatif: negatifReviews,
    performa: averageRating._avg,
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

  const negatifReviews = await prismaClient.sentiments.count({
    where: {
      label: "negatif",
      tempat_wisata: "Danau Toba",
    },
  });

  return {
    total: totalReviews,
    positif: positifReviews,
    negatif: negatifReviews,
    performa: averageRating._avg,
  };
}
