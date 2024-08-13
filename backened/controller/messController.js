import twilio from 'twilio';
import { config } from 'dotenv';

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC41b7399fff568606e41d017f61b1fc66';
const authToken = process.env.TWILIO_AUTH_TOKEN || '5fb27c512f231ed09c69672e1a558e9b';
const client = twilio(accountSid, authToken);

export const sendMessage = (req, res) => {
    const { body, to } = req.body;

    if (!body || !to) {
        return res.status(400).json({ error: 'Please provide body and recipient number!' });
    }

    client.messages
        .create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${to}`
        })
        .then(message => res.status(200).json({ success: true, sid: message.sid }))
        .catch(error => res.status(500).json({ error: error.message }));
};
