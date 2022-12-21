const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {
    uploadSingle: (file) => {
        cloudinary.uploader.upload(file, {
            public_id: "test",
            folder: "test"
        },
            function (error, result) { console.log(result); });
    },
    uploadMultiple: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                folder: 'home'
            })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(result.public_id, 200, 200),
                            main: self.reSizeImage(result.public_id, 500, 500),
                            thumb2: self.reSizeImage(result.public_id, 300, 300)
                        })
                    }
                })
        })
    },
    
    deletedImage: (url) => {
        cloudinary.uploader.destroy(url, function (error, result) { console.log(result); });
    },

    reSizeImage: (id, h, w) => {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            format: 'jpg'
        })
    },

}