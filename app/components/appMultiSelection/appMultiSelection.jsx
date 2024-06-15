'use client'

import React from 'react'
import CreatableSelect from 'react-select/creatable';


const colourOptions = [
];

const DropdownIndicator = props => {
  return null;
};

const customComponents = {
  DropdownIndicator: DropdownIndicator,
};

const  AppMultiSelection = (props) =>  {

  return (
    <CreatableSelect
      components={customComponents}
      closeMenuOnSelect={false}
      value={ props.value}
      isMulti
      options={[]}
      onChange={(value) => { 
        props.onChange(value) 
      }}
      classNamePrefix={'border-[1px]'}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: '1px solid #7591D2',
          '&:hover': {
            borderColor: '#7591D2', 
          },
          borderRadius: '20px' ,
          backgroundColor: 'transparent',
          padding: '10px',
          color:'black'

        }),
        multiValue: (styles, ) => {
          return {
            ...styles,
            backgroundColor: 'transparent',
            border: "2px solid black",
            padding : '4px 8px',
            borderRadius: '15px'
          };
        },
        multiValueLabel: (styles, ) => ({
          ...styles,
          color: 'black',
        }),
        multiValueRemove: (styles, ) => ({
          ...styles,
          color: 'black',
          ':hover': {
            backgroundColor: 'rgba(220,220,220,0.20)',
            borderRadius : '10px',
            color: 'black',
          },
        }),
      }}
    />
  );
}
export default AppMultiSelection;


