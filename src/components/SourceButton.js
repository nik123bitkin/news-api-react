import React from 'react';
import Button from './Button';

export default class SourceButton extends React.Component{
    render(){
        return(
            <Button class="app__btn btn__sources" clickHandler={this.props.clickHandler} id={this.props.id}>
                {this.props.children}
            </Button>
        );
    }
}