import classes from './Header.module.css'
import { ReactComponent as Ribbon } from "../../images/SVG/aids.svg"
import { ReactComponent as Facebook } from "../../images/SVG/facebook.svg"
import { ReactComponent as Instagram } from "../../images/SVG/instagram.svg"
import { ReactComponent as Twitter } from "../../images/SVG/twitter.svg"
import { ReactComponent as Youtube } from "../../images/SVG/youtube.svg"
import { Link, NavLink } from 'react-router-dom'
import Button from '../UI/Button'

const Header = (props) => {
    return (
        <div className={classes.header}>
            <Link to='/'>
                <div className={classes.container}>
                    <Ribbon className={classes.ribbon} />
                    <h3>Foundation</h3>
                </div>
            </Link>
            <div className={classes.rightContainer}>
                <Facebook />
                <Instagram/>
                <Twitter/>
                <Youtube/>
                <NavLink exact to='/' activeClassName={classes.active}>Home</NavLink>
                <Link to='/donate'>
                    <Button>Donate {'>'}</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header