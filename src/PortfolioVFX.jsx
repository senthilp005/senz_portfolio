import { useEffect } from "react";

export default function PortfolioVFX(){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas=document.createElement("canvas");
    canvas.className="portfolio-vfx-canvas";
    canvas.setAttribute("aria-hidden","true");
    Object.assign(canvas.style,{position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"4"});
    document.documentElement.appendChild(canvas);
    const ctx=canvas.getContext("2d",{alpha:true});
    if(!ctx){canvas.remove();return;}
    let w=0,h=0,raf=0,last=0;
    const touchMode=window.matchMedia("(pointer: coarse)").matches;
    const count=touchMode?22:42;
    const particles=Array.from({length:count},()=>({
      x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
      r:Math.random()*1.7+.5,vx:(Math.random()-.5)*.22,vy:-(Math.random()*.32+.08),
      a:Math.random()*.45+.12,phase:Math.random()*Math.PI*2
    }));
    const bursts=[];
    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const burst=(x,y)=>{
      bursts.push({x,y,t:performance.now(),parts:Array.from({length:touchMode?8:12},(_,i)=>{
        const angle=i*Math.PI*2/(touchMode?8:12),speed=1.2+Math.random()*2.3;
        return {x:0,y:0,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r:1+Math.random()*1.5};
      })});
      if(bursts.length>5) bursts.shift();
      if(!raf) raf=requestAnimationFrame(draw);
    };
    const onDown=e=>{if(e.pointerType==="touch"||e.pointerType==="pen"||e.pointerType==="mouse") burst(e.clientX,e.clientY);};
    const draw=now=>{
      raf=0;ctx.clearRect(0,0,w,h);
      const dt=Math.min(32,now-(last||now));last=now;
      for(const p of particles){
        p.x+=p.vx*dt;p.y+=p.vy*dt;
        if(p.y<-8){p.y=h+8;p.x=Math.random()*w;}
        if(p.x<-8)p.x=w+8;if(p.x>w+8)p.x=-8;
        const flicker=.65+.35*Math.sin(now*.002+p.phase);
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(255,42,62,"+(p.a*flicker)+")";ctx.fill();
      }
      for(let bi=bursts.length-1;bi>=0;bi--){
        const b=bursts[bi],age=now-b.t,alpha=Math.max(0,1-age/430);
        if(alpha<=0){bursts.splice(bi,1);continue;}
        for(const p of b.parts){
          const x=b.x+p.vx*age*.075,y=b.y+p.vy*age*.075;
          ctx.beginPath();ctx.arc(x,y,p.r*alpha,0,Math.PI*2);
          ctx.fillStyle="rgba(255,55,72,"+alpha+")";ctx.shadowColor="#ff2638";ctx.shadowBlur=8*alpha;ctx.fill();
        }
      }
      ctx.shadowBlur=0;
      if(!document.hidden) raf=requestAnimationFrame(draw);
    };
    resize();
    raf=requestAnimationFrame(draw);
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("pointerdown",onDown,{passive:true});
    document.addEventListener("visibilitychange",()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}else if(!raf)raf=requestAnimationFrame(draw);});
    return ()=>{window.removeEventListener("resize",resize);window.removeEventListener("pointerdown",onDown);if(raf)cancelAnimationFrame(raf);canvas.remove();};
  },[]);
  return null;
}
