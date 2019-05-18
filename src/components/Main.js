import React, { Component } from 'react';
import '../assets/cat-news.jpg';

export default class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
          sources: [],
          page: 1,
          lastUrl: "",
          newsDisplayed: 0,
          buttonHide: false,
          errorHide: true
        };

        this.loadMoreClick = this.loadMoreClick.bind(this);
        this.sourceClick = this.sourceClick.bind(this);
        this.filterClick = this.filterClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    loadSources(component){
        const url = 'https://newsapi.org/v2/sources?apiKey=5878ce9411164b5398895920c506a413';
        const request = new Request(url);
        fetch(request)
          .then(function(response) { return response.json(); })
          .then(function(data) {
            component.setState({ sources: data.sources })
          });
    }

    createNewsItem(token, data){
        token.querySelector('.news__picture').style.backgroundImage = `url(${data.urlToImage ? data.urlToImage : 'img/cat-news.jpg'})`;
        token.querySelector('.news__title').textContent = data.title;
        token.querySelector('.news__source').textContent = data.source.name;
        token.querySelector('.news__text').textContent = data.description;
        token.querySelector('.news__link').setAttribute('href', data.url);
        return token;
    }
      
    createBlock(newsCount, data, component){
        const place = document.createDocumentFragment();
        const news_item = document.querySelector('#news-item-tpl');
        for (let i = 0; i < newsCount; i++) {
          const item = (news_item.content) ? news_item.content.cloneNode(true).querySelector('.news__item') 
            : news_item.querySelector('.news__item').cloneNode(true);
          const child = component.createNewsItem(item, data[i]);
          place.appendChild(child);
        }
        return place;
    }

    loadBy(urlPart){     
        let component = this;
        component.setState({errorHide: true});
        const url = 'https://newsapi.org/v2/' + urlPart + 'apiKey=5878ce9411164b5398895920c506a413';
        const request = new Request(url);
        fetch(request)
          .then(function(response) { return response.json(); })
          .then(function(data) {  
            const newsBlock = document.querySelector('#news');
            newsBlock.innerHTML = '';
            const newsCount = data.articles.length;
            if(newsCount == 0){
                component.setState({errorHide: false});
                component.setState({buttonHide: true});
                return;
            }      
            const block = component.createBlock(newsCount, data.articles, component);
            newsBlock.appendChild(block);
            component.setState({ buttonHide: newsCount < 5, lastUrl: url, page: 2, newsDisplayed: newsCount });
          });
    }

    loadMoreClick(){
        let component = this;
        let url = component.state.lastUrl.replace(new RegExp('page=.*&'), 'page=' + component.state.page + '&');
        component.setState({lastUrl: url});
        const request = new Request(url);
        fetch(request)
          .then(function(response) { return response.json(); })
          .then(function(data) {
            const newsCount = data.articles.length;
            if(newsCount == 0){
                component.setState({buttonHide: true});
                return;
            }     
            const block = component.createBlock(newsCount, data.articles, component);
            const newsBlock = document.querySelector('#news');
            newsBlock.appendChild(block);
            component.setState({ page: component.state.page + 1, newsDisplayed: component.state.newsDisplayed + newsCount });
            if(newsCount < 5 || component.state.newsDisplayed == 40){
                component.setState({buttonHide: true});
            }
          });
    }

    sourceClick(){
        this.loadBy(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
    }

    filterClick(){
        const query = document.querySelector('#search-field').value;
        if(query.length > 0){
            this.loadBy(`everything?q=${query}&pageSize=5&page=1&`);
        }
    }

    handleKeyUp(){
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#filter-btn').click();
        }
    }

    componentWillMount(){
        this.loadSources(this);
        this.loadBy('top-headlines?country=ru&pageSize=5&page=1&');
    }

    render(){
        let button;
        if (!this.state.buttonHide){
            button = <button className="app__btn btn__load" id="load-btn" onClick={this.loadMoreClick}>Load more</button>
        }
        let errorMsg;
        if (!this.state.errorHide){
            errorMsg = <h3 className="app__main-error" id="error-block">There are no articles matching your request</h3>
        }
        return(
            <main className="app__main">
                <div id="sources" className="app__main-sources">
                {this.state.sources.map((source, i) => {
                    return (
                        <button className="app__btn btn__sources" key={i} id={source.id} onClick={this.sourceClick}>{source.name}</button>
                    );
                })}
                </div>
                <div className="app__main-search">
                    <input className="app__main-search-field" type="search" maxLength="40" placeholder="Enter query" 
                    id="search-field" onKeyUp={this.handleKeyUp}/>
                    <button className="app__btn btn__filter" id="filter-btn" onClick={this.filterClick}>Filter</button>
                </div>
            <div id="news" className="app__main-news"></div>
            {errorMsg}
            {button}
            </main>
        );
    }
}