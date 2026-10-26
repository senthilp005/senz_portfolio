import { useEffect } from "react";

export default function CursorTrail(){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas=document.createElement("canvas");
    canvas.setAttribute("aria-hidden","true");
    canvas.className="portfolio-comet-cursor";
    Object.assign(canvas.style,{
      position:"fixed",left:"0",top:"0",width:"100vw",height:"100vh",
      pointerEvents:"none",zIndex:"2147483647",display:"block"
    });
    document.documentElement.appendChild(canvas);

    const ctx=canvas.getContext("2d",{alpha:true});
    if(!ctx){canvas.remove();return;}

    let width=0,height=0,raf=0;
    const points=[];
    const activePointers=new Set();
    const maxAge=230;
    const maxPoints=22;

    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      width=window.innerWidth;
      height=window.innerHeight;
      canvas.width=Math.round(width*dpr);
      canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };

    const push=(x,y)=>{
      const last=points[points.length-1];
      // Ignore near-identical duplicate samples, which cause visible jitter.
      if(last && Math.hypot(x-last.x,y-last.y)<1.5) return;
      points.push({x,y,t:performance.now()});
      if(points.length>maxPoints) points.splice(0,points.length-maxPoints);
      if(!raf) raf=requestAnimationFrame(draw);
    };

    const down=e=>{
      if(e.pointerType==="touch" || e.pointerType==="pen") activePointers.add(e.pointerId);
      if(e.pointerType==="mouse" || e.pointerType==="touch" || e.pointerType==="pen") push(e.clientX,e.clientY);
    };
    const move=e=>{
      if(e.pointerType==="mouse" || activePointers.has(e.pointerId)) push(e.clientX,e.clientY);
    };
    const up=e=>activePointers.delete(e.pointerId);

    const draw=now=>{
      raf=0;
      ctx.clearRect(0,0,width,height);
      while(points.length && now-points[0].t>maxAge) points.shift();

      if(points.length>1){
        ctx.lineCap="round";
        ctx.lineJoin="round";
        for(let i=1;i<points.length;i++){
          const a=points[i-1],b=points[i];
          const age=(now-b.t)/maxAge;
          const alpha=Math.max(0,1-age);
          if(alpha<=0) continue;
          // Quadratic midpoint segments soften the jagged corners between touch samples.
          const prev=points[i-2]||a;
          const startX=(prev.x+a.x)/2;
          const startY=(prev.y+a.y)/2;
          const endX=(a.x+b.x)/2;
          const endY=(a.y+b.y)/2;
          ctx.beginPath();
          ctx.moveTo(startX,startY);
          ctx.quadraticCurveTo(a.x,a.y,endX,endY);
          ctx.strokeStyle="rgba(255,38,56,"+(alpha*.72)+")";
          ctx.lineWidth=Math.max(.65,3.2*(i/points.length)*alpha);
          ctx.shadowBlur=0;
          ctx.stroke();
        }
      }

      if(points.length){
        const p=points[points.length-1];
        const alpha=Math.max(0,1-(now-p.t)/maxAge);
        if(alpha>0){
          ctx.beginPath();
          ctx.arc(p.x,p.y,2.1,0,Math.PI*2);
          ctx.fillStyle="rgba(255,255,255,"+alpha+")";
          ctx.fill();
        }
        raf=requestAnimationFrame(draw);
      }
    };

    const clear=()=>{
      points.length=0;
      activePointers.clear();
      if(raf) cancelAnimationFrame(raf);
      raf=0;
      ctx.clearRect(0,0,width,height);
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
      if(raf) cancelAnimationFrame(raf);
      canvas.remove();
    };
  },[]);
  return null;
}
