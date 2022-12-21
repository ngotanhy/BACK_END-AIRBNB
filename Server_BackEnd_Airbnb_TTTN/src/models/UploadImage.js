// require('dotenv').config();
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URL = process.env.REDIRECT_URL;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// const { google } = require("googleapis");
// const fs= require("fs");
// const path= require("path");

// const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// oauth2client.setCredentials(REFRESH_TOKEN);

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2client
// })

// const uploadFile = async () => {
//     try {
//         const createFile= await drive.files.create({
//             requestBody:{
//                 name: 'test.jpg',
//                 mimeType: 'image/jpeg'
//             },
//             media:{
//                mimeType:"image/jpeg",
//                body:fs.createReadStream(path.join(__dirname,"./public/img/architecture.jpg"))
//             }
//         })
//         console.log(createFile.data)
//     } catch (e) {
//         console.log(e)
//     }
//     // const { data } = await google.drive({ version: 'v3' }).files.create({
//     //     media: {
//     //         mimeType: fileObject.mimeType,
//     //         body: bufferStream,
//     //     },
//     //     requestBody: {
//     //         name: fileObject.originalname,
//     //         parents: ['DRIVE_FOLDER_ID'],
//     //     },
//     //     fields: 'id,name',
//     // });
//     // console.log(`Uploaded file ${data.name} ${data.id}`);
// };

// module.exports = {uploadFile};

