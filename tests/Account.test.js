import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import clone from 'clone';
import * as options from '../src/store';
import Account from '../src/views/account/Account.vue';
import Search from '../src/views/account/Search.vue';

describe('Account', () => {
  it('should disable the left button when leftmost', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(clone(options));
    store.commit('setToken', { token: '' });
    const wrapper = mount(Account, { localVue, store });
    const button = wrapper.find('.left');
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
    localVue.use(Vuex);
    const store = new Vuex.Store(clone(options));
    store.commit('setToken', { token: '' });
    const wrapper = mount(Account, { localVue, store });
    const button = wrapper.find('.right');
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
    localVue.use(Vuex);
    const store = new Vuex.Store(clone(options));
    store.commit('setToken', { token: '' });
    const mutate = jest.fn(async () => ({ data: { crawl: { id: 3 } } }));
    const mocks = { $apollo: { mutate } };
    const wrapper = mount(Account, { localVue, store, mocks });
    wrapper.setData({ crawls: [1, 2], index: 0 });
    await wrapper.findComponent(Search).trigger('submit');
    expect(mutate).toHaveBeenCalled();
    expect(wrapper.vm.index).toBe(2);
    expect(wrapper.vm.crawls).toStrictEqual([1, 2, 3]);
  });
});
