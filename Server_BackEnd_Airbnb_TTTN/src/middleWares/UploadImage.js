// SET STORAGE
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })
module.exports = upload;

// const INPUT_path_to_your_images = `${process.cwd()}/public/image_compress/${req.file.filename}`;
// const OUTPUT_path = './public/img/';
// await compress_images(INPUT_path_to_your_images, OUTPUT_path,
//     { compress_force: false, statistic: true, autoupdate: true },
//     false,
//     { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
//     { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
//     { svg: { engine: 'svgo', command: '--multipass' } },
//     { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
//     function (error, completed, statistic) {
//         if (completed) {
//             fs.unlinkSync(statistic.input);
//             let file=statistic.output_path_new;
//             uploadSingle(file);
//             res.send(process.cwd() + '/' + req.file.path);
//         }
//     }
// );



