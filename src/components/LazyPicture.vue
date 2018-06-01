<template>
  <div class="picture" :class="classNames">
    <img :src="src" :sizes="sizes" :alt="alt">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LazyPicture extends Vue {
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

  src = ''

  get classNames() {
    const { isBlur, isLandscape, isPortrait, isSquare } = this

    return {
      'is-blur': isBlur,
      'is-landscape': isLandscape,
      'is-portrait': isPortrait,
      'is-square': isSquare
    }
  }

  created() {
    this.src = this.placeholderSrc
  }
}
</script>

<style scoped>
</style>
