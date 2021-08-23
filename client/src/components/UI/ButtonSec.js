import classes from "./ButtonSec.module.css"

const ButtonSec = (props) => {
	return <button className={`${classes.button} ${props.className}`} onClick={props.onClick}>{props.children}</button>
}

export default ButtonSec
