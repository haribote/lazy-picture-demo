<template>
  <div class="container" id="app">
    <LazyPicture
      v-for="(picture, index) in pictures"
      :key="index"
      v-bind="picture"
      @ready="handleReadyLazyPicture"
    ></LazyPicture>
  </div>
</template>

<script lang="ts">
import 'core-js/fn/map'
import 'intersection-observer'
import { Component, Prop, Vue } from 'vue-property-decorator'
import LazyPicture from './components/LazyPicture.vue'
import { LazyPictureProps } from './models/LazyPictureProps'

@Component({
  components: {
    LazyPicture
  }
})
export default class App extends Vue {
  /** 画像情報の配列 */
  @Prop({
    default() {
      return []
    }
  })
  pictures!: LazyPictureProps[]

  /** IntersectionObserver */
  private observer = new IntersectionObserver(this.handleIntersect, {
    threshold: 0.5
  })

  /** IntersectionObserverのハンドラーマップ */
  private handlers = new Map<Element, () => void>()

  handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { target } = entry
        this.observer.unobserve(target)
        this.handlers.get(target)!()
      }
    })
  }

  handleReadyLazyPicture($el: HTMLElement, handler: () => void) {
    this.handlers.set($el, handler)
    this.observer.observe($el)
  }
}
</script>
