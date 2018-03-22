const fs   = require('fs');
const path = require('path');

/**
 *  @description Get a locally stored key and return as string
 */
module.exports = function(key_name) {
  let pwd = process.env.PWD || '.';
  let src = path.join(pwd,'/api/config/'+key_name+'.key');
  let key = fs.readFileSync(src);
  key = Buffer.from(key).toString('base64');
  return key;
}
