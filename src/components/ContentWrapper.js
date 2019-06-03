import React from 'react';
import Article from "./Article";

export default class ContentWrapper extends React.Component{
    render(){
        return(
            <div id="news" className="app__main-news">
                {this.props.articles.map((item, index) => {
                    return (
                        <Article title={item.title} source={item.source.name}
                                 text={item.description} link={item.url}
                                 image={item.urlToImage ? item.urlToImage : null}
                                 key={index}
                        >
                        </Article>
                    );
                })}
            </div>
        );
    }
}