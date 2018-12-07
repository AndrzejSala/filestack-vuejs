var uuid4 = require('uuid4');

function upload(formData) {
    const files = formData.getAll('files');
    const promises = files.map((x) => getImage(x)
        .then(img => ({
            id: uuid4(),
            originalName: x.name,
            fileName: x.name,
            url: img,
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

function getImage(file) {
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

export { upload }

