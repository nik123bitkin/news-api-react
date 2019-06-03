import React from 'react';

export default class ErrorBlock extends React.Component{
    render(){
        return(
            this.props.visible ?
                <h3 className="app__main-error" id="error-block">There are no articles matching your request</h3> : null
        );
    }
}