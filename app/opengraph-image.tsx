import { ImageResponse } from "next/og";

export const alt = "Will Crum — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B1D00",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 100,
              fontWeight: 700,
              color: "#F3F3F3",
              letterSpacing: -3,
            }}
          >
            will crum
          </div>
          <div style={{ fontSize: 40, color: "#9E9E9E", marginTop: 4 }}>
            product designer @ Brooklyn
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["UX", "AI/ML", "design systems", "0→1"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 30,
                color: "#1B1D00",
                background: "#AFBC00",
                padding: "10px 20px",
                borderRadius: 10,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
