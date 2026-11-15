import { useEffect, useRef, useState } from "react";

export type OrbGalleryProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function OrbGallery({ className = "", style }: OrbGalleryProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => {
    typeof document === "undefined" || !document.hidden;
  });
  const [hostVisible, setHostVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // IntersectionObserver to track host visibility
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHostVisible(entry?.isIntersecting ?? true),
      { rootMargin: "80px }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Document visibility listener
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const mounted = hostVisible && documentVisible;

  useEffect(() => setReady(false), [mounted]);

  // Orb gallery HTML source - embedded for srcDoc
  const orbGallerySource = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orb Gallery</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter+&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:opsz@8..30&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #030304;
        --ink: #E4E6EB;
        --dim: #4D4D59;
        --accent: #FF5F56;
      }
      * {
        position: relative;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--ink);
      }
      .stage {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      #orb {
        position: absolute;
        inset: 0;
        display: block;
      }
      .nav {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        gap: 16px;
        z-index: 10;
      }
      .nav a {
        color: var(--dim);
        text-decoration: none;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .logo {
        font-family: "Instrument Serif", serif;
        font-size: 14px;
      }
      .cards {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .card {
        width: 120px;
        height: 200px;
        background: #1a1a2e;
        border-radius: 8px;
        margin: 8px;
        transition: transform 300ms ease;
        pointer-events: auto;
      }
      .card:hover {
        transform: translateY(-8px);
      }
      .card h3 {
        margin: 0;
        padding: 12px;
        font-size: 14px;
        text-align: center;
        color: var(--dim);
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <div class="nav">
        <a href="#" class="logo">CodeVoyage</a>
        <a href="#">Projects</a>
        <a href="#">About</a>
      </div>
      <canvas id="orb"></canvas>
      <div class="cards">
        <div class="card">
          <h3>Project Orion</h3>
        </div>
        <div class="card">
          <h3>GENESIS AI</h3>
        </div>
        <div class="card">
          <h3>Termux Tools</h3>
        </div>
      </div>
    </body>
  </html>
  `;

  return (
    <div
      ref={hostRef}
      className={`threeui-background orb-gallery${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Interactive sphere of interface gallery cards"
      data-state={!ready ? "paused" : "ready"}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0c",
        ...style,
      }}
    >
      {ready ? (
        <iframe
          title="Orb Gallery"
          srcDoc={orbGallerySource}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#0a0a0c",
            opacity: 1,
            pointerEvents: "auto",
          }}
        />
      ) : null}
    </div>
  );
}