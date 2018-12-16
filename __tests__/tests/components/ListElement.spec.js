/* global describe it expect beforeEach jest*/
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { __createMocks as createStoreMocks } from './../../../src/store'
import ListElement from './../../../src/components/ListElement.vue'

jest.mock('./../../../src/store')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('components:', () => {
    describe('ListElement:', () => {
        let storeMocks
        let wrapper
        let item = {
            'id': 'cd9bfece-44da-4880-84d3-a4b5567b0df0',
            'originalName': 'aaa.txt',
            'originalData': {},
            'baseData': 'data:text/plain;base64,YWFhCg==',
            'extension': 'txt',
            'size': 100000,
            'isSelected': false,
            'exif': null,
            'uploadInfo': {
                'status': 'Not uploaded',
                'progress': 0,
                'bytesSent': 0,
                'lastChunkSize': 0,
                'startTime': null,
                'endTime': null,
                'url': null
            }
        }

        beforeEach(() => {
            storeMocks = createStoreMocks();
            wrapper = shallow(ListElement, {
                store: storeMocks.store,
                propsData: { item },
                localVue,
            })
        })
        it('should display correct information when file is imported', () => {
            expect(wrapper.find('.title').text()).toBe('aaa.txt')
            expect(wrapper.find('.extension').text()).toBe('txt')
            expect(wrapper.find('.size').text()).toBe('100000 Bytes')
            expect(wrapper.find('.status').text()).toBe('Not uploaded')
            expect(wrapper.find('.filestackUrl').text()).toBe('')
            expect(wrapper.find('.progressWrapper .value').text()).toBe('0%')
            expect(wrapper.find('.avgSpeedWrapper .value').text()).toBe('N/A')
            expect(wrapper.find('.currSpeedWrapper .value').text()).toBe('N/A')
        })
        it('should display correct information when file is uploading', () => {
            item = {
                'id': 'cd9bfece-44da-4880-84d3-a4b5567b0df0',
                'originalName': 'aaa.txt',
                'originalData': {},
                'baseData': 'data:text/plain;base64,YWFhCg==',
                'extension': 'txt',
                'size': 100000,
                'isSelected': false,
                'exif': null,
                'uploadInfo': {
                    'status': 'Uploading',
                    'progress': 44,
                    'bytesSent': 65400,
                    'lastChunkSize': 34200,
                    'startTime': (parseInt(new Date().getTime() / 1000, 10) - 2),
                    'endTime': null,
                    'url': null
                }
            }
            storeMocks = createStoreMocks();
            wrapper = shallow(ListElement, {
                store: storeMocks.store,
                propsData: { item },
                localVue,
            })
            expect(wrapper.find('.title').text()).toBe('aaa.txt')
            expect(wrapper.find('.extension').text()).toBe('txt')
            expect(wrapper.find('.size').text()).toBe('100000 Bytes')
            expect(wrapper.find('.status').text()).toBe('Uploading')
            expect(wrapper.find('.filestackUrl').text()).toBe('')
            expect(wrapper.find('.progressWrapper .value').text()).toBe('44%')
            expect(wrapper.find('.avgSpeedWrapper .value').text()).toBe('22KB/s')
            expect(wrapper.find('.currSpeedWrapper .value').text()).toBe('34KB/s')
        })
        it('should display correct information when file is uploaded', () => {
            item = {
                'id': 'cd9bfece-44da-4880-84d3-a4b5567b0df0',
                'originalName': 'aaa.txt',
                'originalData': {},
                'baseData': 'data:text/plain;base64,YWFhCg==',
                'extension': 'txt',
                'size': 100000,
                'isSelected': false,
                'exif': null,
                'uploadInfo': {
                    'status': 'Uploaded',
                    'progress': 100,
                    'bytesSent': 100000,
                    'lastChunkSize': 12200,
                    'startTime': (parseInt(new Date().getTime() / 1000, 10) - 7),
                    'endTime': (parseInt(new Date().getTime() / 1000, 10) - 2),
                    'url': 'https://cdn.filestackcontent.com/C2nbLvsBSQuF9sKNOE8H'
                }
            }
            storeMocks = createStoreMocks();
            wrapper = shallow(ListElement, {
                store: storeMocks.store,
                propsData: { item },
                localVue,
            })
            expect(wrapper.find('.title').text()).toBe('aaa.txt')
            expect(wrapper.find('.extension').text()).toBe('txt')
            expect(wrapper.find('.size').text()).toBe('100000 Bytes')
            expect(wrapper.find('.status').text()).toBe('Uploaded')
            expect(wrapper.find('.filestackUrl').text()).toBe('https://cdn.filestackcontent.com/C2nbLvsBSQuF9sKNOE8H')
            expect(wrapper.find('.progressWrapper .value').text()).toBe('100%')
            expect(wrapper.find('.avgSpeedWrapper .value').text()).toBe('20KB/s')
            expect(wrapper.find('.currSpeedWrapper .value').text()).toBe('0KB/s')
        })
    })
})
