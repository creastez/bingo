const grid = document.getElementById('grid');
const counter = document.getElementById('counter');

function generateBingo() {
  grid.innerHTML = '';
  counter.innerText = 'Nenhum marcado';

  const text = document.getElementById('input').value.trim();
  if (!text) return;

  const items = text.split('\n').filter(line => line.trim() !== '');
  const size = Math.ceil(Math.sqrt(items.length));
  grid.style.gridTemplateColumns = `repeat(${size}, minmax(100px, 1fr))`;

  items.forEach(name => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = name;

    cell.onclick = () => {
      cell.classList.toggle('marked');
      const markedCount = document.querySelectorAll('.cell.marked').length;
      counter.innerText = markedCount === 0 ? 'Nenhum marcado' :
        markedCount === 1 ? '1 marcado' : markedCount + ' marcados';
    };

    grid.appendChild(cell);
  });
}

// Função para atualizar cores via painel lateral
document.getElementById('bgColorSelect').addEventListener('change', e => {
  document.documentElement.style.setProperty('--bg-color', e.target.value);
});

document.getElementById('titleColorSelect').addEventListener('change', e => {
  document.documentElement.style.setProperty('--title-color', e.target.value);
  document.documentElement.style.setProperty('--cell-hover', e.target.value);
});

document.getElementById('cellColorSelect').addEventListener('change', e => {
  document.documentElement.style.setProperty('--cell-bg', e.target.value);
});
