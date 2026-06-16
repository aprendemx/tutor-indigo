/**
 * Popup inicial del home.
 *
 * Muestra un anuncio en la esquina inferior izquierda con un overlay que
 * oscurece el resto del contenido. Se cierra (con un fade sutil) al hacer clic
 * fuera de la imagen, en la "x", o con la tecla Escape.
 */
(function () {
  'use strict';

  function initPopup() {
    var popup = document.getElementById('popup-inicial');
    if (!popup) {
      return;
    }

    // Dispara el fade-in en el siguiente frame para que la transición corra.
    window.requestAnimationFrame(function () {
      popup.classList.add('is-visible');
    });

    function closePopup() {
      popup.classList.remove('is-visible');
      // Quita el nodo al terminar el fade para que no bloquee clics.
      window.setTimeout(function () {
        if (popup && popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 350);
    }

    // Cierra al hacer clic en el overlay o en la "x" (elementos con data-popup-close).
    popup.addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-popup-close')) {
        closePopup();
      }
    });

    // Cierra con la tecla Escape.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        closePopup();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
  } else {
    initPopup();
  }
})();
