
const AppCustomButton = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} className={` ${props.className} font-poppins `}>
            {props.children}
        </button>
    ) 
}

export default AppCustomButton;