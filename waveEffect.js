const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let waves = [];

// Clase para las ondas
class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0; // Radio inicial
    this.alpha = 1; // Opacidad inicial
    this.speed = 2; // Velocidad de expansión
  }

  update() {
    this.radius += this.speed; // Aumentar el radio
    this.alpha -= 0.02; // Disminuir la opacidad
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = `rgba(0, 255, 255, ${this.alpha})`; // Color de las ondas
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  isFinished() {
    return this.alpha <= 0; // Verificar si la onda ha desaparecido
  }
}

// Manejar el movimiento del mouse
canvas.addEventListener('mousemove', (event) => {
  const wave = new Wave(event.clientX, event.clientY); // Crear nueva onda en la posición del mouse
  waves.push(wave); // Añadir a la lista de ondas
});

// Animar las ondas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
  for (let i = 0; i < waves.length; i++) {
    waves[i].update(); // Actualizar la onda
    waves[i].draw(); // Dibujar la onda
    if (waves[i].isFinished()) {
      waves.splice(i, 1); // Eliminar la onda si ha terminado
      i--; // Decrementar el índice para no saltar una onda
    }
  }
  requestAnimationFrame(animate); // Llamar a la función animate nuevamente
}

// Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Comenzar la animación
animate();
