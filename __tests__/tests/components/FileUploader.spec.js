/* global describe it expect beforeEach jest*/
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from './../../../src/store'

import FileUploader from './../../../src/components/FileUploader.vue'
import DropBox from './../../../src/components/DropBox.vue'
import FilesList from './../../../src/components/FilesList.vue'
import ErrorInfo from './../../../src/components/ErrorInfo.vue'

jest.mock('./../../../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components:', () => {
    describe('FileUploader:', () => {
        let storeMocks
        let wrapper

        beforeEach(() => {
            storeMocks = createStoreMocks();
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
        })
        it('should get current status from the store', () => {
            expect(storeMocks.getters.currentStatus).toBeCalled();
        });
        it('should show DropBox when status is initial', () => {
            storeMocks = createStoreMocks({ getters: { currentStatus: () => 0 } });
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.find(DropBox).exists()).toBeTruthy()
            expect(wrapper.find(FilesList).exists()).toBeFalsy()
            expect(wrapper.find(ErrorInfo).exists()).toBeFalsy()
        })
        it('should show FilesList when status is import', () => {
            storeMocks = createStoreMocks({ getters: { currentStatus: () => 1 } });
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.find(DropBox).exists()).toBeFalsy()
            expect(wrapper.find(FilesList).exists()).toBeTruthy()
            expect(wrapper.find(ErrorInfo).exists()).toBeFalsy()
        })
        it('should show FilesList when status is upload', () => {
            storeMocks = createStoreMocks({ getters: { currentStatus: () => 2 } });
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.find(DropBox).exists()).toBeFalsy()
            expect(wrapper.find(FilesList).exists()).toBeTruthy()
            expect(wrapper.find(ErrorInfo).exists()).toBeFalsy()
        })
        it('should show FilesList when status is success', () => {
            storeMocks = createStoreMocks({ getters: { currentStatus: () => 3 } });
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.find(DropBox).exists()).toBeFalsy()
            expect(wrapper.find(FilesList).exists()).toBeTruthy()
            expect(wrapper.find(ErrorInfo).exists()).toBeFalsy()
        })
        it('should show ErrorInfo when status is error', () => {
            storeMocks = createStoreMocks({ getters: { currentStatus: () => 4 } });
            wrapper = shallow(FileUploader, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.find(DropBox).exists()).toBeFalsy()
            expect(wrapper.find(FilesList).exists()).toBeFalsy()
            expect(wrapper.find(ErrorInfo).exists()).toBeTruthy()
        })
    })
})
