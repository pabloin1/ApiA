import { Router } from "express";
import nodemailer from "nodemailer"; // Cambia esta línea

const routes = Router();

// Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
  // Configura tu proveedor de correo y autenticación aquí
  service: "Gmail",
  auth: {
    user: "pablocesaraltuzar04@gmail.com",
    pass: "efprtqvtotarceao",
  },
});

// Ruta para enviar el correo electrónico
routes.post("/enviarCorreo", (req, res) => {
  // Cambia 'app' por 'routes'
  const { destinatario, horaFecha, pelicula } = req.body;

  // Detalles del correo electrónico
  const mailOptions = {
    from: "pablocesaraltuzar04@gmail.com",
    to: destinatario,
    subject: "Cita para ver una pelicula",
    text: `
    Has aceptado la invitacion para ver una pelicula 
    Película: ${pelicula}
    Fecha: ${horaFecha}
    Con cariño,
    Pablo
`,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
      res.status(500).json({ message: "Error al enviar el correo" });
    } else {
      console.log("Correo enviado:", info.response);
      res.json({ message: "Correo enviado correctamente" });
    }
  });
});

export default routes;
