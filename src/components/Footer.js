import React, { Component } from 'react';

export default class Footer extends Component{
    render(){
        return(
            <footer className="app__footer">
                <p className="app__footer-text">Powered by  
                    <a className="app__footer-link" href="https://newsapi.org/"> NewsApi</a>
                </p>
            </footer>
        );
    }
}