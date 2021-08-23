import classes from "./ButtonDisabled.module.css"

const ButtonDisabled = (props) => {
	return <button className={classes.button} {...props}></button>
}

export default ButtonDisabled
