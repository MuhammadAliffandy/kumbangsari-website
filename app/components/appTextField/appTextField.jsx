import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const AppTextField = (props) => {

    const [visiblePass,setVisiblePass] = useState(false);

    return <TextField
            className={ props.className ? props.className : 'w-[100%]' }
            id={props.id}
            value = {props.value}
            type = { props.type != 'password' ? props.type : visiblePass ?  'text' : "password"  }
            placeholder={props.placeholder}
            InputProps={
                props.InputProps ? props.InputProps : 
                {
                    style: {
                        borderRadius: "15px",
                        backgroundColor: '#F7F9F9'
                    },
                    endAdornment: props.disabled ? null :  props.type == 'password' ? <InputAdornment className='cursor-pointer' onClick={()=>{ setVisiblePass(!visiblePass) }} position="end"><FontAwesomeIcon icon={faEye} /></InputAdornment> : null
                }
                
            }
            { ...props.validationConfig }
            error = {props.error}
            helperText={props.helperText}
            onChange={props.onChange}
            onClick={props.onClick}
            disabled={props.disabled}
            required={props.required}
            autoComplete='on'
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7591D2',
                    borderWidth:'2px'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#7591D2', 
                }
            }}

        />
}

export default AppTextField;