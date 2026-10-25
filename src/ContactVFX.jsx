/* Light trails, glow and sparks around the orbit. Rear layer sits behind the
   portrait; front layer and sparks sit in front of it. Styles in contact-vfx.css. */

export function ContactVFXRear() {
  return (
    <>
      <svg className="orb-svg orb-svg--rear" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <filter id="orbEnergyGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.6" result="glow" />
                <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g className="orb-orbit">
              <circle className="orb-trace orb-trace--fine" cx="300" cy="300" r="200" />
              <circle className="orb-trace orb-trace--red" cx="300" cy="300" r="218" />
              <circle className="orb-trace orb-trace--fine orb-trace--dashed" cx="300" cy="300" r="232" />
              <circle className="orb-trace orb-trace--white" filter="url(#orbEnergyGlow)" cx="300" cy="300" r="240" pathLength="100" style={{ strokeDasharray: "34 66" }} />
              <circle className="orb-trace orb-trace--red" cx="300" cy="300" r="252" pathLength="100" style={{ strokeDasharray: "22 78" }} />
            </g>
            <g fill="#fff6f6" filter="url(#orbEnergyGlow)">
              <circle cx="52" cy="334" r="3" /><circle cx="548" cy="212" r="4" /><circle cx="488" cy="125" r="2.4" />
            </g>
          </svg>
    </>
  );
}

export function ContactVFXFront() {
  return (
    <>
      <svg className="orb-svg orb-svg--front" viewBox="0 0 600 600" aria-hidden="true">
            <g className="orb-orbit orb-orbit--front">
              <circle className="orb-trace orb-trace--red" cx="300" cy="300" r="228" pathLength="100" style={{ strokeDasharray: "40 60" }} />
              <circle className="orb-trace orb-trace--white" filter="url(#orbEnergyGlow)" cx="300" cy="300" r="246" pathLength="100" style={{ strokeDasharray: "22 78" }} />
            </g>
          </svg>
      <i className="orb-particle orb-particle--1" />
      <i className="orb-particle orb-particle--3" />
      <i className="orb-particle orb-particle--4" />
      <i className="orb-particle orb-particle--5" />
      <i className="orb-particle orb-particle--6" />
      <i className="orb-particle orb-particle--7" />
      <i className="orb-particle orb-particle--8" />
    </>
  );
}
