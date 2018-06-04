import 'intersection-observer'
import { shallowMount, Wrapper } from '@vue/test-utils'
import LazyPicture from '@/components/LazyPicture.vue'

describe('LazyPicture.vue', () => {
  let wrapper: Wrapper<LazyPicture>

  beforeEach(() => {
    wrapper = shallowMount(LazyPicture, {
      propsData: {
        observer: new IntersectionObserver(() => undefined),
        placeholderSrc:
          'https://c2.staticflickr.com/8/7019/6748869373_160471ded5_m.jpg',
        srcset:
          'https://c2.staticflickr.com/8/7019/6748869373_160471ded5_b.jpg 1x, https://c2.staticflickr.com/8/7019/6748869373_f7d856f99c_o.jpg 2x',
        sizes: '1024px',
        alt: 'image for testing'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('as default', () => {
    it('emits a ready event', () => {
      expect(wrapper.emitted('ready')[0]).toEqual([
        wrapper.vm.$el,
        (wrapper.vm as any)['preloadImage']
      ])
    })

    it('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('as loaded', () => {
    it('matches snapshot', () => {
      wrapper.setData({ isLoaded: true })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
