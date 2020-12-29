import { mount, createLocalVue } from '@vue/test-utils';
import Account from '../src/views/Account.vue';
import Search from '../src/views/Search.vue';

describe('Account', () => {
  it('should disable the left button when leftmost', async () => {
    const localVue = createLocalVue();
    const propsData = { token: { jwtToken: '' } };
    const wrapper = mount(Account, { localVue, propsData });
    const button = wrapper.find('#navigation-button-left');
    await wrapper.setData({ crawls: [], index: null });
    expect(button.element.disabled).toBe(true);
    await wrapper.setData({ crawls: [0], index: 0 });
    expect(button.element.disabled).toBe(true);
    await wrapper.setData({ crawls: [0, 1], index: 0 });
    expect(button.element.disabled).toBe(true);
    await wrapper.setData({ crawls: [0, 1], index: 1 });
    expect(button.element.disabled).toBe(false);
  });

  it('should disable the right button when rightmost', async () => {
    const localVue = createLocalVue();
    const propsData = { token: { jwtToken: '' } };
    const wrapper = mount(Account, { localVue, propsData });
    const button = wrapper.find('#navigation-button-right');
    await wrapper.setData({ crawls: [], index: null });
    expect(button.element.disabled).toBe(true);
    await wrapper.setData({ crawls: [0], index: 0 });
    expect(button.element.disabled).toBe(true);
    await wrapper.setData({ crawls: [0, 1], index: 0 });
    expect(button.element.disabled).toBe(false);
    await wrapper.setData({ crawls: [0, 1], index: 1 });
    expect(button.element.disabled).toBe(true);
  });

  it('should trigger a graphql mutation when a search is made', async () => {
    const localVue = createLocalVue();
    const propsData = {
      token: { jwtToken: '' },
    };
    const mocks = {
      $apollo: {
        mutate: jest.fn(async () => {
          return { data: { crawl: { id: 3 } } };
        }),
      },
    };
    const wrapper = mount(Account, { localVue, propsData, mocks });
    wrapper.setData({ crawls: [1, 2], index: 0 });
    await wrapper.findComponent(Search).trigger('submit');
    expect(mocks.$apollo.mutate).toHaveBeenCalled();
    expect(wrapper.vm.$data.index).toBe(2);
    expect(wrapper.vm.$data.crawls).toStrictEqual([1, 2, 3]);
  });
});