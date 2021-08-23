import classes from './Input.module.css'
import { Transition } from 'react-transition-group'
import { forwardRef } from 'react'
const Select = forwardRef((props, ref) => {
    return (
        <div className={`${classes.container} ${props.className}`}>
            <label className={`${classes.label}`} htmlFor={props.name}>
                {props.name}
            </label>
            <select
                id={props.name}
                name={props.name}
                ref={ref}
                className={`${classes.input} ${classes.select}`}
            >
                {props.data.map((item) => {
                    if(item === props.defaultValue) {
                        return <option selected key={item} value={item}>{item}</option>
                    } 
                    return <option key={item} value={item}>{item}</option>
                })}
            </select>
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
})

export default Select

