import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the URL from environment or construct from request
  const appUrl = process.env.NEXT_PUBLIC_URL || 
    `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  
  const farcasterConfig = {
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
    },
    frame: {
      version: "1",
      name: "Monad Dots - Two Dots Inspired Puzzle Game",
      iconUrl: `${appUrl}/images/icon.png`,
      homeUrl: `${appUrl}`,
      imageUrl: `${appUrl}/images/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "game", "puzzle", "dots"],
      primaryCategory: "games",
      buttonTitle: "Play Monad Dots",
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#7c3aed"
    }
  };

  return NextResponse.json(farcasterConfig);
}
