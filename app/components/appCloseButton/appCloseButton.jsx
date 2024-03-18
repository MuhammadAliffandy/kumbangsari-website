import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const AppCloseButton = (props) => {
    return (
        <button type='button' onClick={props.onClick} className='bg-transparent cursor-pointer'><FontAwesomeIcon icon={faClose} color='black' /></button>
    )
}

export default AppCloseButton;