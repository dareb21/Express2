const Room = require("../models/Room");
const Reservation = require("../models/Reservation");
const newRoom = async (req, res) => {
  try {
    const { description, capacity } = req.body; 
    if (!description|| !capacity) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const room = await Room.create(req.body);
    res.status(201).json({ message: "Sala creada con éxito", room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha habido un error al crear la sala", details: error.message });
  }
};


const viewAll = async (req,res) =>{
    try {
            const rooms = await Room.findAll();
    if (rooms.length ===0)
    {
         return res.json({ message: "No hay habitaciones creadas" });
    }
    res.json({rooms});
    } catch (error) {
       res.status(500).json({ error:"Ha ocurrido un erro al ver las salas",details:error.message}); 
    }
}

const viewAvailable = (req,res)=>{
  
}
module.exports = {
  newRoom,
  viewAll
};
