const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");
const ReservationController = require("../controllers/ReservationController");
router.get("/rooms",RoomController.viewAll);
router.get("/thisRoom/:thisRoom",ReservationController.roomReserved);


router.post("/reservation/:idRoom",ReservationController.makeReservation);

//Rutas admin
router.post("/newRoom",RoomController.newRoom);

//Rutas operador
router.get("/reservations",ReservationController.viewAllReservation);
router.get("/thisReservation/:reservationId",ReservationController.viewReservation);

module.exports = router;