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