import React from 'react'
import Select from 'react-select'


const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const DropdownIndicator = props => {
  return null;
};

const customComponents = {
  DropdownIndicator: DropdownIndicator,
};

const  AppMultiSelection = (props) =>  {
  return (
    <Select
      components={customComponents}
      closeMenuOnSelect={false}
      defaultValue={ props.defaultValue || [colourOptions[0], colourOptions[1]]}
      isMulti
      isSearchable={false}
      options={ props.options || colourOptions}
      menuIsOpen={false}
      classNamePrefix={'border-[1px]'}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: '2px solid #4062BB',
          '&:hover': {
            borderColor: '#4062BB', 
          },
          borderRadius: '20px' ,
          backgroundColor: 'transparent',
          padding: '10px',
          color:'#4062BB'

        }),
        multiValue: (styles, ) => {
          return {
            ...styles,
            backgroundColor: 'transparent',
            border: "2px solid #4062BB",
            padding : '4px 8px',
            borderRadius: '15px'
          };
        },
        multiValueLabel: (styles, ) => ({
          ...styles,
          color: '#4062BB',
        }),
        multiValueRemove: (styles, ) => ({
          ...styles,
          color: '#4062BB',
          ':hover': {
            backgroundColor: 'rgba(220,220,220,0.20)',
            borderRadius : '10px',
            color: '#4062BB',
          },
        }),
      }}
    />
  );
}
export default AppMultiSelection;