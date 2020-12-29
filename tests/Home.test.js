import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import clone from 'clone';
import flushPromises from 'flush-promises';
import options from '../src/store/options';
import Home from '../src/views/Home.vue';
import Login from '../src/views/Login.vue';
import Signup from '../src/views/Signup.vue';

jest.mock('../src/aws/cognito', () => ({
  async logIn() {
    return { idToken: { jwtToken: '' } };
  },
  async signUp() {
    return null;
  },
}));

describe('Home', () => {
  it('should switch to log in when button is clicked', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuelidate);
    const store = new Vuex.Store(clone(options));
    const wrapper = mount(Home, { localVue, store });
    const button = wrapper.find('input[type="button"]');
    await button.trigger('click');
    expect(wrapper.findComponent(Login).exists()).toBe(false);
    expect(button.attributes('value')).toEqual('Log In');
    await button.trigger('click');
    expect(wrapper.findComponent(Login).exists()).toBe(true);
  });

  it('should switch to sign up when button is clicked', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuelidate);
    const store = new Vuex.Store(clone(options));
    const wrapper = mount(Home, { localVue, store });
    const button = wrapper.find('input[type="button"]');
    expect(wrapper.findComponent(Signup).exists()).toBe(false);
    expect(button.attributes('value')).toEqual('Sign Up');
    await button.trigger('click');
    expect(wrapper.findComponent(Signup).exists()).toBe(true);
  });

  it('should switch to log in on sign up success', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuelidate);
    const store = new Vuex.Store(clone(options));
    const wrapper = mount(Home, { localVue, store });
    // navigate to sign up
    const button = wrapper.find('input[type="button"]');
    await button.trigger('click');
    // fill out sign up form
    await wrapper.find('input[name="email"]').setValue('user@gmail.com');
    await wrapper.find('input[name="username"]').setValue('username');
    await wrapper.find('input[name="password"]').setValue('password');
    // submit
    const submit = wrapper.find('input[type="submit"]');
    await submit.trigger('submit');
    await flushPromises();
    const message = 'A verification email has been sent.';
    expect(wrapper.text()).toContain(message);
    expect(wrapper.findComponent(Login).exists()).toBe(true);
  });

  it('should route to account on log in success ', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuelidate);
    const store = new Vuex.Store(clone(options));
    const push = jest.fn();
    const mocks = { $router: { push } };
    const wrapper = mount(Home, { localVue, store, mocks });
    // fill out log in form
    await wrapper.find('input[name="username"]').setValue('username');
    await wrapper.find('input[name="password"]').setValue('password');
    // submit
    const submit = wrapper.find('input[type="submit"]');
    await submit.trigger('submit');
    await flushPromises();
    expect(push).toHaveBeenCalledWith({ name: 'Account' });
  });
});
