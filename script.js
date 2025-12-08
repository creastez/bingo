const grid = document.getElementById('grid');
const counter = document.getElementById('counter');

function generateBingo() {
  grid.innerHTML = '';
  counter.innerText = 'Nenhum marcado';

  const text = document.getElementById('input').value.trim();
  if (!text) return;

  const items = text.split('\n').filter(line => line.trim() !== '');
  const size = Math.ceil(Math.sqrt(items.length));
  grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(140px, 1fr))`;

  items.forEach(name => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = name;

    cell.onclick = () => {
      cell.classList.toggle('marked');
      updateCounter();
    };

    grid.appendChild(cell);
  });
}

function updateCounter() {
  const markedCount = document.querySelectorAll('.cell.marked').length;
  if (markedCount === 0) counter.innerText = 'Nenhum marcado';
  else if (markedCount === 1) counter.innerText = '1 marcado';
  else counter.innerText = `${markedCount} marcados`;
}

// Gerenciar toggle do painel lateral das cores
document.querySelectorAll('.color-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.contains('open');

    // Fecha todos
    document.querySelectorAll('.color-options').forEach(opt => opt.classList.remove('open'));

    // Abre ou fecha o clicado
    if (!isOpen) target.classList.add('open');
  });
});

// Alterar as cores do site ao clicar nas bolas
document.querySelectorAll('.color-ball').forEach(ball => {
  ball.addEventListener('click', () => {
    const color = ball.dataset.color;

    // Define a variável CSS correta baseado no pai
    const parentId = ball.parentElement.id;

    // Remove seleção anterior no grupo
    ball.parentElement.querySelectorAll('.color-ball').forEach(b => b.classList.remove('selected'));

    ball.classList.add('selected');

    if (parentId === 'bgColors') {
      document.documentElement.style.setProperty('--bg-color', color);
    } else if (parentId === 'titleColors') {
      document.documentElement.style.setProperty('--title-color', color);
      document.documentElement.style.setProperty('--cell-hover', color);
      document.documentElement.style.setProperty('--cell-marked', shadeColor(color, -30));
    } else if (parentId === 'cellColors') {
      document.documentElement.style.setProperty('--cell-bg', color);
    }
  });
});

// Função para escurecer uma cor em HEX (para criar variação mais escura)
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}
