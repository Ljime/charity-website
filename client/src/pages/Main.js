import classes from './Main.module.css'
import Home from "../components/Layout/Home"
import PieGraph from '../components/Graphs/PieGraph'
import Heading1 from '../components/UI/Heading1'
import Heading2 from '../components/UI/Heading2'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'

const Main = () => {
    return (
        <>
            <Home></Home>
            <div className={classes.wrapper}>
                <section className={classes.info}>
                    <div className={classes.chartContainer}>
                        <PieGraph></PieGraph>
                    </div>
                    <div className={classes.textContainer}>
                        <Heading1 className={classes.heading}>
                            12.1% Of Women Have Cancer
                        </Heading1>
                        <Heading2 className={classes.text}>
                            According to the official cancer website, that's an estimated
                            429,550,000 women who have encountered breast cancer in their lives
                        </Heading2>
                        <Link to='/donate'>
                            <Button>Donate {">"}</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Main