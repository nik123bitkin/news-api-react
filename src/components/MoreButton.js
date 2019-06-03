import React from 'react';
import Button from './Button';

export default class MoreButton extends React.Component{
    render(){
        return(
            this.props.visible ?
            <Button  class="app__btn btn__load" clickHandler={this.props.clickHandler} id="load-btn">
                Load more
            </Button> : null
        );
    }
}