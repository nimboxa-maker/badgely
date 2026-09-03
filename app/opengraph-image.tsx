import { ImageResponse } from "next/og";

export const alt = "Badgely — IT certifications, career paths, and study resources";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 42%, #0b3aa4 100%)",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            right: -115,
            top: -105,
            borderRadius: 9999,
            border: "2px solid rgba(96, 165, 250, 0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            right: -30,
            top: -25,
            borderRadius: 9999,
            border: "2px solid rgba(147, 197, 253, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            left: -90,
            bottom: -90,
            borderRadius: 9999,
            background: "rgba(37, 99, 235, 0.18)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "58px 70px 54px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(145deg, #2563eb, #60a5fa)",
                boxShadow: "0 16px 36px rgba(37, 99, 235, 0.35)",
                fontSize: 36,
                fontWeight: 800,
              }}
            >
              B
            </div>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>
              Badgely
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#93c5fd",
              }}
            >
              Independent IT certification guidance
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 64,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: -2.5,
              }}
            >
              Choose your next IT certification with clarity.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                maxWidth: 830,
                fontSize: 25,
                lineHeight: 1.45,
                color: "#cbd5e1",
              }}
            >
              Explore certifications, career roadmaps, exam details, courses, and study resources in one place.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {["Certifications", "Career Paths", "Study Resources"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(191, 219, 254, 0.28)",
                  background: "rgba(15, 23, 42, 0.52)",
                  color: "#dbeafe",
                  fontSize: 17,
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
