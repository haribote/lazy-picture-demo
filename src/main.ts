import 'normalize.css'
import './assets/style.scss'
import LazyPicture from './components/LazyPicture.vue'

Array.from(document.querySelectorAll('.js-picture')).forEach(el => {
  const imgEl = el.querySelector('img')

  if (!imgEl) {
    return
  }
  const placeholderSrc = imgEl.getAttribute('src')
  const srcset = imgEl.dataset.srcset
  const sizes = imgEl.sizes
  const alt = imgEl.alt
  const isBlur = el.classList.contains('is-blur')
  const isLandscape = el.classList.contains('is-landscape')
  const isPortrait = el.classList.contains('is-portrait')
  const isSquare = el.classList.contains('is-square')

  // tslint:disable-next-line:no-unused-expression
  new LazyPicture({
    el,
    propsData: {
      placeholderSrc,
      srcset,
      sizes,
      alt,
      isBlur,
      isLandscape,
      isPortrait,
      isSquare
    }
  })
})
