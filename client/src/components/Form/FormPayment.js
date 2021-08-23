import classes from "./Form.module.css"
import Button from "../UI/Button"
import Heading1 from "../UI/Heading1"
import Input from "./Input"
import { Transition } from "react-transition-group"
import useInput from "../../hooks/useInput"
import validator from "validator"
import { useState, useEffect, useRef } from "react"
import ButtonDisabled from "../UI/ButtonDisabled"
import Select from "./Select"
import { CardElement, useStripe } from "@stripe/react-stripe-js"
import Modal from "../Layout/Modal"
import axios from 'axios'
import ButtonSec from "../UI/ButtonSec"
import Spinner from "../UI/Spinner"
import { Link } from "react-router-dom"

const CARD_OPTIONS = {
	iconStyle: "solid",
	hidePostalCode: true,
	classes: {
	},
	style: {
		base: {
			iconColor: "#fe019a",
			color: "#f1a6d3",
			backgroundColor: 'transparent',
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
		},
		invalid: {
			iconColor: "red",
			color: "red",
		},
	},
}

const FormPayment = (props) => {
	const [formIsValid, setFormIsValid] = useState(false)
	const [enterModal, setEnterModal] = useState(false)
	const [currency, setCurrency] = useState('CAD')
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const stripe = useStripe()
	const currencyRef = useRef('')

	const {
		value: amountValue,
		error: amountError,
		errorMessage: amountErrorM,
		touched: amountTouched,
		onChangeHandler: amountOnChange,
		onBlurHandler: amountOnBlur,
    } = useInput('Enter A Valid Amount', (value) => validator.isNumeric(value.trim()))
	
	const {
		value: cardNameValue,
		error: cardNameError,
		errorMessage: cardNameErrorM,
		touched: cardNameTouched,
		onChangeHandler: cardNameOnChange,
		onBlurHandler: cardNameOnBlur,
	} = useInput("Empty Name", (value) => !validator.isEmpty(value.trim()))

    useEffect(() => {
		const formHasError = (
			amountError ||
			cardNameError
			)

		const formIsFilled =
		!!(amountValue &&
			cardNameValue)
		
		if(!formHasError && formIsFilled) {
			setFormIsValid(true)
		} else {
			setFormIsValid(false)
		}
				
		}, [
			amountError,
			cardNameError,
			amountValue,
			cardNameValue,
		])
			
	const onSubmitHandler = () => {
		setCurrency(currencyRef.current.value)
		setEnterModal(true)
    }

	const backHandler = () => {
		props.decrementCount()
		exitHandler()
	}
	
	const exitHandler = () => {
		setEnterModal(false)
	}
	
	const confirmHandler = async () => {
		setLoading(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: props.elements.getElement(CardElement)
        })
        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post('/payment', {
                    amount: amountValue,
                    id,
					currency
                })
    
                if(response.data.success) {
                    setSuccess(true)
                } else {
					setError(true)
				}
            } catch (error) {
                setError(true)
            }
        } else {
			setError(true)
		}
		setLoading(false)
	}


	return (
		<Transition in={props.in} mountOnEnter={false} unmountOnExit timeout={200}>
			{(state) => (
				<div
					className={`${classes.formContainer}
                     ${state === "exiting" && classes.exiting}
                     ${state === "entering" && classes.entering}
                        `}
				>
					<Heading1 className={classes.title}>Payment Info</Heading1>
					<div className={classes.container}>
						<Select
							className={classes.shrinkSmall}
							ref={currencyRef}
							name="Currency"
							data={["CAD", "USD", "GBP"]}
						></Select>
						<Input
							value={amountValue}
							onBlur={amountOnBlur}
							onChange={amountOnChange}
							error={amountError}
							errorMessage={amountErrorM}
							touched={amountTouched}
							name="Amount"
						></Input>
					</div>
					<div className={classes.container}>
						<Input
							value={cardNameValue}
							onBlur={cardNameOnBlur}
							onChange={cardNameOnChange}
							error={cardNameError}
							errorMessage={cardNameErrorM}
							touched={cardNameTouched}
							name="Card Holder Name"
						></Input>
					</div>
					<div className={classes.cardContainer}>
						<CardElement options={CARD_OPTIONS}></CardElement>
					</div>
					<div className={classes.splitContainer}>
						<Button onClick={backHandler}>{"<"} Back</Button>
						{formIsValid ? (
							<Button onClick={onSubmitHandler}>Next {">"}</Button>
						) : (
							<ButtonDisabled>Confirm</ButtonDisabled>
						)}
					</div>
					<Modal
						in={enterModal}
						title={success ? "Donation Successful!" : "Confirm Payment"}
						desc={
							success
								? `Thank you! for your donation of ${formIsValid && currency}: ${
										formIsValid && amountValue
								  }`
								: `Are you sure you want to donate ${formIsValid && currency}: ${
										formIsValid && amountValue
								  }?`
						}
					>
						{loading && <Spinner />}
						{!loading && !success && (
							<div className={classes.buttonContainer}>
								<Button onClick={confirmHandler}>Yes</Button>
								<ButtonSec onClick={exitHandler}>No</ButtonSec>
							</div>
						)}
						{success && (
							<Link to='/'>
								<Button>OK</Button>
							</Link>
						)}
						{error && <p className={classes.error}>Error: Invalid Credit Card Information</p>}
					</Modal>
				</div>
			)}
		</Transition>
	)
}

export default FormPayment
