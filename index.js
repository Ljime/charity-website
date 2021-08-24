require('dotenv').config()
const stripePrivateKey =
	"sk_test_51JQEWDBXBNrU1eQLIFso90NODhW1nkMTlL8DhcttmIFSkPYHOqVttj7kMphJHPAHWtANL77J9AwvHp13qrW0FWN500Yg00h9UP"
// process.env.SECRET_STRIPE_KEY

const express = require('express')
const stripe = require('stripe')(stripePrivateKey)
const cors = require('cors')
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

app.post('/payment', cors(), async (req, res) => {
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
            success: false,
            error
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
