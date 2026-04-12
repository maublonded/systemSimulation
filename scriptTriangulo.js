const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const W = 560, H = 500, pad = 40;
const triH = (W - pad*2) * Math.sqrt(3)/2;

const VERTS = [
  [W/2,(H-triH)/2+12],
  [pad,(H+triH)/2-12],
  [W-pad,(H+triH)/2-12]
];

const DOT_POS = {
1:[[36,36]],
2:[[20,20],[52,52]],
3:[[20,20],[36,36],[52,52]],
4:[[20,20],[52,20],[20,52],[52,52]],
5:[[20,20],[52,20],[36,36],[20,52],[52,52]],
6:[[20,18],[52,18],[20,36],[52,36],[20,54],[52,54]]
};

const COLORS=['#b5a0d8','#f0a8a8','#a8d8b5'];
const SPEEDS=[80,300,900,3000,10000];

let px=W/2, py=H/2, count=0;
let running=false, raf=null;

function drawDots(face){
  const g=document.getElementById('dots');
  g.innerHTML='';
  DOT_POS[face].forEach(([cx,cy])=>{
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',cx);
    c.setAttribute('cy',cy);
    c.setAttribute('r',5.5);
    c.setAttribute('class','dot');
    g.appendChild(c);
  });
}

function initCanvas(){
  ctx.clearRect(0,0,W,H);
}

function step(){
  if(!running)return;

  const batch=SPEEDS[document.getElementById('speed').value-1];

  for(let i=0;i<batch;i++){
    const vi=Math.floor(Math.random()*3);
    const [vx,vy]=VERTS[vi];
    px=(px+vx)/2;
    py=(py+vy)/2;

    ctx.fillStyle=COLORS[vi];
    ctx.fillRect(px,py,1.5,1.5);

    drawDots(Math.floor(Math.random()*6)+1);
    count++;
  }

  document.getElementById('iter-count').textContent=count.toLocaleString('es-MX');

  raf=requestAnimationFrame(step);
}

document.getElementById('btn-start').onclick=()=>{
  running=true;
  document.getElementById('btn-start').disabled=true;
  document.getElementById('btn-pause').disabled=false;
  step();
};

document.getElementById('btn-pause').onclick=()=>{
  running=!running;
  if(running)step();
};

document.getElementById('btn-reset').onclick=()=>{
  running=false;
  cancelAnimationFrame(raf);
  px=W/2; py=H/2; count=0;
  initCanvas();
  drawDots(1);
  document.getElementById('iter-count').textContent='0';
  document.getElementById('btn-start').disabled=false;
  document.getElementById('btn-pause').disabled=true;
};

initCanvas();
drawDots(1);