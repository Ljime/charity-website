import classes from './Form.module.css'
import Button from "../UI/Button"
import Heading1 from "../UI/Heading1"
import Input from "./Input"
import {Transition} from "react-transition-group"
import useInput from '../../hooks/useInput'
import validator from "validator"
import { useEffect, useRef, useState } from 'react'
import ButtonDisabled from '../UI/ButtonDisabled'
import Select from './Select'
const FormPersonal = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)

    const {
        value: fNameValue,
        error: fNameError,
        errorMessage: fNameErrorM,
        touched: fNameTouched,
        onChangeHandler: fNameOnChange,
        onBlurHandler: fNameOnBlur,
    } = useInput('Empty Name', (value) => !validator.isEmpty(value.trim()))
    
    const {
        value: lNameValue,
        error: lNameError,
        errorMessage: lNameErrorM,
        touched: lNameTouched,
        onChangeHandler: lNameOnChange,
        onBlurHandler: lNameOnBlur,
    } = useInput('Empty Name', (value) => !validator.isEmpty(value.trim()))
    
    const {
        value: emailValue,
        error: emailError,
        errorMessage: emailErrorM,
        touched: emailTouched,
        onChangeHandler: emailOnChange,
        onBlurHandler: emailOnBlur,
    } = useInput('Email Is Invalid', (value) => validator.isEmail(value))

    const {
        value: addressValue,
        error: addressError,
        errorMessage: addressErrorM,
        touched: addressTouched,
        onChangeHandler: addressOnChange,
        onBlurHandler: addressOnBlur,
    } = useInput('Address Is Empty', (value) => !validator.isEmpty(value.trim()))

    const {
        value: unitValue,
        error: unitError,
        errorMessage: unitErrorM,
        touched: unitTouched,
        onChangeHandler: unitOnChange,
        onBlurHandler: unitOnBlur,
    } = useInput('Unit # Is Empty', (value) => !validator.isEmpty(value.trim()))

    const {
        value: cityValue,
        error: cityError,
        errorMessage: cityErrorM,
        touched: cityTouched,
        onChangeHandler: cityOnChange,
        onBlurHandler: cityOnBlur,
    } = useInput('City Is Empty', (value) => !validator.isEmpty(value.trim()))

    const provinceRef = useRef('')
    const {
        value: pCodeValue,
        error: pCodeError,
        errorMessage: pCodeErrorM,
        touched: pCodeTouched,
        onChangeHandler: pCodeOnChange,
        onBlurHandler: pCodeOnBlur,
    } = useInput('Invalid Code', (value) => !validator.isEmpty(value.trim()))

    useEffect(() => {
        const formHasError = (
            cityError ||
            unitError ||
            fNameError ||
            lNameError ||
            pCodeError ||
            emailError ||
            addressError
        )

        const formIsFilled =
            !!(cityValue &&
            unitValue &&
            emailValue &&
            fNameValue &&
            lNameValue &&
            pCodeValue &&
            addressValue)

        if(!formHasError && formIsFilled) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }

    }, [
        cityError,
        unitError,
        fNameError,
        lNameError,
        pCodeError,
        emailError,
        addressError,
        cityValue,
        unitValue,
        emailValue,
        fNameValue,
        lNameValue,
        pCodeValue,
        addressValue,
    ])

    const onSubmitHandler = () => {
        props.incrementCount()
        props.updateInfo({
            FirstName: fNameValue,
            LastName: lNameValue,
            Email: emailValue,
            Address: addressValue,
            Unit: unitValue,
            City: cityValue,
            Province: provinceRef.current.value,
            PostalCode: pCodeValue
        })
    }

    return (
        <Transition
            in={props.in}
            unmountOnExit
            mountOnEnter={false}
            timeout={200}
        >
            {(state) => {
               return (
                    <div
                        className={`${classes.formContainer}
                    ${state === "exiting" && classes.exiting}
                    ${state === "entering" && classes.entering}
                        `}
                >
                    <Heading1 className={classes.title}>Personal Info</Heading1>
                    <div className={classes.container}>
                        <Input
                            value={fNameValue}
                            onBlur={fNameOnBlur}
                            onChange={fNameOnChange}
                            error={fNameError}
                            errorMessage={fNameErrorM}
                            touched={fNameTouched}
                            name="First Name"
                        ></Input>
                        <Input
                            value={lNameValue}
                            onBlur={lNameOnBlur}
                            onChange={lNameOnChange}
                            error={lNameError}
                            errorMessage={lNameErrorM}
                            touched={lNameTouched}
                            name="Last Name"
                        ></Input>
                    </div>
                    <div className={classes.container}>
                        <Input
                            value={emailValue}
                            onBlur={emailOnBlur}
                            onChange={emailOnChange}
                            error={emailError}
                            errorMessage={emailErrorM}
                            touched={emailTouched}
                            name="Email"
                        ></Input>
                    </div>
                    <div className={classes.container}>
                        <Input
                            value={addressValue}
                            onBlur={addressOnBlur}
                            onChange={addressOnChange}
                            error={addressError}
                            errorMessage={addressErrorM}
                            touched={addressTouched}
                            name="Address"
                        ></Input>
                        <Input
                            value={unitValue}
                            onBlur={unitOnBlur}
                            onChange={unitOnChange}
                            error={unitError}
                            errorMessage={unitErrorM}
                            touched={unitTouched}
                            className={classes.shrinkSmall}
                            mask='9999'
                            alwaysShowMask={false}
                            name="Unit #"
                        ></Input>
                    </div>
                    <div className={classes.container}>
                        <Input
                            value={cityValue}
                            onBlur={cityOnBlur}
                            onChange={cityOnChange}
                            error={cityError}
                            errorMessage={cityErrorM}
                            touched={cityTouched}
                            name="City"
                        ></Input>
                        <Select className={classes.shrink}
                            ref={provinceRef}
                            data={['AB', 'BC','MB','NB','NL','NT','NS','NU','ON','PE','QC','SK','YT']}
                            name="Province"></Select>
                        <Input
                            value={pCodeValue}
                            onBlur={pCodeOnBlur}
                            onChange={pCodeOnChange}
                            error={pCodeError}
                            errorMessage={pCodeErrorM}
                            touched={pCodeTouched}
                            className={classes.shrink}
                            name="Postal Code"
                            mask='a9a 9a9'
                        ></Input>
                    </div>
                    <div className={classes.rightContainer}>
                        {formIsValid ? (
                            <Button onClick={onSubmitHandler}>Next {">"}</Button>
                        ) : (
                            <ButtonDisabled>Next {">"}</ButtonDisabled>
                        )}
                    </div>
                </div>
            )
        }}
        </Transition>
    )
}

export default FormPersonal