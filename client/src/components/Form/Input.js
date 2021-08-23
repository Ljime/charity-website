import { Transition } from "react-transition-group"
import classes from "./Input.module.css"
import InputMask from 'react-input-mask'
const Input = (props) => {
    return (
            <div className={`${classes.container} ${props.className}`}>
                <label className={`${classes.label}`} htmlFor={props.name}>
                    {props.name}
                </label>
                <InputMask
                    className={`${classes.input} ${
                        props.error && props.touched  && classes.inputError
                    }`}
                    type={props.type || "text"}
                    id={props.name}
                    inputMode={props.inputMode}
                    placeholder={props.name}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    value={props.value}
                    mask={props.mask}
                    alwaysShowMask={props.alwaysShowMask}
                ></InputMask>
                <Transition
                    in={props.error && props.touched}
                    mountOnEnter
                    unmountOnExit
                    timeout={200}
                >
                    {(state) => (
                        <>
                            <p
                                className={`${classes.error} ${
                                    state === "exiting" && classes.exiting
                                }`}
                            >
                                {props.errorMessage}
                            </p>
                        </>
                    )}
                </Transition>
            </div>
        )
    }
    
export default Input
    