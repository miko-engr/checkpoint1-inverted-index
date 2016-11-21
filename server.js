const connect = require('connect');
const serve = require('serve-static');

const port = process.env.PORT || 3000;

connect().use(serve('./')).listen(port);
