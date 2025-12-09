import { Anvil } from "lucide-react";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

const font = fetch(new URL("./lato.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    let rawTitle = searchParams.get("title") || "NextCMS";
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

    return new ImageResponse(
      (
        <div
          tw="flex text-white px-20 w-full h-full justify-between py-[70px] flex-col"
          style={{
            backgroundColor: "#111", // SAFE BACKGROUND
          }}
        >
          <Anvil size={40} />

          <h1
            tw="text-[80px]"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            {title}
          </h1>

          <h2 tw="text-[32px] opacity-70">Powered By NextCMS</h2>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "lato", data: await font, style: "italic", weight: 400 },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed To Generate OG Image" },
      { status: 500 }
    );
  }
}
