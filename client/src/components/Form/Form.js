import { useState } from 'react'
import Card from '../UI/Card'
import Heading1 from '../UI/Heading1'
import classes from './Form.module.css'
import FormPayment from './FormPayment'
import FormPersonal from "./FormPersonal"
import {useElements} from '@stripe/react-stripe-js'

const initialData = {
    FirstName: '',
    LastName: '',
    Email: '',
    Address: '',
    Unit: '',
    City: '',
    Province: '',
    PostalCode: '',
    Currency: '',
    Amount: '',
    Card: '',
}

const Form = () => {

    const [count, setCount] = useState(1)
    const [data, setData] = useState(initialData)
    const elements = useElements()

    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1)
    }

    const decrementCount = () => {
        setCount((prevCount) => prevCount - 1)
    }

    const updateInfo = (data, card) => {
        setData((prevData) => {
            return {
                ...prevData,
                ...data
            }
        })
    }

    return (
        <Card className={classes.form}>
            <Heading1 className={classes.step}>Step {count} of 2</Heading1>
            <FormPersonal in={count === 1}  updateInfo={updateInfo} incrementCount={incrementCount} />
            <FormPayment elements={elements} in={count === 2} updateInfo={updateInfo} decrementCount={decrementCount} />
        </Card>
    )
}

export default Form