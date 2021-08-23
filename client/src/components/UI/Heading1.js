import classes from "./Heading1.module.css"

const Heading1 = (props) => {
	return <h1 className={`${classes.heading1} ${props.className}`}>{props.children}</h1>
}

export default Heading1
