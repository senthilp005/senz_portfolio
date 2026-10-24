import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

/* ---------- skippable opening titles ----------
   Plays once per browser session. Enter, Escape or the Skip button
   jump straight to the site. Reduced-motion users skip it entirely. */
export function Opening({ onDone }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setBeat(1), 300),
      setTimeout(() => setBeat(2), 1500),
      setTimeout(() => setBeat(3), 2700),
      setTimeout(onDone, 4700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter") onDone(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);
  return (
    <div className="opening" role="dialog" aria-label="Opening titles" data-beat={beat}>
      <div className="opening-title">
        <p className="opening-series">THE SERIES</p>
        <h2 className="opening-name">
          {"P. SENTHIL VELAN".split("").map((c, i) => (
            <span key={i} style={{ "--i": i }}>{c === " " ? " " : c}</span>
          ))}
        </h2>
        <p className="opening-role">AI &amp; DATA SCIENCE DEVELOPER · THE BUILDER</p>
      </div>
      <div className="opening-disc" aria-hidden="true" />
      <img className="opening-portrait" src="/senthil-profile.webp" alt="" aria-hidden="true" />
      <button className="opening-skip" onClick={onDone}>Skip intro <ArrowUpRight size={15} /></button>
    </div>
  );
}

/* ---------- project detail popup ---------- */
export function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
        <small className="modal-kicker">PROJECT / {project.n} · {project.category.toUpperCase()}</small>
        <h3 id="modal-title">{project.title}</h3>
        <p className="modal-status">● {project.status}</p>
        <p className="modal-desc">{project.desc}</p>
        <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <a className="btn primary modal-link" href={project.url} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}

/* ---------- all eleven projects as independent cards ---------- */
export function ProjectGrid({ projects, toneColor, onOpen }) {
  return (
    <div className="pgrid">
      {projects.map((p) => (
        <button key={p.n} className="pcard" onClick={() => onOpen(p)}>
          <span className="pcard-top"><small>{p.status}</small></span>
          <span className="pcard-symbol" aria-hidden="true">{p.n}</span>
          <b className="pcard-title">{p.title}</b>
          <small className="pcard-cat">{p.category}</small>
          <span className="pcard-more">Details <ArrowUpRight size={14} /></span>
        </button>
      ))}
    </div>
  );
}
