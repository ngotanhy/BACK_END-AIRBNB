const express = require('express');
const rootRoute = express.Router();


const routeAuthUser = require('./routeAribnb/routeAuthUser');
const routeRoom = require('./routeAribnb/routeRoom');
const routeUser = require('./routeAribnb/routeUser');
const routerMess = require('./routeSocket/routeMessages');



rootRoute.use("/messages", routerMess);
rootRoute.use("/auth", routeAuthUser)
rootRoute.use("/users",routeUser);
rootRoute.use("/room",routeRoom)

module.exports = rootRoute;