<template>
  <div class="picture" :class="classNames">
    <img :src="currentSrc" :srcset="currentSrcSet" :sizes="sizes" :alt="alt">
  </div>
</template>

<script lang="ts">
require('intersection-observer')
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LazyPicture extends Vue {
  @Prop({ type: IntersectionObserver })
  observer = new IntersectionObserver(this.handleIntersection)

  @Prop({ required: true })
  placeholderSrc!: string

  @Prop({ required: true })
  srcset!: string

  @Prop({ required: true })
  sizes!: string

  @Prop({ default: '' })
  alt!: string

  @Prop({ default: false })
  isBlur!: boolean

  @Prop({ default: false })
  isLandscape!: boolean

  @Prop({ default: false })
  isPortrait!: boolean

  @Prop({ default: false })
  isSquare!: boolean

  isLoaded = false

  get currentSrc() {
    return this.isLoaded ? this.alternativeSrc : this.placeholderSrc
  }

  get alternativeSrc() {
    return this.srcset
      .split(',')[0]
      .replace(/^(.+\.(png|jpe?g|gif|webp)) +.+/, '$1')
  }

  get currentSrcSet() {
    return this.isLoaded ? this.srcset : this.placeholderSrc
  }

  get classNames() {
    const { isBlur, isLandscape, isPortrait, isSquare, isLoaded } = this

    return {
      'is-blur': isBlur && !isLoaded,
      'is-landscape': isLandscape,
      'is-portrait': isPortrait,
      'is-square': isSquare
    }
  }

  mounted() {
    this.observer.observe(this.$el)
  }

  preloadImage() {
    const { alternativeSrc, sizes, srcset } = this
    const imgEl = new Image()

    imgEl.onload = () => (this.isLoaded = true)

    imgEl.sizes = sizes
    imgEl.srcset = srcset
    imgEl.src = alternativeSrc
  }

  handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.observer.unobserve(this.$el)
        this.preloadImage()
      }
    })
  }
}
</script>

<style scoped>
</style>
