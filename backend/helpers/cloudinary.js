const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: "dkpts1qc7",
  api_key: "886866978324453",
  api_secret: 'XT_g_1rmcv5tOSCgt4qIk4HBLtM',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil};