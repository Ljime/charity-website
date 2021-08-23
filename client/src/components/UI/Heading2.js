import classes from "./Heading2.module.css"

const Heading2 = (props) => {
	return <h1 className={`${classes.heading2} ${props.className}`}>{props.children}</h1>
}

export default Heading2
