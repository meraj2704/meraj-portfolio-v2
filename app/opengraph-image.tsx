import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Meraj Hossain — Next.js & Nest.js Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(
    join(process.cwd(), "public", "meraj-profile.jpg"),
    "base64",
  );
  const photoSrc = `data:image/jpeg;base64,${photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(22,163,74,0.28), transparent 55%)",
          color: "#ffffff",
          padding: "72px",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "680px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#4ade80",
              marginBottom: "28px",
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Meraj Hossain
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.72)",
              marginTop: "28px",
            }}
          >
            Next.js · Nest.js · React · TypeScript · PostgreSQL · Prisma
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.45)",
              marginTop: "40px",
            }}
          >
            merajhossain.online
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "300px",
            height: "380px",
            borderRadius: "28px",
            overflow: "hidden",
            border: "2px solid rgba(74,222,128,0.45)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={300}
            height={380}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
