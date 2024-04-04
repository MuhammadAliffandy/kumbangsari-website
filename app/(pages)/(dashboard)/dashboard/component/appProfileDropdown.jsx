import AppCustomDropdown from '../../../../components/appDropDown/appCustomDropDown';
import AppProfileButton from './appProfileButton';

const options = [
    { label: 'Option 1', 
    
        value: {
            image : 'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90',
            name : 'Chaewon',
            countProduct : 2 ,  
        }, 
        
        content: <AppProfileButton
                isItemDropDown ={true}
                image = {'https://awsimages.detik.net.id/community/media/visual/2022/04/07/kim-chae-won_43.png?w=600&q=90'}
                name = {'Chaewon'}
                countProduct = {`${2} Produk`}
            />  },

    { label: 'Option 2', 

        value: {
            image : 'https://www.wowkeren.com/display/images/photo/2024/04/03/00506918.webp',
            name : 'Kazuha',
            countProduct : 3 ,  

        }, content: <AppProfileButton
                        isItemDropDown ={true}
                        image = {'https://www.wowkeren.com/display/images/photo/2024/04/03/00506918.webp'}
                        name = {'Kazuha'}
                        countProduct = {`${3} Produk`}
                    /> },

    
  ];

const customDropdownHandle = ({ state }) => {
    return (
            <AppProfileButton
                image = {'https://www.wowkeren.com/display/images/photo/2024/04/03/00506918.webp'}
                name = {'Kazuha'}
                countProduct = {`${3} Produk`}
            />
    );
};


  const customItemRenderer = ({ item, itemIndex, props, state, methods }) => {
    return (
      <div key={itemIndex} {...props} className='bg-red-400' >
        {item.content}
      </div>
    );
  };


const AppProfileDropdown = () => {
    return(
        <AppCustomDropdown
            options={options}
            dropdownHandle ={customDropdownHandle}
            itemRenderer = {customItemRenderer}
            style={{
                backgroundColor : 'transparent',
                width: '100%',
                border: "0px solid transparent",
                padding:'0px',
                margin: '0px'
            }}
            onChange= {value => {
                console.log(value)
            }}
        />)
}

export default AppProfileDropdown;