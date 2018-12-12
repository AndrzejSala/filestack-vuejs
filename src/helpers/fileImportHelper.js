import uuid4 from 'uuid4'

/**
 * Parse formData and create file object 
 * which will be putted to the store
 * @param {FormData} formData - files form data object
 */
function filesImport(formData) {
    const files = formData.getAll('files');
    console.log('###8', files)
    const promises = files.map(async (x) => {
        console.log('###9', x)
        const baseData = await getBase(x)
        console.log('###99', baseData)
        let fileObj = {
            id: uuid4(),
            originalName: x.name,
            originalData: x,
            baseData,
            extension: x.name.split('.')[1],
            size: x.size,
            isSelected: false,
            exif: null,
            uploadInfo: {
                status: 'Not uploaded',
                progress: 0,
                bytesSent: 0,
                lastChunkSize: 0,
                startTime: null,
                endTime: null,
                url: null
            }
        }
        return fileObj
    });
    return Promise.all(promises);
}

/**
 * Read blob and return promise with object
 * containing file encoded in base64 and original data
 * @param {Blob} - Blob of a file
 */
function getBase(file) {
    return new Promise((resolve) => {
        const fReader = new FileReader();
        fReader.onload = () => {
            resolve(fReader.result);
        }
        fReader.readAsDataURL(file);
    })
}

export { filesImport }
