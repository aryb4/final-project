(() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let dots = [];

  function initBackgroundAnimation() {
    const heroSection = document.getElementById('hero');

    if (!heroSection) {
      console.error("ERROR: Element with id 'hero' not found.");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    heroSection.appendChild(canvas);

    const totalDots = 100;
    dots = Array.from({ length: totalDots }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      baseAlpha: Math.random() * 0.5 + 0.3,
      alpha: 0,
      direction: Math.random() < 0.5 ? 1 : -1,
      speed: Math.random() * 0.02 + 0.005
    }));

    animateDots();
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
      dot.alpha += dot.speed * dot.direction;

      if (dot.alpha >= dot.baseAlpha || dot.alpha <= 0) {
        dot.direction *= -1;
        dot.alpha = Math.max(0, Math.min(dot.alpha, dot.baseAlpha));
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animateDots);
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  initBackgroundAnimation();
})();
