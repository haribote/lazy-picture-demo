<template>
  <div class="picture" :class="classNames">
    <transition name="fade">
      <img v-if="!isLoaded" key="placeholder" :src="placeholderSrc" :alt="alt">
      <img v-else key="real" :src="alternativeSrc" :srcset="srcset" :sizes="sizes" :alt="alt">
    </transition>
  </div>
</template>

<script lang="ts">
require('intersection-observer')
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LazyPicture extends Vue {
  @Prop({ type: IntersectionObserver })
  observer = new IntersectionObserver(this.handleIntersection, {
    threshold: 0.5
  })

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

  get alternativeSrc() {
    return this.srcset
      .split(',')[0]
      .replace(/^(.+\.(png|jpe?g|gif|webp)) +.+/, '$1')
  }

  get classNames() {
    const { isBlur, isLandscape, isPortrait, isSquare, isLoaded } = this

    return {
      'is-blur': isBlur && !isLoaded,
      'is-landscape': isLandscape,
      'is-portrait': isPortrait,
      'is-square': isSquare,
      'is-waiting': !isLoaded
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

<style lang="scss" scoped>
.picture {
  position: relative;
  will-change: filter;

  img {
    will-change: opacity;
  }

  &.is-blur {
    transition: filter 300ms linear;
  }
}

.fade {
  @at-root {
    &-enter {
      opacity: 0;
    }
    &-enter-active {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      transition: opacity 300ms linear;
    }
    &-enter-to {
      opacity: 1;
    }
    &-leave {
      opacity: 1;
    }
    &-leave-active {
      transition: opacity 300ms linear;
    }
    &-enter-to {
      opacity: 0.5;
    }
  }
}
</style>
