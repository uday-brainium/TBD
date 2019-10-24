import React,{ Component } from "react";

import LoaderStyle from '../../styles/loader.css'

class LoadingSpinnerView extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            loaderStyle: {
                'display': 'none'
            }
        }
    }

    componentWillReceiveProps(){
        // console.log(this.props.showing);
        if(this.props.showing){
            this.setState({
                loaderStyle: {
                    'display': 'block'
                }
            })
        }
        else{
            this.setState({
                loaderStyle: {
                    'display': 'none'
                }
            })
        }
    }

    render(){
        return(
            <div className="loaderView" style={this.state.loaderStyle}>
                <div className="spinner"></div>
            </div>
        )
    }
}

export default LoadingSpinnerView
