import uuid4 from 'uuid4'

function filesImport(formData) {
    const files = formData.getAll('files');
    const promises = files.map(async function(x) {
        const processedFile = await getFile(x)
        let fileObj = {
            id: uuid4(),
            originalName: x.name,
            originalData: x,
            baseData: processedFile.baseFile,
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
        // if (['jpg', 'jpeg'].includes(fileObj.extension)) {
        //     let exifData = await getExifData(x)
        //     fileObj.exif = exifData
        // }
        return fileObj
    });
    return Promise.all(promises);
}

function getFile(file) {
    return new Promise((resolve) => {
        const fReader = new FileReader();
        const img = document.createElement('img');

        fReader.onload = () => {
            img.src = fReader.result;
            resolve({
                baseFile: getBase64Image(img),
                origFile: img
            });
        }

        fReader.readAsDataURL(file);
    })
}

function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = img.src;
    return dataURL;
}

export { filesImport }
	