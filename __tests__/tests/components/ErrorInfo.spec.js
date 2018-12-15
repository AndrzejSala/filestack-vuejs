/* global describe it expect beforeEach jest*/
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from './../../../src/store'

import ErrorInfo from './../../../src/components/ErrorInfo.vue'

jest.mock('./../../../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components:', () => {
    describe('ErrorInfo:', () => {
        let storeMocks
        let wrapper
      
        beforeEach(() => {
          storeMocks = createStoreMocks();
          wrapper = shallow(ErrorInfo, {
            store: storeMocks.store,
            localVue,
          })
        })
        it('should get error info from the store', () => {
            expect(storeMocks.getters.error).toBeCalled();
        });
        it('should show nothing in errorWrapper when not set in the store', () => {
            expect(wrapper.find('.errorWrapper')).toBeTruthy()
            expect(wrapper.find('.errorWrapper').text()).toBe('')
        })
        it('should show error info in errorWrapper when set in the store', () => {
            storeMocks = createStoreMocks({ getters: { error: () => 'Filestack app key has not been provided (should be passed from .env)!' } });
            wrapper = shallow(ErrorInfo, {
              store: storeMocks.store,
              localVue,
            })
            expect(wrapper.find('.errorWrapper')).toBeTruthy()
            expect(wrapper.find('.errorWrapper').text()).toBe('Filestack app key has not been provided (should be passed from .env)!')
        })
    })
})
