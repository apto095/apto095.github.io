document.addEventListener('DOMContentLoaded', function() {
  const capaInicio = document.getElementById('capa-inicio');
  const capaInicioFondo = document.getElementById('capa-inicio-fondo');
  const contenidoPrincipal = document.getElementById('contenido-principal');

  // Oculta la capa de inicio al hacer clic o tocar
  capaInicio.addEventListener('click', function() {
      // Animación de desvanecimiento
      capaInicio.style.opacity = '0';
      
      // Espera a que termine la transición para ocultar
      setTimeout(() => {
          capaInicio.classList.add('capa-limbo');
          capaInicioFondo.classList.add('capa-fondo');
      }, 500); // 0.5 segundos (debe coincidir con la transición CSS)

      capaInicioFondo.style.opacity = '0';
      setTimeout(() => {
        capaInicioFondo.classList.add('capa-oculta');
        contenidoPrincipal.classList.add('contenido-visible');
    }, 400);
  });
});

const svg = document.querySelector('svg');
const viewBox = svg.viewBox.baseVal;
const centerX = viewBox.width / 2;
const centerY = viewBox.height / 2;

const tl = gsap.timeline({
  defaults: { duration: 2, yoyo: true, ease: 'power2.inOut' }
}).fromTo('.left, .right', {
  svgOrigin: `640 500`, // Centro dinámico
  skewY: (i) => [-30, 15][i],
  scaleX: (i) => [0.6, 0.85][i],
  x: () => window.innerWidth * 0.15, // 15% del ancho
  y: () => window.innerHeight * 0.05, // 15% de la altura
}, {
  skewY: (i) => [-15, 30][i],
  scaleX: (i) => [0.85, 0.6][i],
  x: () => -window.innerWidth * 0.01,
}).play(0.5);

const tl2 = gsap.timeline()

document.querySelectorAll('text').forEach((t,i)=>{
  tl2.add(
    gsap.fromTo(t, {
      xPercent:100,
      x: () => window.innerWidth * 0.15,
    }, {
      duration: 0.8,
      xPercent: 0,
      x: () => window.innerWidth * 0.15
    })
    , i%3*0.4)
})



window.onpointermove = (e) => {
  tl.pause();
  tl2.pause();
  gsap.to([tl, tl2], {
    duration: 2,
    ease: 'power4',
    progress: e.clientX / window.innerWidth // Usar clientX en lugar de x
  });
};