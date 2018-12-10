import * as filestack from "filestack-js";
const client = filestack.init(process.env.VUE_APP_FILESTACK_API_KEY);

/**
 * Upload provided file to the filestack
 * @param {String} file - base64 string encoded file
 * @param {Function} onProgress - function called on progress event
 * @param {Function} onSuccess - function called on success event
 * @param {Function} onError - function called on error event
 */
async function uploadFile(file, onProgress, onSuccess, onError) {
    try {
        const res = await client.upload(
            file.baseData,
            { onProgress },
            { filename: file.fileName }
        );
        onSuccess(res);
    } catch (err) {
        onError(err);
    }
}

export default {
    uploadFile
}
