import React,{ Component } from "react";
import Loader from './../components/simpleloader'
import './../../styles/style_sheet.css'

class LoadingView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Loader loading={true} background="no-fill"/>
            </div> 
        )
    }
}

export default LoadingView
