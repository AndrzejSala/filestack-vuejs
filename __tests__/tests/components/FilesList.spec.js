/* global describe it expect beforeEach jest*/
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from './../../../src/store'
import FilesList from './../../../src/components/FilesList.vue'
import ListElement from './../../../src/components/ListElement.vue'

jest.mock('./../../../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components:', () => {
    describe('FilesList:', () => {
        let storeMocks
        let wrapper
        beforeEach(() => {
            storeMocks = createStoreMocks();
            wrapper = shallow(FilesList, {
                store: storeMocks.store,
                localVue,
            })
        })
        it('should display empty list when files arr is empty', () => {
            expect(wrapper.find(ListElement).exists()).toBeFalsy()
        })
        it('should display empty list when files arr is empty', () => {
            storeMocks = createStoreMocks({ getters: { files: () => [{
                "id": "a0b61e71-407d-459b-a93a-cb8d8cb25b93",
                "originalName": "aaa.txt",
                "originalData": {},
                "baseData": "data:text/plain;base64,YWFhCg==",
                "extension": "txt",
                "size": 4,
                "isSelected": false,
                "exif": null,
                "uploadInfo": {
                    "status": "Not uploaded",
                    "progress": 0,
                    "bytesSent": 0,
                    "lastChunkSize": 0,
                    "startTime": null,
                    "endTime": null,
                    "url": null
                }
            }, {
                "id": "d887a566-7e49-4cc7-a63c-8ac9445ca775",
                "originalName": "aaa2.txt",
                "originalData": {},
                "baseData": "data:text/plain;base64,YWFhCg==",
                "extension": "txt",
                "size": 4,
                "isSelected": false,
                "exif": null,
                "uploadInfo": {
                    "status": "Not uploaded",
                    "progress": 0,
                    "bytesSent": 0,
                    "lastChunkSize": 0,
                    "startTime": null,
                    "endTime": null,
                    "url": null
                }
            }] } })
            wrapper = shallow(FilesList, {
                store: storeMocks.store,
                localVue,
            })
            expect(wrapper.findAll(ListElement).length).toBe(2)
        })
    })
})
