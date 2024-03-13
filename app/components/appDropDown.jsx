import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AppDropDown = (props) => {
    return(
        <>
            <Select
                    sx= {
                        {
                            borderRadius: "15px",
                            backgroundColor: '#F7F9F9',
                            width:"100%"
                        }
                    }
                    value={props.value}
                    displayEmpty
                    onChange={props.onChange}
                    inputProps={{ 
                        'aria-label': 'Without label'  ,
                    }}
                >
                    <MenuItem disabled value="">
                        {props.placeholder}
                    </MenuItem>
                    {
                        props.listItem.map(data =>{
                            return( <MenuItem value={data.value}>{data.text}</MenuItem> )
                        })
                    }
            </Select>
        </>
    ) 
}

export default AppDropDown;