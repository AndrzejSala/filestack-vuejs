/*global describe it expect*/
// import {filesImport} from '../../src/helpers/fileImportHelper'
import {filesImport} from './../../src/helpers/fileImportHelper'
// const filesImport = require('./../../src/helpers/fileImportHelper').filesImport;
describe('fileImportHelper:', () => {
    describe('filesImport method:', () => {
        it('', () => {
            var file = new File(["foo"], "foo.txt", {
                type: "text/plain",
            });
            var file2 = new File(["foo"], "foo.txt", {
                type: "text/plain",
            });
            const formData = new FormData();
            formData.append('files', file, 'Landscape_3.jpg');
            formData.append('files', file2, 'Landscape_4.jpg');
            console.log('###7', formData.getAll('files'))
            const result = filesImport(formData);
            expect(result).toBe('')
        })
    })
})
