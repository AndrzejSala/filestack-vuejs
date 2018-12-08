var uuid4 = require('uuid4');

function filesImport(formData) {
    const files = formData.getAll('files');
    const promises = files.map((x) => getFile(x)
        .then(fileData => ({
            id: uuid4(),
            originalName: x.name,
            fileName: x.name,
            fileData,
            extension: x.name.split('.')[1],
            size: x.size,
            isSelected: false,
            uploadInfo: {
                isUploaded: false,
                progress: 0,
                speed: 0
            }
        })));
    return Promise.all(promises);
}

function getFile(file) {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        const img = document.createElement('img');

        fReader.onload = () => {
            img.src = fReader.result;
            resolve(getBase64Image(img));
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
