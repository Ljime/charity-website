import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const PUBLIC_STRIPE_KEY =
	"pk_test_51JQEWDBXBNrU1eQLAgQVh3IYwXqltTI6lUuw7DLX1PtowHPrv5v3lYmCZ114s9zaawlVJUSS32dzR42vyeNJtgW40028E6byHH"

const stripeTestPromise = loadStripe(PUBLIC_STRIPE_KEY)

ReactDOM.render(
  <Elements stripe={stripeTestPromise}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Elements>,
  document.getElementById('root')
);

