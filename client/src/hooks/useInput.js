import { useState } from "react"

const useInput = (errorMessage, validate) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [touched, setTouched] = useState(null)

    const onBlurHandler = () => {
        setTouched(true)
    }

    const onChangeHandler = (event) => {
        const input = event.target.value
        if(!validate(input)) { // did not pass validation
            setError(() => errorMessage)
        } else { // passed
            setError(() => false) 
        }
        setValue(() => input)
    }

    return {
        value,
        error,
        touched,
        errorMessage,
        onBlurHandler,
        onChangeHandler
    }
}

export default useInput