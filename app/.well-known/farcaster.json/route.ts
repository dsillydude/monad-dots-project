import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the URL from environment or construct from request
  const appUrl = process.env.NEXT_PUBLIC_URL || 
    `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  
  const farcasterConfig = {
     accountAssociation: {
    header: "eyJmaWQiOjQyMDEwOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDExQzNCMkZlNUFiMjgxNWE5RTBGREVmODFGM2NiRDlBZjQ5MDJEMDQifQ",
    payload: "eyJkb21haW4iOiJtb25hZC1kb3RzLXByb2plY3QudmVyY2VsLmFwcCJ9",
    signature: "MHhjYmY3NGI4YTc3ZGViZDhlYzdjZjNlZjMyMjM5NTBmOTRkOTlhNTc5ZGM3NGI4ZjA3NjRlZmNkNzhkZTk1ODhkNDgxYzJjN2I3Mzg3MTM2ZmEzOWQ5ODllOGM0ZGQzZDJjZGVkZTlkYWJjMDMxYTIzZmYyMjMwMWUxM2Q0MzliZDFi"
  },
    frame: {
      version: "1",
      name: "MonDots - Two Dots Inspired Puzzle Game",
      iconUrl: `${appUrl}/images/icon.png`,
      homeUrl: `${appUrl}`,
      imageUrl: `${appUrl}/images/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "game", "puzzle", "dots"],
      primaryCategory: "games",
      buttonTitle: "Play MonDots",
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#7c3aed"
    }
  };

  return NextResponse.json(farcasterConfig);
}
