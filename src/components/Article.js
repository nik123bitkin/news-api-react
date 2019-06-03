import React from 'react';

export default class Article extends React.Component{
    render(){
        return(
            <div className="news__item">
                <div className="news__picture" style={{backgroundImage:`url(${this.props.image ? this.props.image : 'img/cat-news.jpg'})`}}>

                </div>
                <div className="news__content">
                    <h2 className="news__title">{this.props.title}</h2>
                    <h3 className="news__source">{this.props.source}</h3>
                    <p className="news__text">{this.props.text}</p>
                    <a className="news__link" href={this.props.link}>Read more...</a>
                </div>
            </div>
        );
    }
}