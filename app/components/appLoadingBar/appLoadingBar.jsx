import LoadingBar from 'react-top-loading-bar'

const AppLoadingBar = (props) => {
    return(
        <LoadingBar 
            color={ props.color ? props.color : '#F45B69'} 
            progress={props.progress} 
            onLoaderFinished={
                props.onLoaderFinished
        } />
    )
}

export default AppLoadingBar;