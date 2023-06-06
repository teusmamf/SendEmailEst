const http = require('http');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar o CORS
app.get("/", (req,res)=>  {
  return res.json('A API ESTA RODANDO')
})

// Habilitar o CORS
app.use(cors());

app.post('/send_email', (req, res) => {
  handleSendEmail(req, res);
  
});

app.listen(9001, () => {
  console.log('Servidor rodando na porta 9001');
});

async function handleSendEmail(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const requestData = JSON.parse(body);
      console.log(body);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'login',
          user: 'martinsmateus382@gmail.com',
          pass: 'ktzoguattjmlvgut',
        },
      });

      const mailOptions = {
        from: 'martinsmateus382@gmail.com',
        to: 'contato@jmestacionamentos.com.br',
        subject: 'Novo contato do formulário',
        text: `Nome: ${requestData.name}\nEmail: ${requestData.email}\nAssunto: ${requestData.subject}\nDescrição: ${requestData.description}`,
      };
      console.log(mailOptions.text);
      const info = await transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para ${mailOptions.to}: ${info.response}`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);

      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Erro ao enviar o e-mail');
    }
  });
}