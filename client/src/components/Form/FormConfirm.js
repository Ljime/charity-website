import classes from "./Form.module.css"
import Button from "../UI/Button"
import Heading1 from "../UI/Heading1"
import { Transition } from "react-transition-group"

const FormConfirm = (props) => {

	return (
		<Transition in={props.in} mountOnEnter={false} unmountOnExit timeout={200}>
			{(state) => (
				<div
					className={`${classes.formContainer}
                     ${state === "exiting" && classes.exiting}
                     ${state === "entering" && classes.entering}
                        `}
				>
					<Heading1 className={classes.title}>Confirm Donation</Heading1>
					{Object.keys(props.data).map((key) => {
						return (
							<h1 key={key} className={classes.lead}>
								{key} - {props.data[key]}
							</h1>
						)
					})}
					<div className={classes.splitContainer}>
						<Button onClick={props.decrementCount}>{"<"} Back</Button>
						<Button onClick={props.onSubmitHandler}>Submit</Button>
					</div>
				</div>
			)}
		</Transition>
	)
}

export default FormConfirm
