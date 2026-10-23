import { ImageResponse } from "next/og";

// Share image for every page that doesn't set its own. Replaces the old
// PNG, whose tagline called us "specialists".
export const alt = "Ebury Fire Systems: Keep it boring.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F26522",
          color: "#1A1A1A",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34 }}>
          <span style={{ fontWeight: 700 }}>ebury</span>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#1A1A1A",
              margin: "0 10px 0 6px",
            }}
          />
          <span>fire systems</span>
        </div>
        <div style={{ display: "flex", fontSize: 168, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>
          Keep it boring.
        </div>
        <div style={{ display: "flex", fontSize: 32 }}>
          You do the exciting work so we can do the boring work.
        </div>
      </div>
    ),
    { ...size },
  );
}
