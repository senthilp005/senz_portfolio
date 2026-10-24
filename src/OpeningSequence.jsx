import { useEffect, useRef, useState } from "react";

/**
 * A short, skippable cinematic opening for the portfolio.
 * It uses the existing portrait and brand colours; no extra assets or libraries.
 */
const TIMELINE = [
  { at: 150, beat: 1 },
  { at: 650, beat: 2 },
  { at: 1050, beat: 3 },
  { at: 1450, beat: 4 },
  { at: 1850, beat: 5 },
  { at: 2250, beat: 6 }
];

export default function OpeningSequence({ onDone }) {
  const [beat, setBeat] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const finishTimerRef = useRef(0);
  const finishRef = useRef(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setBeat(6);
      return undefined;
    }
    const timers = TIMELINE.map(({ at, beat: nextBeat }) =>
      window.setTimeout(() => setBeat(nextBeat), at)
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    finishTimerRef.current = window.setTimeout(() => {
      onDoneRef.current?.();
    }, 620);
  };
  finishRef.current = finish;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        finishRef.current?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(finishTimerRef.current);
    };
  }, []);

  return (
    <div
      className={"opening-sequence" + (leaving ? " is-exiting" : "") + (beat >= 6 ? " is-ready" : "")}
      data-beat={beat}
      role="dialog"
      aria-modal="true"
      aria-label="P. Senthil Velan portfolio opening"
    >
      <div className="opening-grid" aria-hidden="true" />
      <div className="opening-vignette" aria-hidden="true" />
      <div className="opening-light-sweep" aria-hidden="true" />
      <div className="opening-energy" aria-hidden="true">
        <div className="opening-orbit opening-orbit--one"><i /></div>
        <div className="opening-orbit opening-orbit--two"><i /></div>
        <div className="opening-orbit opening-orbit--three"><i /></div>
        <div className="opening-energy-core" />
      </div>
      <div className="opening-bar opening-bar--top" aria-hidden="true" />
      <div className="opening-bar opening-bar--bottom" aria-hidden="true" />

      <div className={"opening-studio" + (beat === 1 ? " is-visible" : "")}>
        <span className="opening-studio-mark">S<span>.</span></span>
        <span>SENZ STUDIO <i>PRESENTS</i></span>
      </div>

      <h1 className={"opening-title" + (beat >= 2 ? " is-visible" : "") + (beat >= 4 ? " is-lifted" : "")}>
        <span>P. SENTHIL</span>
        <span>VELAN</span>
      </h1>
      <p className={"opening-series" + (beat >= 3 ? " is-visible" : "") + (beat >= 4 ? " is-lifted" : "")}>
        <span /> THE BUILDER <span />
      </p>

      <div className={"opening-portrait" + (beat >= 4 ? " is-visible" : "")} aria-hidden="true">
        <img
          src="/senthil-profile.webp"
          alt=""
          draggable="false"
          fetchPriority="high"
        />
      </div>

      <div className={"opening-footer" + (beat >= 5 ? " is-visible" : "")}>
        <p>AI &amp; DATA SCIENCE <i>•</i> CREATIVE DEVELOPER <i>•</i> BUILDER</p>
        <button
          type="button"
          className="opening-play"
          onClick={finish}
          tabIndex={beat >= 6 ? 0 : -1}
          aria-hidden={beat < 6}
        >
          <span className="opening-play-icon">▶</span>
          ENTER PORTFOLIO
          <span className="opening-play-arrow">↗</span>
        </button>
      </div>

      <button type="button" className="opening-skip" onClick={finish}>
        SKIP INTRO <span>ESC</span>
      </button>

      <div className="opening-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
