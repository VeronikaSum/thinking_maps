// import { Injectable, PipeTransform } from '@nestjs/common';
// import * as path from 'path';
// import * as sharp from 'sharp';
// import * as fs from 'fs';

// @Injectable()
// export class SharpPipe implements PipeTransform<Array<Express.Multer.File>, string[]> {

//     // transform(images: Array<Express.Multer.File>): string[] {
//     //     // sharp.cache(false);
//     //     const paths: string[] = [];
//     //     for (var i = 0; i < images.length; i++) {
//     //         console.log(images[i])
//     //         const filename = Date.now() + '-' + images[i].originalname + '.png';

//     //         const format = images[i].mimetype === 'image/jpeg' ? 'jpeg' : 'png'

//     //         console.log(format)

//     //         const path = './resources/images/' + filename;


//     //         sharp(images[i].buffer)
//     //             .resize(100)
//     //             .toFile(path, (err, info) => {
//     //                 console.log('info', info)
//     //                 if (err === null) {
//     //                     fs.unlink(path, (err2) => {
//     //                         if (err2) throw err2;
//     //                         console.log('successfully compressed and deleted ' + path);
//     //                     })
//     //                 }
//     //             }).then(data => {
//     //                 console.log("data: ", data);
//     //             }).catch(err => {
//     //                 console.log("err: ", err);
//     //             })
//     //         // .then(res => paths.push(path))
//     //         paths.push(path)
//     //     }

//     //     console.log(paths)
//     //     return paths;

//     // }
// }