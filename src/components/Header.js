import React, { Component } from 'react';

export default class Header extends Component{
    render(){
        return(
            <header className="app__header">
                <h1 className="app__header-text">NewsApp</h1>
            </header>
        );
    }
}