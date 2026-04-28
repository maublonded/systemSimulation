const board = document.getElementById("board");
const timerDisplay = document.getElementById("timer");

let cells = [];
let currentPlayer = "X";
let gameActive = false;
let time = 180;
let interval;

const themes = [
  ["❌","⭕"],
  ["🐱","🐶"],
  ["🔥","💧"]
];

let selectedTheme = themes[0];

function startGame(){
  board.innerHTML = ""; // limpia tablero y líneas
  cells = [];
  gameActive = true;
  currentPlayer = "X";

  selectedTheme = themes[document.getElementById("themeSelect").value];

  document.documentElement.style.setProperty(
    "--winColor",
    document.getElementById("winColor").value
  );

  for(let i=0;i<9;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const color = (i % 2 === 0)
      ? document.getElementById("color1").value
      : document.getElementById("color2").value;

    cell.style.background = color;

    cell.addEventListener("click", () => play(cell,i));
    board.appendChild(cell);
    cells.push("");
  }

  startTimer();
}

function play(cell,index){
  if(!gameActive || cells[index] !== "") return;

  const symbol = currentPlayer === "X"
    ? selectedTheme[0]
    : selectedTheme[1];

  cell.textContent = symbol;
  cells[index] = currentPlayer;

  if(checkWin()){
    gameActive = false;
    clearInterval(interval);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(){
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let combo of combos){
    const [a,b,c] = combo;
    if(cells[a] && cells[a]===cells[b] && cells[a]===cells[c]){
      drawWinLine(combo);
      return true;
    }
  }
  return false;
}

function drawWinLine(combo){
  const line = document.createElement("div");
  line.classList.add("win-line");

  const size = board.offsetWidth; // tamaño total del tablero
  const cell = size / 3; // tamaño de cada celda

  const map = {
    "0,1,2": { x: size/2, y: cell/2, angle: 0 },
    "3,4,5": { x: size/2, y: cell*1.5, angle: 0 },
    "6,7,8": { x: size/2, y: cell*2.5, angle: 0 },

    "0,3,6": { x: cell/2, y: size/2, angle: 90 },
    "1,4,7": { x: cell*1.5, y: size/2, angle: 90 },
    "2,5,8": { x: cell*2.5, y: size/2, angle: 90 },

    "0,4,8": { x: size/2, y: size/2, angle: 45 },
    "2,4,6": { x: size/2, y: size/2, angle: -45 }
  };

  const key = combo.join(",");
  const config = map[key];

  line.style.width = `${size}px`;
  line.style.left = `${config.x - size/2}px`;
  line.style.top = `${config.y - 2}px`; // centrado vertical
  line.style.transform = `rotate(${config.angle}deg)`;

  board.appendChild(line);
}

function startTimer(){
  clearInterval(interval);
  time = 180;

  interval = setInterval(()=>{
    time--;

    const min = String(Math.floor(time/60)).padStart(2,"0");
    const sec = String(time%60).padStart(2,"0");

    timerDisplay.textContent = `${min}:${sec}`;

    if(time<=0){
      gameActive = false;
      clearInterval(interval);
      alert("Tiempo terminado. Empate.");
    }

  },1000);
}