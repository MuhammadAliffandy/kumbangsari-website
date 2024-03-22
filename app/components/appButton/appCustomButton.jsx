
const AppCustomButton = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={` ${props.className} font-poppins `}>
            {props.children}
        </button>
    ) 
}

export default AppCustomButton;