import "./ContactOrbit.css";

/* Portal modelled on the reference: dark crimson rim around a bright red core,
   tilted orbital ellipses with spheres riding them, and white-red energy trails
   sweeping across the portal. Uses the transparent portrait in /public
   (senthil-profile.webp). Use <ContactOrbit /> in the right column of the contact section. */

const C = 250;
const RED = "#e0213a";

// Point on a tilted ellipse (rx, ry, rotated deg) at angle t (radians).
function onEllipse(rx, ry, deg, t) {
  const a = (deg * Math.PI) / 180;
  const x = rx * Math.cos(t);
  const y = ry * Math.sin(t);
  return {
    x: C + x * Math.cos(a) - y * Math.sin(a),
    y: C + x * Math.sin(a) + y * Math.cos(a),
  };
}

function Ring({ r, dash, dur, reverse, opacity = 0.45 }) {
  return (
    <g
      className="orbit-spin"
      style={{
        animationDuration: `${dur}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <circle cx={C} cy={C} r={r} fill="none" stroke={RED}
              strokeOpacity={opacity} strokeWidth="1.2" strokeDasharray={dash} />
    </g>
  );
}

// A tilted orbit with spheres riding on it; the group spins so the spheres stay on the path.
function Orbit({ rx, ry, deg, dur, reverse = false, opacity = 0.5, width = 1.1, dash, spheres = [] }) {
  return (
    <g
      className="orbit-spin"
      style={{
        animationDuration: `${dur}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <ellipse cx={C} cy={C} rx={rx} ry={ry}
               transform={`rotate(${deg} ${C} ${C})`}
               fill="none" stroke={RED} strokeOpacity={opacity}
               strokeWidth={width} strokeDasharray={dash} />
      {spheres.map(({ t, r }) => {
        const p = onEllipse(rx, ry, deg, t);
        return <circle key={t} cx={p.x} cy={p.y} r={r} fill="url(#orbSphere)" filter="url(#orbGlow)" />;
      })}
    </g>
  );
}

export default function ContactOrbit() {
  return (
    <div className="orbit">
      <svg className="orbit-svg" viewBox="0 0 500 500" aria-hidden="true">
        <defs>
          <radialGradient id="orbCore" cx="50%" cy="42%" r="60%">
            <stop offset="0"   stopColor="#ff4256" />
            <stop offset=".62" stopColor="#e0152a" />
            <stop offset="1"   stopColor="#9c0a1b" />
          </radialGradient>
          <radialGradient id="orbAura" cx="50%" cy="50%" r="50%">
            <stop offset=".6"  stopColor="#ff1f35" stopOpacity="0" />
            <stop offset=".8"  stopColor="#ff1f35" stopOpacity=".26" />
            <stop offset="1"   stopColor="#ff1f35" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbSphere" cx="35%" cy="30%" r="70%">
            <stop offset="0"   stopColor="#ffb3b9" />
            <stop offset=".35" stopColor="#ff2b40" />
            <stop offset="1"   stopColor="#8a0816" />
          </radialGradient>
          <filter id="orbGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* soft red aura behind the portal */}
        <circle cx={C} cy={C} r="246" fill="url(#orbAura)" />

        {/* tilted orbital ellipses with spheres (as in the reference) */}
        <Orbit rx={238} ry={92} deg={-24} dur={60} opacity={0.55}
               spheres={[{ t: 0.6, r: 7 }, { t: 3.9, r: 4.5 }]} />
        <Orbit rx={226} ry={110} deg={20} dur={70} reverse opacity={0.4} dash="2 7" width={1}
               spheres={[{ t: 2.2, r: 5 }]} />
        <Orbit rx={244} ry={70} deg={-64} dur={48} opacity={0.5}
               spheres={[{ t: 4.6, r: 6 }]} />

        {/* thin circular orbit lines */}
        <Ring r={238} dash="2 8" dur={50} opacity={0.35} />

        {/* dark crimson rim, then the bright red core the portrait stands in */}
        <circle cx={C} cy={C + 10} r="200" fill="none" stroke="#6d0410" strokeWidth="16" strokeOpacity=".9" />
        <circle cx={C} cy={C + 10} r="194" fill="url(#orbCore)" />
        <circle cx={C} cy={C + 10} r="190" fill="none" stroke="rgba(255,200,205,.45)" strokeWidth="1" />

        {/* sweeping white-red energy trails across the portal */}
        <g fill="none" strokeLinecap="round" filter="url(#orbGlow)">
          <path className="orb-sweep" d="M 52 318 C 150 96, 376 70, 470 330"
                stroke="rgba(255,250,250,.95)" strokeWidth="3" pathLength="100"
                strokeDasharray="26 74" />
          <path className="orb-sweep orb-sweep--2" d="M 118 430 C 230 236, 330 440, 452 170"
                stroke="rgba(255,90,105,.95)" strokeWidth="3.4" pathLength="100"
                strokeDasharray="30 70" />
        </g>
      </svg>

      <img className="orbit-person" src="/senthil-profile.webp"
           alt="P. Senthil Velan" />
    </div>
  );
}
