const Reservation = require("../models/Reservation");
const {body,validationResult} = require("express-validator");

const makeReservation = async (req, res) => {
  try {
    [
    body("reservedBy").notEmpty().withMessage("Debe haber una nombre para esta reservacion").isString().withMessage("Nombre no valido"),
    body("date").notEmpty().withMessage("Debe venir una fecha").isDate().withMessage("Formato de fecha no valido").custom((value)=>{
     const today = new Date();
     today.setHours(0,0,0,0);
     const dateIncome = new Date(value);
     if (dateIncome < today)
     {
      throw new Error("La fecha no valida");
     }
     return true;
    }),
    body("hourStart").notEmpty().withMessage("Debe haber una hora de inicio").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Formato de hora inválido (HH:mm)'),
    body("hourEnd").notEmpty().withMessage("Debe haber una hora de Fin").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Formato de hora inválido (HH:mm)'),
      ]
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
        return res.status(400).json({errors:errors.array()});
      }
    const { reservedBy, date, hourStart, hourEnd } = req.body;
    const roomReserved = req.params.idRoom;

    const reservation = Reservation.build({
      reservedBy,
      roomReserved,
      date,
      hourStart,
      hourEnd,
    });
    await reservation.save();
    res.status(201).json(`Muchas gracias por la reservacion, su numero de reservacion es ${reservation.id}`);
  } catch (error) {
    res.status(500).json({
      error: "Ha habido un error al crear la reservación",
      details: error.message
    });
  }
};

const viewReservation = async(req,res)=>{
  try {
    const {reservationId} = req.params;

    if (!reservationId){   res.json("El numero de solicitud es necesario, favor ingresarlo");  }

    const reservation = await Reservation.findOne({
      where: {id: reservationId},
      attributes:["id","reservedBy","roomReserved","date","hourStart","hourEnd"]
      });

    if (!reservation) { res.json("No se encontre esta reservacion");}

    res.json({reservation});

  } catch (error) {
       res.status(500).json({ error:"Ha ocurrido un erro al ver la reservacion",details:error.message}); 
  }
};

const viewAllReservation = async (req,res)=>{
  try 
  {
    const allReservations = await Reservation.findAll({
      attributes:["id","reservedBy","roomReserved","date","hourStart","hourEnd"]
    });

    if (allReservations.length===0){ res.json("No hay reservaciones vigentes");}

    return res.json({allReservations});

  }catch(error){
    return res.status(500).json({error:"Se detecto un error al buscar las reservacion",details:error.message});
  }
}

const roomReserved = async(req,res)=>{
      try {
        const {thisRoom} = req.params;
        const occupied = {};
        const roomInfo= await Reservation.findAll({
          where: {roomReserved:thisRoom},
          attributes:["date","hourStart","hourEnd"],
          order:[["date","ASC"],["hourStart","ASC"]],
          raw:true
        });
        
        if (roomInfo.length === 0){ return res.json(occupied); }
        roomInfo.forEach(i => {
          if (!occupied[i.date])
          {
              occupied[i.date]=[];
         }
              occupied[i.date].push({hourStart:i.hourStart,hourEnd:i.hourEnd});

        });

        return res.json(occupied);

      } catch (error) {
          return res.status(500).json({error:"Error de servidor",details:error.message});        
      }
};

module.exports = {
makeReservation,
viewReservation,
viewAllReservation,
roomReserved
};