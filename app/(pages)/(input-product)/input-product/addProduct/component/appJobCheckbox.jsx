import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox';

const AppJobCheckbox = (props) => {
    let data = [];

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete.toLowerCase());
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleChange = (value ,label)=>{
        value === '' ? data = arrPop( data ,label) : data.push(value)

        props.onChange(data)

        return data;
    }

    return (
        <>
            <Stack direction={'row'} spacing={1}>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Tdk Bekerja'
                        value = 'tidakkerja'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Kesehatan'
                        value = 'kesehatan'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pelajar/Mhs'
                        value = 'pelajar'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Karyawan'
                        value = 'karyawan'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Hiburan'
                        value = 'hiburan'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Teknis'
                        value = 'teknis'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pendidikan'
                        value = 'pendidikan'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Lainnya'
                        value = 'lainnya'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
            </Stack>
        </>
    )
}

export default AppJobCheckbox;