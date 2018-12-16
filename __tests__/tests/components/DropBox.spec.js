/* global describe it expect beforeEach jest*/
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from './../../../src/store'
import DropBox from './../../../src/components/DropBox.vue'

jest.mock('./../../../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components:', () => {
    describe('DropBox:', () => {
        let storeMocks
        let wrapper
      
        beforeEach(() => {
          storeMocks = createStoreMocks();
          wrapper = shallow(DropBox, {
            store: storeMocks.store,
            localVue,
          })
        })
        it('should invoke filesChange method on change input', () => {
            const filesChangeMock = jest.fn()
            wrapper.vm.filesChange = filesChangeMock
            wrapper.update()
        
            expect(filesChangeMock).not.toBeCalled();
            wrapper.find('.input-file').trigger('change')
            expect(filesChangeMock).toBeCalled();
        });
    })
})
