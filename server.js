'use strict';

let connect = require("connect");
let serve = require("serve-static");
let port = process.env.PORT || 3000;

connect().use(serve("./")).listen(port);