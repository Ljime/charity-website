import classes from './Modal.module.css'
import { Transition } from 'react-transition-group'
import Heading1 from '../UI/Heading1'
import ReactDOM from 'react-dom'

const ModalBox = (props) => {
    return <Transition in={props.in} timeout={200} mountOnEnter unmountOnExit>
        {state => 
            <div className={`${classes.modal} ${state === 'exiting' && classes.modalExiting}`}>
                <Heading1>{props.title}</Heading1>
                <p>{props.desc}</p>
                <div>{props.children}</div>
            </div>
        }
    </Transition>
}

const Backdrop = (props) => {
    return <Transition in={props.in} timeout={200} mountOnEnter unmountOnExit>
        {state => 
            <div className={`${classes.backdrop} ${state === 'exiting' && classes.backdropExiting}`}>
            </div>
        }
    </Transition>
}

const Modal = (props) => {
    return (
            <>
                {ReactDOM.createPortal(
                    <ModalBox
                        in={props.in}
                        title={props.title}
                        desc={props.desc}
                    >{props.children}</ModalBox>,
                    document.getElementById("overlays")
                )}
                {ReactDOM.createPortal(<Backdrop in={props.in} />
                , document.getElementById('overlays'))}
            </>
        )
}

export default Modal