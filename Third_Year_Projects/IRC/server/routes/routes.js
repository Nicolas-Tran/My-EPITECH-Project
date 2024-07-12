// const http = require('http');
// const pages = require('./pages');
// const url = require('url');
// const querystring = require('querystring');
// const fs = require('fs');

// const routes = {
//   '/': pages.home,
//   '/about': pages.about,
//   '/contact': pages.contact,
//   '/form': pages.form,
//   '/index': pages.index
// };

// http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url);
//   if(req.method === "POST"){
//       let body = "";
//       req.on("data", chunk => {
//           body += chunk.toString();
//       });
//       req.on("end", () => {
//           const params = querystring.parse(body);
//           const name = params.name;
//           res.writeHead(200, {'Content-Type': 'text/html'});
//           fs.readFile('index.html', 'utf8', (err, data) => {
//             if (err) {
//               console.log(err);
//               res.end();
//             } else {
//               const html = data.replace('$NAME', name);
//               res.write(html);
//               res.end();
//             }
//           });
//       });
//   }
//   else if (routes[parsedUrl.pathname]) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     routes[parsedUrl.pathname](req, res);
//   } else {
//     res.writeHead(404, {'Content-Type': 'text/plain'});
//     res.end('404 error: Page not found.');
//   }
// }).listen(3000);

// exports.form = (req, res) => {
//     fs.readFile('form.html', 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//         res.end();
//       } else {
//         res.write(data);
//         res.end();
//       }
//     });
//   }

//   exports.index = (req, res) => {
//     if(req.method === "POST"){
//         let body = "";
//         req.on("data", chunk => {
//             body += chunk.toString();
//         });
//         req.on("end", () => {
//             const params = querystring.parse(body);
//             const name = params.name;
//             fs.readFile('index.html', 'utf8', (err, data) => {
//               if (err) {
//                 console.log(err);
//                 res.end();
//               } else {
//                 const html = data.replace('$NAME', name);
//                 res.write(html);
//                 res.end();
//               }
//             });
//         });
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('404 error: Invalid request method.');
//     }
// }  
// console.log('Server listening on port 3000');