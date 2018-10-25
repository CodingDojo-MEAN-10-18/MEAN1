const color = require('colors');

/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body, etc), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 params
*                 protocol
*                 route
*                 path
*                 query
*/



module.exports = function (request, response, next) {
  const keys = ['method', 'hostname', 'ip', 'body', 'params', 'path', 'protocol', 'route', 'query'];

  // console.log(request.hostname);

  // if (request.method) {
  //   console.log(request.method);
  // }

  keys.forEach(key => {
    const data = request[key];

    if (data) {
      if (typeof data === 'object') {
        if (Object.keys(data).length) {
          console.log(color.magenta(`The request ${key} object has these properties: `));


          for (const [k, value] of Object.entries(data)) {
            console.log(color.gray(`\t${k} => ${value}`));
          }
        }
      } else {
        console.log(color.blue(`The request ${key} is ${data}`));
      }
    }
  });

  next();
}
