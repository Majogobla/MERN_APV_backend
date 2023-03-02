import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) =>
{
    const transporte = nodemailer.createTransport(
        {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: 
            {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

    const { email, nombre, token } = datos;

    // Enviar Email
    const info = await transporte.sendMail(
        {
            from: "APV - Administrador de Pacientes de Veterinaria",
            to: email,
            subject: "Reestablece tu Contraseña",
            text: "Reestablece tu Contraseña",
            html: `<p>Hola ${nombre}, has solicitado resstablecer tu password.</p>
                
                <p>Sigue el siguiente enlace para generar un nuevo password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Resstablecer Contraseña</a></p>

                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            `,
        }
    );

    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailOlvidePassword;