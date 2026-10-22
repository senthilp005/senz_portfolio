import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Mail, Menu, X, Code2, BrainCircuit, Layers3, Terminal, Sparkles, Cpu, ChevronRight, Send } from "lucide-react";
const Github = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.7 1.4a12.8 12.8 0 0 0-6.8 0C5.7 1.1 4.5 1.5 4.5 1.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.7c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/></svg>;
const Linkedin = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
import "./styles.css";

const projects = [
  { n:"01", title:"FEDIS-OT", category:"AI & Security", desc:"A privacy-preserving cybersecurity concept combining federated learning with digital-twin-based patch validation for safer collaborative threat detection.", tags:["Federated Learning","Digital Twin","GNN"], symbol:"◈", tone:"violet", status:"In development", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_data-redundancy" },
  { n:"02", title:"Signify", category:"Computer Vision", desc:"An Indian Sign Language recognition experience exploring YOLO-based detection and a web interface to make sign recognition more accessible.", tags:["YOLOv8","Python","Flask"], symbol:"⌁", tone:"mint", status:"Prototype", url:"https://github.com/senthilvelanprabakaran-alt/isl" },
  { n:"03", title:"SmartCart", category:"Full Stack", desc:"A compact e-commerce application with product browsing, a cart flow, and mock checkout backed by Flask and MySQL.", tags:["Flask","MySQL","JavaScript"], symbol:"▦", tone:"orange", status:"Building", url:"https://github.com/senthilvelanprabakaran-alt/Uzhavan-Market-" },
  { n:"04", title:"EON Chatbot", category:"Generative AI", desc:"A Django chatbot project focused on a practical conversational interface and database-backed application flow.", tags:["Django","Python","MySQL"], symbol:"✳", tone:"blue", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/eon_chatbot" },
  { n:"05", title:"Skin Disease AI", category:"Machine Learning", desc:"An image-classification project exploring AI-assisted recognition of skin conditions using a curated dataset.", tags:["Computer Vision","Python","Deep Learning"], symbol:"◎", tone:"pink", status:"Exploration", url:"https://github.com/senthilvelanprabakaran-alt/skinai" },
  { n:"06", title:"VayuMitra", category:"IoT & AI", desc:"A wearable asthma-risk monitoring concept combining environmental sensors and an ESP32 for air-quality-aware insights.", tags:["ESP32","IoT","Sensors"], symbol:"⌬", tone:"yellow", status:"Concept", url:"https://github.com/senthilvelanprabakaran-alt/lca_metal" },
  { n:"07", title:"CodeAlpha Bus", category:"Python", desc:"A Python project from the CodeAlpha project set, showcasing practical programming and application-building work.", tags:["Python","Application Logic","Git"], symbol:"▤", tone:"mint", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_bus" },
  { n:"08", title:"CodeAlpha Chatbot", category:"Conversational AI", desc:"A chatbot project exploring conversational interactions and the foundations of building useful assistant workflows.", tags:["Python","Chatbot","NLP"], symbol:"◉", tone:"violet", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/CodeAlpha_Chatbot" },
  { n:"09", title:"SkillLearn", category:"Web Development", desc:"A web-based learning project focused on presenting learning content through a straightforward interface.", tags:["HTML","CSS","JavaScript"], symbol:"✳", tone:"orange", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/skill_learn" },
  { n:"10", title:"Uzhavan Market", category:"Full Stack", desc:"A market-focused web project designed around connecting users with a simple product and marketplace experience.", tags:["HTML","Web UI","Marketplace"], symbol:"▦", tone:"yellow", status:"Project", url:"https://github.com/senthilvelanprabakaran-alt/Uzhavan-Market-" },
  { n:"11", title:"Flappy Bird", category:"Game Development", desc:"A browser game project inspired by the classic tap-to-fly arcade mechanic, built as a compact interactive experiment.", tags:["HTML","CSS","JavaScript"], symbol:"➤", tone:"pink", status:"Experiment", url:"https://github.com/senthilvelanprabakaran-alt/flappybird" }
];
const skills = [
  ["Languages",["Python","Java","JavaScript","SQL"]],
  ["AI & ML",["Machine Learning","YOLOv8","PyTorch","Generative AI","RAG / LangChain"]],
  ["Web",["React","Flask","Django","HTML / CSS","Bootstrap"]],
  ["Data & Tools",["MySQL","Firebase","Git / GitHub","TensorFlow.js"]]
];



function CursorTrail(){
  useEffect(()=>{
    const finePointer=window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(!finePointer.matches || reducedMotion.matches) return;

    const canvas=document.createElement("canvas");
    canvas.className="portfolio-comet-cursor";
    canvas.setAttribute("aria-hidden","true");
    Object.assign(canvas.style,{
      position:"fixed",
      inset:"0",
      width:"100%",
      height:"100%",
      pointerEvents:"none",
      zIndex:"2147483647",
      display:"block"
    });
    document.documentElement.appendChild(canvas);
    const ctx=canvas.getContext("2d",{alpha:true});
    if(!ctx){canvas.remove();return;}

    let width=0,height=0,raf=0,lastTime=0;
    const points=[];
    const maxAge=260;
    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,2);
      width=window.innerWidth;
      height=window.innerHeight;
      canvas.width=Math.round(width*dpr);
      canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const move=(e)=>{
      if(e.pointerType && e.pointerType!=="mouse") return;
      points.push({x:e.clientX,y:e.clientY,t:performance.now()});
      if(points.length>18) points.splice(0,points.length-18);
      if(!raf) raf=requestAnimationFrame(draw);
    };
    const draw=(now)=>{
      raf=0;
      ctx.clearRect(0,0,width,height);
      while(points.length && now-points[0].t>maxAge) points.shift();
      if(points.length>1){
        ctx.lineCap="round";
        ctx.lineJoin="round";
        for(let i=1;i<points.length;i++){
          const a=points[i-1],b=points[i];
          const age=Math.max(0,now-b.t);
          const alpha=Math.max(0,1-age/maxAge);
          if(alpha<=0) continue;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.strokeStyle="rgba(255,38,56,"+(alpha*.78)+")";
          ctx.lineWidth=Math.max(.7,4.2*(i/points.length)*alpha);
          ctx.shadowColor="#ff2638";
          ctx.shadowBlur=7*alpha;
          ctx.stroke();
        }
        const head=points[points.length-1];
        const alpha=Math.max(0,1-(now-head.t)/maxAge);
        if(alpha>0){
          ctx.beginPath();
          ctx.arc(head.x,head.y,2.4,0,Math.PI*2);
          ctx.fillStyle="rgba(255,255,255,"+alpha+")";
          ctx.shadowColor="#ff2638";
          ctx.shadowBlur=11;
          ctx.fill();
        }
        ctx.shadowBlur=0;
      }
      if(points.length>1 || (points.length===1 && now-points[0].t<maxAge)){
        raf=requestAnimationFrame(draw);
      }else{
        points.length=0;
      }
      lastTime=now;
    };
    const clear=()=>{points.length=0;if(raf)cancelAnimationFrame(raf);raf=0;ctx.clearRect(0,0,width,height);};
    resize();
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("pointermove",move,{passive:true,capture:true});
    window.addEventListener("blur",clear);
    return ()=>{
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointermove",move,true);
      window.removeEventListener("blur",clear);
      if(raf)cancelAnimationFrame(raf);
      canvas.remove();
    };
  },[]);
  return null;
}

function App(){
  const [filter,setFilter]=useState("All");
  const [menu,setMenu]=useState(false);
  const [cmd,setCmd]=useState("");
  const [output,setOutput]=useState("Welcome! Type help to explore.");
  useEffect(()=>{
    const nodes=document.querySelectorAll(".ticker,.section-label,.about-grid,.stats,.project,.skill-card,.skill-row,.terminal,.contact-panel,.experience-card,.mixed-intro");
    nodes.forEach((node,i)=>{node.classList.add("reveal");node.style.setProperty("--reveal-delay",`${(i%4)*90}ms`)});
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    nodes.forEach(node=>observer.observe(node));
    return ()=>observer.disconnect();
  },[]);
  const filters=["All",...new Set(projects.map(p=>p.category))];
  const shown=useMemo(()=>filter==="All"?projects:projects.filter(p=>p.category===filter),[filter]);
  const run=(e)=>{e.preventDefault();const c=cmd.trim().toLowerCase();const answers={help:"Commands: about · skills · projects · contact · clear",about:"P. Senthil Velan — AI & Data Science developer interested in applied AI and useful software.",skills:"Python · Java · ML · YOLOv8 · Generative AI · React · Flask · Django · MySQL",projects:"FEDIS-OT · Signify · SmartCart · EON Chatbot · Skin Disease AI · VayuMitra",contact:"Use the contact links below to connect."};setOutput(c==="clear"?"":answers[c]||`Command not found: ${c}. Type help.`);setCmd("");};
  return <><CursorTrail/><div className="shell"><div className="glow glow1"/><div className="glow glow2"/>
    <header className="nav"><a className="brand" href="#home"><span className="brand-mark">S<span>.</span></span><span>P. SENTHIL VELAN<small> / DEVELOPER</small></span></a><button className="mobile" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button><nav className={menu?"links open":"links"}>{[["About","#about"],["Experience","#experience"],["Projects","#projects"],["Skills","#skills"],["Contact","#contact"]].map(([t,h])=><a key={t} href={h} onClick={()=>setMenu(false)}>{t}</a>)}<a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a></nav></header>
    <main>
      <section className="hero wrap hero-poster" id="home">
        <div className="hero-topline"><span className="hero-cross">✛</span><span>AI & DATA SCIENCE DEVELOPER</span><i></i><span className="hero-location">✛ &nbsp; TRICHY, INDIA</span></div>
        <div className="hero-title-art" aria-label="P. Senthil Velan"><span className="hero-title-white">P.</span><span className="hero-title-red">SENTHIL</span><span className="hero-title-white">VELAN</span></div>
        <div className="hero-core">
          <div className="hero-copy">
            <p className="hero-hello">Hey, I'm</p><h1>P. <em>SENTHIL</em> VELAN <span>—</span></h1>
            <p className="lead">An AI & Data Science developer exploring the space between machine intelligence and human-centered software.</p>
            <div className="actions"><a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="btn ghost" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
            <div className="hero-current"><b>●</b> CURRENTLY EXPLORING<br/><span>AI &nbsp; | &nbsp; COMPUTER VISION &nbsp; | &nbsp; FULL STACK</span></div>
          </div>
          <div className="hero-person" aria-label="Portrait area">
            <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-sparks">✦<span>✛</span>·<b>✦</b></div>
            <div className="hero-person-glow"></div><img className="hero-real-portrait" src="/senthil-profile.png" alt="P. Senthil Velan wearing a yellow hoodie, viewed from behind"/><div className="hero-handwriting">Build<br/>Learn<br/>Iterate<br/>Grow...</div>
          </div>
          
        </div>
        <a className="hero-scroll" href="#about"><span>▯</span> SCROLL<br/> TO EXPLORE ↓</a><div className="hero-footer"><span>01 &nbsp; / &nbsp; PORTFOLIO</span><i></i><small>AVAILABLE FOR<br/> INTERNSHIPS &nbsp; | &nbsp; OPPORTUNITIES</small></div>
      </section>
      <div className="ticker"><div className="ticker-track"><span>CURIOUS BY DEFAULT</span><i>✳</i><span>BUILT WITH INTENTION</span><i>✳</i><span>ALWAYS ITERATING</span><i>✳</i><span>CODE WITH PURPOSE</span><i>✳</i><span>CURIOUS BY DEFAULT</span><i>✳</i><span>BUILT WITH INTENTION</span><i>✳</i><span>ALWAYS ITERATING</span><i>✳</i><span>CODE WITH PURPOSE</span><i>✳</i></div></div>
      <section className="section wrap" id="about"><div className="section-label">01 / ABOUT <span/></div><div className="about-grid"><h2>Tech is the tool.<br/><em>Impact is the point.</em></h2><div className="about-copy"><p>I'm a final-year B.Tech student specializing in <strong>Artificial Intelligence & Data Science</strong> at CARE College of Engineering, Trichy. I enjoy turning complex ideas into practical prototypes — from computer vision models to web apps and privacy-aware AI systems.</p><p>I'm continually improving my skills across machine learning, full-stack development, and responsible AI. I believe in learning by building, testing, and iterating.</p><a className="textlink" href="#contact">Let's connect <ArrowUpRight size={16}/></a></div></div><div className="stats"><div><b>AI<span>+</span></b><small>Curiosity-led learning</small></div><div><b>01</b><small>Builder mindset</small></div><div><b>∞</b><small>Things left to explore</small></div><div className="stat-note">↳ &nbsp;Small steps.<br/> &nbsp;&nbsp;&nbsp;Real progress.</div></div></section>

      <section className="section wrap experience-section" id="experience"><div className="section-label">02 / FIELD NOTES <span/> <small>INTERNSHIPS & PRACTICE</small></div><div className="mixed-intro"><h2>Learning by<br/><em>making things.</em></h2><p>Different rooms, different problems. Every experience adds another layer to how I build.</p><span className="marker-scribble">KEEP<br/>MAKING ↗</span></div><div className="experience-grid"><article className="experience-card paper-card"><div className="paper-tape"></div><div className="exp-index">FIELD NOTE / 01</div><div className="exp-stamp">WEB<br/>DEV</div><h3>Aerialroot<br/>Infotech</h3><p className="exp-role">Web Development Intern</p><p>Worked through practical web development tasks and learned how real project requirements shape interfaces and implementation.</p><div className="exp-bottom"><span>JUN — JUL 2025</span><b>01 / 03</b></div></article><article className="experience-card red-card"><div className="exp-index">FIELD NOTE / 02</div><div className="exp-stamp">CLOUD<br/>LAB</div><h3>CodeAlpha</h3><p className="exp-role">Cloud Computing Intern</p><p>Explored cloud computing concepts and project-based work through a virtual internship programme.</p><div className="exp-bottom"><span>SEP — OCT 2026</span><b>02 / 03</b></div></article><article className="experience-card photo-card"><div className="exp-index">FIELD NOTE / 03</div><div className="exp-stamp">IOT<br/>SYSTEM</div><h3>FIREGUARD</h3><p className="exp-role">IoT System / Lab Project</p><p>Hands-on work around an IoT system, bringing hardware, software, and practical debugging together.</p><div className="exp-bottom"><span>JUN — AUG 2026</span><b>03 / 03</b></div></article></div><div className="handwritten-note">not just certificates — things learned, things built, things still in progress.</div></section>
      <section className="section wrap" id="projects"><div className="section-label">02 / SELECTED WORK <span/> <small>01—11</small></div><div className="heading-row"><h2>Things I've been<br/><em>working on.</em></h2><p>A collection of experiments, prototypes, and ideas. Some are in progress — that's where the interesting stuff happens.</p></div><div className="filters">{filters.map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="project-grid">{shown.map(p=><article className={`project tone-${p.tone}`} key={p.n}><div className="project-top"><small>PROJECT / {p.n}</small><span>{p.symbol}</span></div><div className="visual"><i/><i/><b>{p.symbol}</b><small>{p.category.toUpperCase()}</small></div><div className="project-body"><div className="status">● &nbsp;{p.status}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><a href={p.url} target="_blank" rel="noreferrer">Explore project repositories <ArrowUpRight size={15}/></a></div></article>)}</div><div className="more">MORE EXPERIMENTS COMING SOON <span>↘</span></div></section>
      <section className="section wrap" id="skills"><div className="section-label">03 / TOOLKIT <span/></div><div className="heading-row"><h2>Tools of the<br/><em>trade.</em></h2><p>Technologies I use, learn, and reach for when an idea needs to become real.</p></div><div className="skill-layout"><div className="skill-card"><Layers3 size={26}/><small>MY TOOLKIT / 2026</small><h3>Learn it.<br/>Build with it.<br/><em>Make it useful.</em></h3><div>STACK STATUS <b>● EVOLVING</b></div></div><div className="skill-list">{skills.map(([group,items])=><div className="skill-row" key={group}><small>{group}</small><div>{items.map(s=><span key={s}>{s}<ChevronRight size={12}/></span>)}</div></div>)}</div></div></section>
      <section className="section wrap"><div className="section-label">04 / A LITTLE INTERACTION <span/></div><div className="terminal"><div className="term-head"><span>● ● ●</span><small><Terminal size={13}/> senthil@portfolio — interactive shell</small><i>LOCAL SIMULATION</i></div><div className="term-body"><p className="comment"># Hey there. Take the terminal for a spin.</p><p><b>➜</b> <em>~</em> &nbsp;whoami</p><p className="muted">AI & Data Science student · builder · lifelong learner</p><p><b>➜</b> <em>~</em> &nbsp;echo $MOTTO</p><p className="muted">"Stay curious. Ship useful things."</p><p className="response">{output}</p><form onSubmit={run}><b>➜</b><input value={cmd} onChange={e=>setCmd(e.target.value)} placeholder="try help and press Enter..." aria-label="Terminal command"/><button aria-label="Run command"><Send size={15}/></button></form><div className="cmds">{["help","about","skills","projects","contact","clear"].map(c=><button key={c} onClick={()=>{setCmd(c);if(c==="clear")setOutput("");else setOutput(({help:"Commands: about · skills · projects · contact · clear",about:"P. Senthil Velan — AI & Data Science developer interested in applied AI and useful software.",skills:"Python · Java · ML · YOLOv8 · Generative AI · React · Flask · Django · MySQL",projects:"FEDIS-OT · Signify · SmartCart · EON Chatbot · Skin Disease AI · VayuMitra",contact:"Use the contact links below to connect."})[c])}}>{c}</button>)}</div></div></div></section>
      <section className="section wrap contact" id="contact"><div className="section-label">05 / YOUR TURN <span/></div><div className="contact-panel"><div className="contact-content"><small>● OPEN TO INTERNSHIPS & COLLABORATIONS</small><h2>Got an idea?<br/><b>Let's make it real.</b></h2><p>Have a project, opportunity, or just want to talk tech? I'd love to hear from you.</p><a className="btn primary" href="mailto:senthilvelanprabakaran@gmail.com?subject=Let's%20connect">Say hello <Mail size={16}/></a><small className="hint">Reach out for internships, collaborations, and AI projects.</small></div><div className="code-art">const future = <b>"build"</b>;<br/>future.<b>ship</b>(); <span>_</span></div></div><footer><a className="brand" href="#home"><span className="brand-mark">S<span>.</span></span><span>P. SENTHIL VELAN<small> / DEVELOPER</small></span></a><small>DESIGNED TO KEEP EVOLVING · © {new Date().getFullYear()}</small><div className="social"><a href="https://github.com/senthilvelanprabakaran-alt" aria-label="GitHub"><Github size={17}/></a><a href="https://www.linkedin.com/in/senthil-velan-prabakaran-486051382/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="mailto:senthilvelanprabakaran@gmail.com" aria-label="Email"><Mail size={17}/></a></div></footer></section>
    </main>
  </div></>
}
createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);