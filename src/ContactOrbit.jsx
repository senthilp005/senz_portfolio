import "./ContactOrbit.css";

/* Uses the transparent portrait in /public (senthil-profile.webp), then use <ContactOrbit />
   in the right column of your contact section. */

const RED = "#e0213a";

function Ring({ r, dash, dur, reverse, opacity = 0.45 }) {
  return (
    <g
      className="orbit-spin"
      style={{
        animationDuration: `${dur}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <circle cx="250" cy="250" r={r} fill="none" stroke={RED}
              strokeOpacity={opacity} strokeWidth="1.2" strokeDasharray={dash} />
    </g>
  );
}

export default function ContactOrbit() {
  return (
    <div className="orbit">
      <svg className="orbit-svg" viewBox="0 0 500 500" aria-hidden="true">
        <defs>
          {/* flat red round, no outer glow */}
          <radialGradient id="redRound" cx="50%" cy="40%" r="65%">
            <stop offset="0"   stopColor="#ea2b44" />
            <stop offset="1"   stopColor="#c0162d" />
          </radialGradient>
        </defs>

        {/* thin circular orbit lines (delete these two lines to remove them) */}
        <Ring r={238} dash="2 8" dur={50} opacity={0.35} />
        <Ring r={206} dash="0"   dur={36} reverse opacity={0.4} />

        {/* the red round behind you */}
        <circle cx="250" cy="250" r="206" fill="url(#redRound)" />
      </svg>

      <img className="orbit-person" src="/senthil-profile.webp"
           alt="P. Senthil Velan" />
    </div>
  );
}
