import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers3, Mail, Menu, Send, Terminal, X } from "lucide-react";
import CursorTrail from "./CursorTrail.jsx";
import PortfolioVFX from "./PortfolioVFX.jsx";
import OpeningSequence from "./OpeningSequence.jsx";
import "./styles.css";
import "./contact-vfx.css";

const Github = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.7 1.4a12.8 12.8 0 0 0-6.8 0C5.7 1.1 4.5 1.5 4.5 1.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.7c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/></svg>;
const Linkedin = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

const EMAIL = "senthilvelanprabakaran@gmail.com";
const RESUME_URL = ""; // e.g. "/resume.pdf" — drop the file in /public, button appears automatically

const projects = [
  { n:"01", title:"FEDIS-OT", category:"AI & Security", desc:"A privacy-preserving cybersecurity concept combining federated learning with digital-twin-based patch validation for safer collaborative threat detection.", tags:["Federated Learning","Digital Twin","GNN"], symbol:"◈", tone:"violet", status:"In development", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_data-redundancy" },
  { n:"02", title:"Signify", category:"Computer Vision", desc:"An Indian Sign Language recognition experience exploring YOLO-based detection and a web interface to make sign recognition more accessible.", tags:["YOLOv8","Python","Flask"], symbol:"⌁", tone:"mint", status:"Prototype", url:"https://github.com/senthilvelanprabakaran-alt/isl" },
  { n:"03", title:"SmartCart", category:"Full Stack", desc:"A compact e-commerce application with product browsing, a cart flow, and mock checkout backed by Flask and MySQL.", tags:["Flask","MySQL","JavaScript"], symbol:"▦", tone:"orange", status:"Building", url:"https://github.com/senthilvelanprabakaran-alt/Uzhavan-Market-" },
  { n:"04", title:"EON Chatbot", category:"Generative AI", desc:"A Django chatbot project focused on a practical conversational interface and database-backed application flow.", tags:["Django","Python","MySQL"], symbol:"✳", tone:"blue", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/eon_chatbot" },
  { n:"05", title:"Skin Disease AI", category:"Machine Learning", desc:"An image-classification project exploring AI-assisted recognition of skin conditions using a curated dataset.", tags:["Computer Vision","Python","Deep Learning"], symbol:"◎", tone:"pink", status:"Exploration", url:"https://github.com/senthilvelanprabakaran-alt/skinai" },
  { n:"06", title:"EcoMetal LCA", category:"Sustainability AI", desc:"An AI-powered life cycle assessment platform for metal production, with ML emissions prediction, SHAP explainability, scenario modeling, and ISO 14040/14044 compliance tracking.", tags:["Life Cycle Assessment","ML Prediction","SHAP","ISO 14040"], symbol:"♻", tone:"mint", status:"AI Platform", url:"https://github.com/senthilvelanprabakaran-alt/lca_metal" },
  { n:"07", title:"CodeAlpha Bus", category:"Python", desc:"A Python project from the CodeAlpha project set, showcasing practical programming and application-building work.", tags:["Python","Application Logic","Git"], symbol:"▤", tone:"mint", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_bus" },
  { n:"08", title:"CodeAlpha Chatbot", category:"Conversational AI", desc:"A chatbot project exploring conversational interactions and the foundations of building useful assistant workflows.", tags:["Python","Chatbot","NLP"], symbol:"◉", tone:"violet", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_Chatbot" },
  { n:"09", title:"SkillLearn", category:"Web Development", desc:"A web-based learning project focused on presenting learning content through a straightforward interface.", tags:["HTML","CSS","JavaScript"], symbol:"✳", tone:"orange", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/skill_learn" },
  { n:"10", title:"Uzhavan Market", category:"Full Stack", desc:"A market-focused web project designed around connecting users with a simple product and marketplace experience.", tags:["HTML","Web UI","Marketplace"], symbol:"▦", tone:"yellow", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/Uzhavan-Market-" },
  { n:"11", title:"Flappy Bird", category:"Game Development", desc:"A browser game project inspired by the classic tap-to-fly arcade mechanic, built as a compact interactive experiment.", tags:["HTML","CSS","JavaScript"], symbol:"➤", tone:"pink", status:"Experiment", url:"https://github.com/senthilvelanprabakaran-alt/flappybird" }
];

const toneColor = { violet:"#7c5cff", mint:"#1fbf8f", orange:"#ff7a2a", blue:"#3b82f6", pink:"#ec4899", yellow:"#d9a400" };

const experience = [
  { tone:"paper", stamp:["WEB","DEV"], title:"Aerialroot Infotech", role:"Web Development Intern", desc:"Worked through practical web development tasks and learned how real project requirements shape interfaces and implementation.", date:"JUN — JUL 2025", rot:"-3deg" },
  { tone:"red", stamp:["CLOUD","LAB"], title:"CodeAlpha", role:"Cloud Computing Intern", desc:"Explored cloud computing concepts and project-based work through a virtual internship programme.", date:"SEP — OCT 2026", rot:"2deg" },
  { tone:"dark", stamp:["IOT","SYSTEM"], title:"FIREGUARD", role:"IoT System / Lab Project", desc:"Hands-on work around an IoT system, bringing hardware, software, and practical debugging together.", date:"JUN — AUG 2026", rot:"-1deg" }
];

const skills = [
  ["Languages",["Python","Java","JavaScript","SQL"]],
  ["AI & ML",["Machine Learning","YOLOv8","PyTorch","Generative AI","RAG / LangChain"]],
  ["Web",["React","Flask","Django","HTML / CSS","Bootstrap"]],
  ["Data & Tools",["MySQL","Firebase","Git / GitHub","TensorFlow.js"]]
];


const certifications = [
  { n:"01", title:"SQL (Basic)", issuer:"HackerRank", kind:"Skills certificate", date:"23 SEP 2026", desc:"Simple queries, relationships and aggregators.", tags:["SQL","Database"], url:"https://www.hackerrank.com/certificates/9f298f14cff4", tone:"mint" },
  { n:"02", title:"Problem Solving (Basic)", issuer:"HackerRank", kind:"Skills certificate", date:"19 JUL 2026", desc:"Foundational data structures and algorithms, including arrays, strings, sorting and searching.", tags:["Algorithms","Problem Solving"], url:"https://www.hackerrank.com/certificates/cf87ab2c4af9", tone:"orange" },
  { n:"03", title:"Java (Basic)", issuer:"HackerRank", kind:"Skills certificate", date:"05 AUG 2026", desc:"Java fundamentals covering classes, data structures, inheritance and exception handling.", tags:["Java","Programming"], url:"https://www.hackerrank.com/certificates/c12d38403c23", tone:"blue" },
  { n:"04", title:"Data Analytics Job Simulation", issuer:"Deloitte · Forage", kind:"Job simulation", date:"29 JUL 2026", desc:"Practical simulation activities in data analysis and forensic technology.", tags:["Data Analytics","Forage"], url:"", tone:"violet" },
  { n:"05", title:"Operations Industrial Engineer Job Simulation", issuer:"Siemens · Forage", kind:"Job simulation", date:"29 JUL 2026", desc:"Simulation tasks covering time studies and proposing layout changes.", tags:["Operations","Industrial Engineering"], url:"", tone:"mint" },
  { n:"06", title:"MongoDB Basics for Students", issuer:"MongoDB · Credly", kind:"Digital badge", date:"29 JUL 2026", desc:"Database fundamentals, document models, replication, scaling and Atlas cluster deployment.", tags:["MongoDB","Databases"], url:"https://credly.com/badges/0350199a-54f9-4024-b22a-747da471bfd1/public_url", tone:"green" },
  { n:"07", title:"Data Analysis with Python", issuer:"IBM · CognitiveClass.ai", kind:"Course certificate", date:"29 JUL 2026", desc:"Course completion in data analysis with Python through the IBM Developer Skills Network.", tags:["Python","Data Analysis"], url:"https://courses.cognitiveclass.ai/certificates/e9a7ff5d385542c487257e93002feae7", tone:"blue" },
  { n:"08", title:"Machine Learning for Natural Language Processing", issuer:"AWS Academy · Credly", kind:"Training badge", date:"29 JUL 2026", desc:"AWS Academy training badge for completing Machine Learning for Natural Language Processing.", tags:["Machine Learning","NLP","AWS Academy"], url:"https://credly.com/badges/77dd6304-30f8-4504-abac-0ddbc50efd23/public_url", tone:"orange" },
  { n:"09", title:"Python (Basic)", issuer:"HackerRank", kind:"Skills certificate", date:"15 JUL 2026", desc:"Python basics spanning data types, operators, control flow, strings, collections, iteration and classes.", tags:["Python","Programming"], url:"https://www.hackerrank.com/certificates/eb3e89eb381d", tone:"mint" },
  { n:"10", title:"AI Tools & Claude Workshop", issuer:"be10x · CertX", kind:"Workshop certificate", date:"26 OCT 2025", desc:"Workshop covering AI-assisted presentations, data analysis, coding and debugging.", tags:["AI Tools","Claude","Productivity"], url:"", tone:"violet" }
];

const tickerItems = ["Curious by default","Built with intention","Always iterating","Code with purpose"];
const answers = {
  help:"Commands: about · skills · projects · contact · clear",
  about:"P. Senthil Velan — AI & Data Science developer interested in applied AI and useful software.",
  skills:"Python · Java · ML · YOLOv8 · Generative AI · React · Flask · Django · MySQL",
  projects: projects.map((p) => p.title).join(" · "),
  contact:"Use the contact links below to connect."
};
const links = [["About","#about"],["Experience","#experience"],["Projects","#projects"],["Skills","#skills"],["Certificates","#certificates"],["Contact","#contact"]];

/* ---------- motion engine ----------
   Every .scene is sticky and stacks over the previous one (the red-edged
   wipe). We publish two numbers per scene as CSS variables:
   --enter  0 → 1  while the scene slides up over the screen
   --cover  0 → 1  while the NEXT scene slides over this one
   Everything else (word reveals, card flips, parallax) is pure CSS on those. */
function useSceneMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stacked = window.matchMedia("(min-width: 1100px) and (min-height: 720px)");
    const scenes = [...document.querySelectorAll(".scene")];
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const useStacked = stacked.matches;
      const motionAllowed = !reduce.matches;
      scenes.forEach((scene, i) => {
        if (!motionAllowed) {
          scene.style.setProperty("--enter", "1");
          scene.style.setProperty("--cover", "0");
          return;
        }
        // Flowing layouts animate a section as its top travels through the viewport.
        // Stacked desktop uses the same reveal curve plus the existing cover choreography.
        const enter = clamp01((vh - scene.getBoundingClientRect().top) / vh);
        const next = scenes[i + 1];
        const cover = useStacked && next
          ? clamp01((vh - next.getBoundingClientRect().top) / vh)
          : 0;
        scene.style.setProperty("--enter", enter.toFixed(3));
        scene.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* ---------- small building blocks ---------- */
function Scene({ id, theme, index, className = "", children }) {
  return (
    <section id={id} className={`scene ${className}`} data-theme={theme} style={{ zIndex: index + 1 }}>
      <div className="scene-inner">{children}</div>
    </section>
  );
}

function Letters({ text, base = 0 }) {
  return [...text].map((c, i) => (
    <span className="ch" key={i} style={{ "--i": base + i }}>{c === " " ? "\u00a0" : c}</span>
  ));
}

function Words({ text, start = 0, step = 0.07, className = "" }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className={`w ${className}`} style={{ "--k": (start + i * step).toFixed(2) }}>{w}&nbsp;</span>
  ));
}

function Label({ n, children }) {
  return <div className="label"><b>{n}</b> / {children}</div>;
}

/* counts up once on mount; reduced-motion users get the final value */
function CountUp({ to, pad = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const start = performance.now() + 500;
    const dur = 1200;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / dur));
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return String(v).padStart(pad, "0");
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <Scene id="home" theme="dark" index={0} className="hero-scene">
      <div className="hero">
        <div className="hero-top">
          <span>✛ &nbsp;AI & Data Science developer</span>
          <span>Trichy, India &nbsp;✛</span>
        </div>
        <div className="hero-disc" aria-hidden="true">
          <div className="disc-orbit disc-orbit--primary"><span /></div>
          <div className="disc-orbit disc-orbit--secondary"><i /></div>
          <div className="disc-orbit disc-orbit--tertiary"><b /></div>
        </div>
        <h1 className="hero-title" aria-label="P. Senthil Velan">
          <span className="ht-line" aria-hidden="true"><Letters text="P. SENTHIL" /></span>
          <span className="ht-line" aria-hidden="true"><Letters text="VELAN" base={10} /></span>
        </h1>
        <div className="hero-portrait">
          <img src="/senthil-profile.webp" alt="P. Senthil Velan wearing a yellow hoodie, viewed from behind" />
        </div>
        <div className="hero-bottom">
          <div className="hero-lead">
            <p>An AI & Data Science developer exploring the space between machine intelligence and human-centered software.</p>
            <div className="actions">
              <a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="btn ghost" href="#contact">Get in touch</a>
              {RESUME_URL && <a className="btn ghost" href={RESUME_URL} target="_blank" rel="noreferrer">Download CV</a>}
            </div>
          </div>
          <div className="badges">
            <div className="badge"><b><CountUp to={11} pad={2} /></b><small>projects in the lab</small></div>
            <div className="badge"><b><CountUp to={3} pad={2} /></b><small>field notes</small></div>
            <div className="badge"><b>∞</b><small>things to explore</small></div>
          </div>
        </div>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1, 2, 3].flatMap((c) => tickerItems.map((t) => (
              <React.Fragment key={`${c}-${t}`}><span>{t}</span><i>✳</i></React.Fragment>
            )))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- about (light) ---------- */
function About() {
  return (
    <Scene id="about" theme="light" index={1}>
      <Label n="01">About</Label>
      <div className="about-grid">
        <h2 className="display about-h">
          <Words text="Tech is the tool." start={0.1} />
          <br />
          <Words text="Impact is the point." start={0.35} className="red" />
        </h2>
        <div className="about-copy rv" style={{ "--k": 0.6 }}>
          <p>I'm a final-year B.Tech student specializing in <strong>Artificial Intelligence & Data Science</strong> at CARE College of Engineering, Trichy. I enjoy turning complex ideas into practical prototypes — from computer vision models to web apps and privacy-aware AI systems.</p>
          <p>I'm continually improving my skills across machine learning, full-stack development, and responsible AI. I believe in learning by building, testing, and iterating.</p>
          <a className="textlink" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="mini-stats rv" style={{ "--k": 0.75 }}>
        <div><b>AI<span>+</span></b><small>Curiosity-led learning</small></div>
        <div><b>01</b><small>Builder mindset</small></div>
        <div><b>∞</b><small>Things left to explore</small></div>
      </div>
    </Scene>
  );
}

/* ---------- experience (dark) ---------- */
function Experience() {
  return (
    <Scene id="experience" theme="dark" index={2}>
      <Label n="02">Field notes — internships & practice</Label>
      <div className="split-head rv" style={{ "--k": 0.05 }}>
        <h2 className="display h2">Learning by <span className="red">making things.</span></h2>
        <p>Different rooms, different problems. Every experience adds another layer to how I build.</p>
      </div>
      <div className="xp-grid">
        {experience.map((x, i) => (
          <article key={x.title} className={`xcard ${x.tone}`} style={{ "--k": 0.2 + i * 0.12, "--r": x.rot }}>
            <div className="stamp">{x.stamp.map((l) => <span key={l}>{l}</span>)}</div>
            <small className="xnum">FIELD NOTE / 0{i + 1}</small>
            <h3>{x.title}</h3>
            <p className="role">{x.role}</p>
            <p className="desc">{x.desc}</p>
            <div className="meta"><span>{x.date}</span><b>0{i + 1} / 03</b></div>
          </article>
        ))}
      </div>
      <p className="note rv" style={{ "--k": 0.6 }}>not just certificates — things learned, things built, things still in progress.</p>
    </Scene>
  );
}

/* ---------- projects (light) ---------- */
function Projects() {
  return (
    <Scene id="projects" theme="light" index={3} className="projects-scene">
      <Label n="03">Selected work <span>01—11</span></Label>
      <div className="split-head projects-heading rv" style={{ "--k": 0.05 }}>
        <h2 className="display h2">Things I've been <span className="red">working on.</span></h2>
        <p>A collection of experiments, prototypes, and ideas. Some are in progress — that's where the interesting stuff happens.</p>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article className="project-card rv" key={p.n} style={{ "--tone": toneColor[p.tone], "--k": 0.12 + (i % 3) * 0.08 }}>
            <div className="project-card-head">
              <small>PROJECT / {p.n}</small>
              <span aria-hidden="true">{p.symbol}</span>
            </div>
            <div className="project-card-art" aria-hidden="true">
              <i className="project-orbit orbit-a" />
              <i className="project-orbit orbit-b" />
              <b>{p.symbol}</b>
              <small>{p.category.toUpperCase()}</small>
            </div>
            <div className="project-card-body">
              <div className="project-card-status"><span />{p.status}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-card-tags">
                {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="project-card-link" href={p.url} target="_blank" rel="noreferrer">
                Explore project repositories <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="projects-endline"><span>11 PROJECTS</span><i /><span>MORE EXPERIMENTS COMING</span></div>
    </Scene>
  );
}

/* ---------- skills (dark) ---------- */
function Skills() {
  return (
    <Scene id="skills" theme="dark" index={4}>
      <Label n="04">Toolkit</Label>
      <div className="skills-grid">
        <div className="rv" style={{ "--k": 0.05 }}>
          <h2 className="display h1">Tools of the <span className="red">trade.</span></h2>
          <p className="muted">Technologies I use, learn, and reach for when an idea needs to become real.</p>
          <div className="toolkit-card">
            <Layers3 size={26} />
            <small>MY TOOLKIT / 2026</small>
            <h3>Learn it. Build with it. <em>Make it useful.</em></h3>
            <div>STACK STATUS <b>● EVOLVING</b></div>
          </div>
        </div>
        <div className="skill-list">
          {skills.map(([group, items], i) => (
            <div className="skill-row" key={group} style={{ "--k": 0.2 + i * 0.12 }}>
              <small>{group}</small>
              <div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}


/* ---------- certifications (light) ---------- */
function Certificates() {
  return (
    <Scene id="certificates" theme="light" index={5} className="certifications-scene">
      <Label n="05">Licenses &amp; certifications <span>01—10</span></Label>
      <div className="split-head certifications-heading rv" style={{ "--k": 0.04 }}>
        <h2 className="display h2">Proof of <span className="red">progress.</span></h2>
        <p>Skills certificates, industry job simulations, training badges and workshops - each one marking another thing learned and built.</p>
      </div>
      <div className="certification-grid">
        {certifications.map((c, i) => (
          <article className="certification-card rv" key={c.n} style={{ "--cert-tone": c.tone, "--k": 0.08 + (i % 3) * 0.05 }}>
            <div className="certification-card-top">
              <span className="certification-number">CREDENTIAL / {c.n}</span>
              <span className="certification-seal" aria-hidden="true"><span>✳</span></span>
            </div>
            <div className="certification-body">
              <small className="certification-kind">{c.kind}</small>
              <h3>{c.title}</h3>
              <p className="certification-issuer">{c.issuer}</p>
              <p className="certification-desc">{c.desc}</p>
              <div className="certification-tags">
                {c.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="certification-card-bottom">
                <span className="certification-date">{c.date}</span>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer" aria-label={`View ${c.title} credential`}>
                    Verify <ArrowUpRight size={15} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Scene>
  );
}

/* ---------- terminal (light) ---------- */
function Terminal_() {
  const [cmd, setCmd] = useState("");
  const [output, setOutput] = useState("Welcome! Type help to explore.");
  const run = (e) => {
    e.preventDefault();
    const c = cmd.trim().toLowerCase();
    setOutput(c === "clear" ? "" : answers[c] || `Command not found: ${c}. Type help.`);
    setCmd("");
  };
  const quick = (c) => { setCmd(c); setOutput(c === "clear" ? "" : answers[c]); };
  return (
    <Scene id="terminal" theme="dark" index={6}>
      <Label n="06">A little interaction</Label>
      <h2 className="display h2 rv" style={{ "--k": 0.05 }}>Take the terminal <span className="red">for a spin.</span></h2>
      <div className="term rv" style={{ "--k": 0.2 }}>
        <div className="term-head"><span>● ● ●</span><small><Terminal size={13} /> senthil@portfolio — interactive shell</small><i>LOCAL SIMULATION</i></div>
        <div className="term-body">
          <p className="comment"># Hey there. Take the terminal for a spin.</p>
          <p><b>➜</b> <em>~</em> &nbsp;whoami</p>
          <p className="muted">AI & Data Science student · builder · lifelong learner</p>
          <p><b>➜</b> <em>~</em> &nbsp;echo $MOTTO</p>
          <p className="muted">"Stay curious. Ship useful things."</p>
          <p className="response">{output}</p>
          <form onSubmit={run}>
            <b>➜</b>
            <input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder="try help and press Enter..." aria-label="Terminal command" />
            <button aria-label="Run command"><Send size={15} /></button>
          </form>
          <div className="cmds">{["help", "about", "skills", "projects", "contact", "clear"].map((c) => (
            <button key={c} onClick={() => quick(c)}>{c}</button>
          ))}</div>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- contact + footer (dark) ---------- */
function Contact() {
  return (
    <Scene id="contact" theme="light" index={7} className="contact-scene">
      <Label n="07">Your turn</Label>
      <div className="contact-grid">
        <div className="contact-copy rv" style={{ "--k": 0.05 }}>
          <small className="status">OPEN TO INTERNSHIPS & COLLABORATIONS</small>
          <h2 className="display contact-h">Got an idea?<br /><span className="red">Let's make it<br />real.</span></h2>
          <p className="muted">Have a project, opportunity, or just want to talk tech? I'd love to hear from you.</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${EMAIL}?subject=Let's%20connect`}>Say hello <Mail size={16} /></a>
          </div>
        </div>
        <div className="contact-vfx-stage rv" style={{ "--k": 0.2 }} aria-hidden="true">
          <div className="orb-atmosphere" />
          <div className="orb-core" />
          <div className="orb-rim orb-rim--outer" />
          <div className="orb-rim orb-rim--inner" />
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
          <svg className="orb-svg orb-svg--front" viewBox="0 0 600 600" aria-hidden="true">
            <g className="orb-orbit orb-orbit--front">
              <circle className="orb-trace orb-trace--red" cx="300" cy="300" r="228" pathLength="100" style={{ strokeDasharray: "40 60" }} />
              <circle className="orb-trace orb-trace--white" filter="url(#orbEnergyGlow)" cx="300" cy="300" r="246" pathLength="100" style={{ strokeDasharray: "22 78" }} />
            </g>
          </svg>
          <i className="orb-particle orb-particle--1" />
          <i className="orb-particle orb-particle--2" />
          <i className="orb-particle orb-particle--3" />
          <i className="orb-particle orb-particle--4" />
          <i className="orb-particle orb-particle--5" />
          <i className="orb-particle orb-particle--6" />
          <i className="orb-particle orb-particle--7" />
          <i className="orb-particle orb-particle--8" />
          <img src="/senthil-profile.webp" alt="" className="orb-portrait" />
        </div>
      </div>
      <div className="endcard-line rv" style={{ "--k": 0.32 }}>
        <div className="endcard-copy">
          <small>EPILOGUE / FINAL</small>
          <h3>TO BE <span className="red">CONTINUED.</span></h3>
        </div>
        <a className="back-to-start" href="#home" aria-label="Back to the beginning">
          <span>Back to the beginning</span>
          <ArrowUpRight size={17} />
        </a>
      </div>
      <footer className="footer">
        <span className="brand"><img className="brand-icon" src="/sv-norse.svg" alt="" aria-hidden="true" style={{ width: 42, height: 42, maxWidth: 42, maxHeight: 42, flex: "0 0 42px", objectFit: "contain" }} /><span>P. Senthil Velan<small>/ Developer</small></span></span>
        <small>Designed to keep evolving · © {new Date().getFullYear()}</small>
        <div className="social">
          <a href="https://github.com/senthilvelanprabakaran-alt" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://www.linkedin.com/in/senthilvelan-prabakaran-486051382/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={17} /></a>
        </div>
      </footer>
    </Scene>
  );
}

/* ---------- app ---------- */
function App() {
  useSceneMotion();
  const [menu, setMenu] = useState(false);
  const [introOpen, setIntroOpen] = useState(() => {
    try {
      return window.sessionStorage.getItem("senz-opening-seen") !== "1";
    } catch {
      return true;
    }
  });
  const finishOpening = () => {
    try {
      window.sessionStorage.setItem("senz-opening-seen", "1");
    } catch {
      // The intro still works if storage is unavailable.
    }
    setIntroOpen(false);
  };
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <PortfolioVFX />
      <div className="film-grain" aria-hidden="true" />
      <CursorTrail />
      <header className="nav">
        <a className="brand" href="#home">
          <img className="brand-icon" src="/sv-norse.svg" alt="" aria-hidden="true" />
          <span>P. Senthil Velan<small>/ Developer</small></span>
        </a>
        <button className="mobile" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button>
        <nav className={menu ? "links open" : "links"}>
          {links.map(([t, h]) => <a key={t} href={h} onClick={() => setMenu(false)}>{t}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Terminal_ />
        <Contact />
      </main>
      {introOpen && <OpeningSequence onDone={finishOpening} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
