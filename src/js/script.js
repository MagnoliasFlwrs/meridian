
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider').forEach((el) => {
    new ItcSlider(el, {
      loop: true,
      swipe: true,
    })
  });
});