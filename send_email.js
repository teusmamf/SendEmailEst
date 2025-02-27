const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware para processar JSON
app.use(cors());

app.get("/", (req, res) => {
  return res.json('A API ESTÁ RODANDO');
});

app.post('/send_email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'martinsmateus382@gmail.com',
        pass: 'ktzoguattjmlvgut', // Certifique-se de usar uma senha de aplicativo
      },
    });

    const mailOptions = {
      from: 'martinsmateus382@gmail.com',
      to: 'martinsmateus382@gmail.com',
      subject: 'Novo contato do formulário',
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para ${mailOptions.to}: ${info.response}`);

    return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
});

app.listen(9001, () => {
  console.log('Servidor rodando na porta 9001');
});
