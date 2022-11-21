const express = require('express');
const rootRoute = express.Router();


const routeAuthUser = require('./routeAriBnb/routeAuthUser');
const routeBookingRoom = require('./routeAriBnb/routeBookingRoom');
const routeComment = require('./routeAriBnb/routeComment');
const routeLocations = require('./routeAriBnb/routeLocation');
const routeRoom = require('./routeAriBnb/routeRoom');
const routeUser = require('./routeAriBnb/routeUser');
const routerMess = require('./routeSocket/routeMessages');



rootRoute.use("/messages", routerMess);
rootRoute.use("/auth", routeAuthUser)
rootRoute.use("/users",routeUser);
rootRoute.use("/room",routeRoom)
rootRoute.use("/bookingRoom",routeBookingRoom);
routeUser.use("/comment",routeComment)
rootRoute.use("/location",routeLocations)

module.exports = rootRoute;