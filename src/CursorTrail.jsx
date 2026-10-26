import { useEffect } from "react";

export default function CursorTrail(){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isCoarse=window.matchMedia("(pointer: coarse)").matches;
    const canvas=document.createElement("canvas");
    canvas.setAttribute("aria-hidden","true");
    canvas.className="portfolio-comet-cursor";
    Object.assign(canvas.style,{
      position:"fixed",left:"0",top:"0",width:"100vw",height:"100vh",
      pointerEvents:"none",zIndex:"2147483647",display:"block"
    });
    document.documentElement.appendChild(canvas);
    const ctx=canvas.getContext("2d");
    if(!ctx){canvas.remove();return;}
    let width=0,height=0,raf=0;
    const points=[];
    const activeTouchPointers=new Set();
    const maxAge=isCoarse?220:360;
    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,isCoarse?1.25:2);
      width=window.innerWidth;height=window.innerHeight;
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const push=(x,y)=>{
      points.push({x,y,t:performance.now()});
      const maxPoints=isCoarse?16:28;
      if(points.length>maxPoints) points.splice(0,points.length-maxPoints);
      if(!raf) raf=requestAnimationFrame(draw);
    };
    const down=e=>{
      if(e.pointerType==="touch" || e.pointerType==="pen") activeTouchPointers.add(e.pointerId);
      if(e.pointerType==="mouse" || e.pointerType==="touch" || e.pointerType==="pen") push(e.clientX,e.clientY);
    };
    const move=e=>{
      // Mouse trails follow normal cursor movement; touch/pen trails follow active gestures.
      if(e.pointerType==="mouse" || activeTouchPointers.has(e.pointerId)) push(e.clientX,e.clientY);
    };
    const up=e=>activeTouchPointers.delete(e.pointerId);
    const draw=now=>{
      raf=0;ctx.clearRect(0,0,width,height);
      while(points.length && now-points[0].t>maxAge) points.shift();
      for(let i=1;i<points.length;i++){
        const a=points[i-1],b=points[i];
        const alpha=Math.max(0,1-(now-b.t)/maxAge);
        if(alpha<=0) continue;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.lineCap="round";ctx.lineJoin="round";
        ctx.strokeStyle="rgba(255,38,56,"+(alpha*.9)+")";
        ctx.lineWidth=Math.max(.8,(isCoarse?3.6:4.8)*(i/points.length)*alpha);
        ctx.shadowColor="#ff2638";ctx.shadowBlur=(isCoarse?4:9)*alpha;ctx.stroke();
      }
      if(points.length){
        const p=points[points.length-1],alpha=Math.max(0,1-(now-p.t)/maxAge);
        if(alpha>0){
          ctx.beginPath();ctx.arc(p.x,p.y,2.8,0,Math.PI*2);
          ctx.fillStyle="rgba(255,255,255,"+alpha+")";
          ctx.shadowColor="#ff2638";ctx.shadowBlur=isCoarse?6:12;ctx.fill();
        }
      }
      ctx.shadowBlur=0;
      if(points.length) raf=requestAnimationFrame(draw);
    };
    const clear=()=>{
      points.length=0;activeTouchPointers.clear();
      if(raf)cancelAnimationFrame(raf);
      raf=0;ctx.clearRect(0,0,width,height);
    };
    resize();
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("pointerdown",down,{passive:true,capture:true});
    window.addEventListener("pointermove",move,{passive:true,capture:true});
    window.addEventListener("pointerup",up,{passive:true,capture:true});
    window.addEventListener("pointercancel",up,{passive:true,capture:true});
    window.addEventListener("blur",clear);
    return ()=>{
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointerdown",down,true);
      window.removeEventListener("pointermove",move,true);
      window.removeEventListener("pointerup",up,true);
      window.removeEventListener("pointercancel",up,true);
      window.removeEventListener("blur",clear);
      if(raf)cancelAnimationFrame(raf);
      canvas.remove();
    };
  },[]);
  return null;
}
