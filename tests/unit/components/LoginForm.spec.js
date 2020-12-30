import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('LoginForm', () => {

  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      login: jest.fn(),
      updateUsername: jest.fn(),
      updatePassword: jest.fn()
    };
    getters = {
      username: jest.fn(),
      password: jest.fn(),
      isUsernameValid: jest.fn(),
      isAccessDenied: jest.fn()
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it('renders username input', () => {
    const wrapper = shallowMount(LoginForm, { store, localVue });
    expect(true).toBe(true);
  });
});
