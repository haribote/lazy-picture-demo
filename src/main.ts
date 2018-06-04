import 'normalize.css'
import App from './App.vue'
import './assets/style.scss'
import { LazyPictureProps } from './models/LazyPictureProps'

function main() {
  const wrapper = document.getElementById('app')

  if (!wrapper) {
    return
  }

  const pictures = Array.from(document.querySelectorAll('.js-picture'))
    .map<LazyPictureProps | undefined>(el => {
      const imgEl = el.querySelector('img')

      if (!imgEl) {
        return undefined
      }

      const placeholderSrc = imgEl.getAttribute('src') || ''
      const srcset = imgEl.dataset.srcset || ''
      const sizes = imgEl.sizes
      const alt = imgEl.alt
      const isBlur = el.classList.contains('is-blur')
      const isLandscape = el.classList.contains('is-landscape')
      const isPortrait = el.classList.contains('is-portrait')
      const isSquare = el.classList.contains('is-square')

      return {
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
    .filter(picture => picture !== undefined)

  const app = new App({
    propsData: { pictures }
  })

  app.$mount(wrapper)
}

main()
