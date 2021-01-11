export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.closest('.module__info-show') || btn.closest('.module__info-show').nextElementSibling.style.display !== 'block') {
          btn.parentNode.style.cssText = `transform: rotate(45deg); transition: all .3s`;
          btn.closest('.module__info-show').nextElementSibling.style.display = 'block';
        } else {
          btn.parentNode.style.cssText = `transform: rotate(0deg); transition: all .3s`;
          btn.closest('.module__info-show').nextElementSibling.style.display = 'none';
        }
      });
    });
  }
}