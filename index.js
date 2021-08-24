require('dotenv').config()
const stripePrivateKey = process.env.SECRET_STRIPE_KEY

const express = require('express')
const stripe = require('stripe')(stripePrivateKey)

const app = express()

app.use(express.json())

app.post('/payment', async (req, res) => {
    const {amount, id, currency} = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            description: 'Donation For Breast Cancer',
            payment_method: id,
            confirm: true
        })

        res.json({
            message: 'Payment Succeeded',
            success: true
        })
    } catch (error) {
        console.log('Error', error);
        res.json({
            message: 'Payment Failed',
            success: false
        })
    }
})

if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

const port = process.env.PORT || 5000

app.listen(port, () => 
    console.log('Server is listening on port ' + port)
)
