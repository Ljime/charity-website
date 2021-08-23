import classes from './DonateButton.module.css'
import { ReactComponent as Heart } from "../../images/SVG/heart.svg"

const DonateButton = (props) => {
    return (
        <div className={classes.heartContainer}>
            <h1 className={classes.text}>Donate</h1>
            <Heart className={classes.outerHeart}></Heart>
        </div>
    )
}

export default DonateButton
