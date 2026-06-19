/**
 * Popup inicial del home.
 *
 * Muestra un anuncio en la esquina inferior izquierda con un overlay que
 * oscurece el resto del contenido. Se cierra (con un fade sutil) al hacer clic
 * fuera de la imagen, en la "x", o con la tecla Escape.
 *
 * La imagen se sirve desde una URL de referencia (el `src` del <img> en
 * index.html). Para cambiar el anuncio basta con reemplazar el archivo detrás
 * de esa URL: NO hace falta tocar este código. Si la URL no devuelve una
 * imagen válida (404, error de red, o el archivo se quitó del servidor), el
 * popup no se muestra y se elimina del DOM por completo.
 */
(function () {
  'use strict';

  function initPopup() {
    var popup = document.getElementById('popup-inicial');
    if (!popup) {
      return;
    }

    function removePopup() {
      if (popup && popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }

    var img = popup.querySelector('.popup-inicial__img');
    if (!img) {
      removePopup();
      return;
    }

    function showPopup() {
      // Dispara el fade-in en el siguiente frame para que la transición corra.
      window.requestAnimationFrame(function () {
        popup.classList.add('is-visible');
      });
    }

    function closePopup() {
      popup.classList.remove('is-visible');
      // Quita el nodo al terminar el fade para que no bloquee clics.
      window.setTimeout(removePopup, 350);
    }

    // Decide mostrar u ocultar según si la imagen de referencia carga bien.
    // naturalWidth === 0 indica que el recurso resolvió pero no es una imagen.
    function onImageReady() {
      if (img.naturalWidth > 0) {
        showPopup();
      } else {
        removePopup();
      }
    }

    if (img.complete) {
      // La imagen ya resolvió antes de que corriera el script.
      onImageReady();
    } else {
      img.addEventListener('load', onImageReady);
      img.addEventListener('error', removePopup);
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
