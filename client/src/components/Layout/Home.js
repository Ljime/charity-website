import classes from './Home.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css" 
import Heading1 from '../UI/Heading1'
import Heading2 from '../UI/Heading2'
import woman from '../../images/woman2.png'
import Button from '../UI/Button'
import ButtonSec from '../UI/ButtonSec'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
		<section className={classes.home}>
			<div className={classes.container}>
				<Heading1 className={classes.mainHeading}>
					Help Raise Awareness For Breast Cancer
				</Heading1>
				<Heading2 className={classes.secHeading}>
					Many Women Are In Dire Need Of Support, Donate Now
				</Heading2>
				<div>
					<Link to='/donate'>
						<Button>Donate {">"}</Button>
					</Link>
					<a href="https://www.cancer.ca/en/cancer-information/cancer-type/breast/breast-cancer/?region=on">
						<ButtonSec>Learn More</ButtonSec>
					</a>
				</div>
			</div>
			<div className={classes.imgContainer}>
				<img className={classes.image} alt="Woman" src={woman}></img>
			</div>
		</section>
	)
}

export default Home


