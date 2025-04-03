document.addEventListener('DOMContentLoaded', function() {
  const capaInicio = document.getElementById('capa-inicio');
  const contenidoPrincipal = document.getElementById('contenido-principal');

  // Oculta la capa de inicio al hacer clic o tocar
  capaInicio.addEventListener('click', function() {
      // Animación de desvanecimiento
      capaInicio.style.opacity = '0';
      
      // Espera a que termine la transición para ocultar
      setTimeout(() => {
          capaInicio.classList.add('capa-oculta');
          contenidoPrincipal.classList.add('contenido-visible');
      }, 500); // 0.5 segundos (debe coincidir con la transición CSS)
  });
});

const svg = document.querySelector('svg');
const viewBox = svg.viewBox.baseVal;
const centerX = viewBox.width / 2;
const centerY = viewBox.height / 2;

const tl = gsap.timeline({
  defaults: { duration: 2, yoyo: true, ease: 'power2.inOut' }
}).fromTo('.left, .right', {
  svgOrigin: `${centerX} ${centerY}`, // Centro dinámico
  skewY: (i) => [-30, 15][i],
  scaleX: (i) => [0.6, 0.85][i],
  x: () => window.innerWidth * 0.15, // 15% del ancho
}, {
  skewY: (i) => [-15, 30][i],
  scaleX: (i) => [0.85, 0.6][i],
  x: () => -window.innerWidth * 0.15,
}).play(0.5);

const tl2 = gsap.timeline()

document.querySelectorAll('text').forEach((t,i)=>{
  tl2.add(
    gsap.fromTo(t, {
      xPercent:-100,x: () => window.innerWidth * 0.55, // 55% del ancho
    }, {
      duration: 1,
      xPercent: 0,
      x: () => window.innerWidth * 0.45
    })
    , i%3*0.2)
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