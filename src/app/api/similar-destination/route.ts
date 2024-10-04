import {
  getDataBorobudur,
  getDataDanauToba,
  getDataLabuanBajo,
  getDataLikupang,
  getDataMandalika,
} from "@/app/lib/mysql/similar-destination-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let tempatWisata = searchParams.get("name");

  if (!tempatWisata) {
    return NextResponse.json(
      { status: 400, message: "Missing 'tempat_wisata' query parameter." },
      { status: 400 }
    );
  }

  switch (tempatWisata) {
    case "Borobudur":
      tempatWisata = "Borobudur Temple";
      break;
    case "Likupang":
      tempatWisata = "Pantai Paal";
      break;
    case "Mandalika":
      tempatWisata = "Sirkuit Internasional Pertamina Mandalika";
      break;
    case "Labuan Bajo":
      tempatWisata = "Gua Batu Cermin";
      break;
    case "Danau Toba":
      tempatWisata = "Danau Toba";
      break;
    default:
      tempatWisata = "none";
      break;
  }

  try {
    if (tempatWisata === "Borobudur Temple") {
      const data = await getDataBorobudur();
      return NextResponse.json(
        { status: 200, message: "Success", data },
        { status: 200 }
      );
    } else if (tempatWisata === "Pantai Paal") {
      const data = await getDataLikupang();
      return NextResponse.json(
        { status: 200, message: "Success", data },
        { status: 200 }
      );
    } else if (tempatWisata === "Sirkuit Internasional Pertamina Mandalika") {
      const data = await getDataMandalika();
      return NextResponse.json(
        { status: 200, message: "Success", data },
        { status: 200 }
      );
    } else if (tempatWisata === "Gua Batu Cermin") {
      const data = await getDataLabuanBajo();
      return NextResponse.json(
        { status: 200, message: "Success", data },
        { status: 200 }
      );
    } else if (tempatWisata === "Danau Toba") {
      const data = await getDataDanauToba();
      return NextResponse.json(
        { status: 200, message: "Success", data },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to fetch average rating." },
      { status: 500 }
    );
  }
}
