import { shallowMount } from '@vue/test-utils'
import LazyPicture from '@/components/LazyPicture.vue'

describe('LazyPicture.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(LazyPicture, {
      propsData: {
        placeholderSrc:
          'https://c2.staticflickr.com/8/7019/6748869373_160471ded5_m.jpg',
        srcset:
          'https://c2.staticflickr.com/8/7019/6748869373_160471ded5_b.jpg 1x, https://c2.staticflickr.com/8/7019/6748869373_f7d856f99c_o.jpg 2x',
        sizes: '1024px',
        alt: 'image for testing'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
