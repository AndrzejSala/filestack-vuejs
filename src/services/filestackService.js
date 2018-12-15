import * as filestack from "filestack-js";

/**
 * Upload provided file to the filestack
 * @param {String} apiKey - filestack api key
 * @param {String} file - base64 string encoded file
 * @param {Function} onProgress - function called on progress event
 * @param {Function} onSuccess - function called on success event
 * @param {Function} onError - function called on error event
 */
async function uploadFile(apiKey, file, onProgress, onSuccess, onError) {
    const client = filestack.init(apiKey);
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
