import twilio from 'twilio';
import { config } from 'dotenv';

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC41b7399fff568606e41d017f61b1fc66';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'f26f0ee53652da56c416e5d3399afb63';
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
