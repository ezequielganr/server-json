const fs = require('fs');

let res = fs.readFileSync('./config/db.json');
let r = JSON.parse(res);

function find(email) {
    return r[email];
}

module.exports = {
    find: find
}
