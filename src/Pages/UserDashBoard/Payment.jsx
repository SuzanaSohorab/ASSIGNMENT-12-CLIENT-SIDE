import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51SCfI0RXPyzIxIlwelF049rOV8wFE1MqXG7Z9wPFXAzweA2q5EekTxrNSIHrFKERh3SOspquTOjms5qMaEMMZAnF00S3qiW91o');

const Payment = () => {
    return (
        <Elements stripe={stripePromise}
        
        
        > <h1><PaymentForm></PaymentForm></h1> </Elements>
  
    );
};

export default Payment;