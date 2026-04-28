const _ptm = document.getElementById("\x62\x6f\x61\x72\x64");
const _pDheEV = document.getElementById("\x74\x69\x6d\x65\x72");

let _qua = [];
let _feoLydO = "\x58";
let _iGh = false;
let _zdb = 180;
let _QmxBa;

const _Fyr = [
  ["\x274c","\x2b55"],
  ["\xd83d\xdc31","\xd83d\xdc36"],
  ["\xd83d\xdd25","\xd83d\xdca7"]
];

let _wsbuoLSA = themes[0];

function fnioiJ(){
  board.innerHTML = ""; // limpia tablero y líneas
  cells = [];
  gameActive = true;
  currentPlayer = "\x58";

  selectedTheme = themes[document.getElementById("\x74\x68\x65\x6d\x65\x53\x65\x6c\x65\x63\x74").value];

  document.documentElement.style.setProperty(
    "\x2d\x2d\x77\x69\x6e\x43\x6f\x6c\x6f\x72",
    document.getElementById("\x77\x69\x6e\x43\x6f\x6c\x6f\x72").value
  );

  for(let _PeIMqzZ=0;i<9;i++){
    const _CUr = document.createElement("\x64\x69\x76");
    cell.classList.add("\x63\x65\x6c\x6c");

    const _OXg = (i % 2 === 0)
      ? document.getElementById("\x63\x6f\x6c\x6f\x72\x31").value
      : document.getElementById("\x63\x6f\x6c\x6f\x72\x32").value;

    cell.style.background = color;

    cell.addEventListener("\x63\x6c\x69\x63\x6b", () => play(cell,i));
    board.appendChild(cell);
    cells.push("");
  }

  startTimer();
}

function fnJtiCjwBB(cell,index){
  if(!gameActive || cells[index] !== "") return;

  const _uPE = currentPlayer === "\x58"
    ? selectedTheme[0]
    : selectedTheme[1];

  cell.textContent = symbol;
  cells[index] = currentPlayer;

  if(checkWin()){
    gameActive = false;
    clearInterval(interval);
    return;
  }

  currentPlayer = currentPlayer === "\x58" ? "\x4f" : "\x58";
}

function fntHPrSM(){
  const _mXqlj = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let _jajVSp of combos){
    const [a,b,c] = combo;
    if(cells[a] && cells[a]===cells[b] && cells[a]===cells[c]){
      drawWinLine(combo);
      return true;
    }
  }
  return false;
}

function fnzIC(combo){
  const _UFhEdifB = document.createElement("\x64\x69\x76");
  line.classList.add("\x77\x69\x6e\x2d\x6c\x69\x6e\x65");

  const _QkEELft = board.offsetWidth; // tamaño total del tablero
  const _CUr = size / 3; // tamaño de cada celda

  const _UMaoR = {
    "\x30\x2c\x31\x2c\x32": { x: size/2, y: cell/2, angle: 0 },
    "\x33\x2c\x34\x2c\x35": { x: size/2, y: cell*1.5, angle: 0 },
    "\x36\x2c\x37\x2c\x38": { x: size/2, y: cell*2.5, angle: 0 },

    "\x30\x2c\x33\x2c\x36": { x: cell/2, y: size/2, angle: 90 },
    "\x31\x2c\x34\x2c\x37": { x: cell*1.5, y: size/2, angle: 90 },
    "\x32\x2c\x35\x2c\x38": { x: cell*2.5, y: size/2, angle: 90 },

    "\x30\x2c\x34\x2c\x38": { x: size/2, y: size/2, angle: 45 },
    "\x32\x2c\x34\x2c\x36": { x: size/2, y: size/2, angle: -45 }
  };

  const _TdYGRPl = combo.join("\x2c");
  const _dqkHCSF = map[key];

  line.style.width = `\x24\x7b\x73\x69\x7a\x65\x7d\x70\x78`;
  line.style.left = `\x24\x7b\x63\x6f\x6e\x66\x69\x67\x2e\x78\x20\x2d\x20\x73\x69\x7a\x65\x2f\x32\x7d\x70\x78`;
  line.style.top = `\x24\x7b\x63\x6f\x6e\x66\x69\x67\x2e\x79\x20\x2d\x20\x32\x7d\x70\x78`; // centrado vertical
  line.style.transform = `\x72\x6f\x74\x61\x74\x65\x28\x24\x7b\x63\x6f\x6e\x66\x69\x67\x2e\x61\x6e\x67\x6c\x65\x7d\x64\x65\x67\x29`;

  board.appendChild(line);
}

function fntCnsoBV(){
  clearInterval(interval);
  time = 180;

  interval = setInterval(()=>{
    time--;

    const _aAGVLVVt = String(Math.floor(time/60)).padStart(2,"\x30");
    const _Orf = String(time%60).padStart(2,"\x30");

    timerDisplay.textContent = `\x24\x7b\x6d\x69\x6e\x7d\x3a\x24\x7b\x73\x65\x63\x7d`;

    if(time<=0){
      gameActive = false;
      clearInterval(interval);
      alert("\x54\x69\x65\x6d\x70\x6f\x20\x74\x65\x72\x6d\x69\x6e\x61\x64\x6f\x2e\x20\x45\x6d\x70\x61\x74\x65\x2e");
    }

  },1000);
}