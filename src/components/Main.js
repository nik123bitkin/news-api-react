import React, {Component} from 'react';
import '../assets/cat-news.jpg';
import SourcesBar from './SourcesBar';
import MoreButton from './MoreButton';
import ErrorBlock from "./ErrorBlock";
import SearchBar from "./SearchBar";
import APIManager from "./APIManager";
import ContentWrapper from "./ContentWrapper";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            articles: [],
            content: [],
            query: "top-headlines?country=ru",
            newsDisplayed: 0,
        };

        this.PAGE_CAPACITY = APIManager.PAGE_CAPACITY;
        this.CHUNK_SIZE = APIManager.CHUNK_SIZE;

        this.loadMoreClick = this.loadMoreClick.bind(this);
        this.sourceClick = this.sourceClick.bind(this);
        this.filterClick = this.filterClick.bind(this);
    }

    loadMoreClick() {
        this.setState({
            content: this.state.content.concat(this.state.articles.slice(this.state.newsDisplayed,
                this.state.newsDisplayed + this.CHUNK_SIZE)),
            newsDisplayed: this.state.newsDisplayed + this.CHUNK_SIZE,
        });
    }

    sourceClick(event) {
        this.setState({query: `everything?sources=${event.target.id}`}, () =>{
            this.performRequest();
        });
    }

    filterClick() {
        const newQuery = document.querySelector('#search-field').value;
        if (newQuery.length > 0) {
            this.setState({query: `everything?q=${newQuery}`}, () =>{
                this.performRequest();
            });
        }
    }

    componentDidMount() {
        APIManager.loadSources().then(data => {
            this.setState({
                sources: data.sources
            });
        });
        this.performRequest();
    }

    performRequest(){
        APIManager.loadRequest(this.state.query).then(data => {
            this.setState({newsDisplayed: 0});
            if(data.articles.length) {
                this.setState({
                    articles: data.articles,
                    content: data.articles.slice(this.state.newsDisplayed, this.state.newsDisplayed + this.CHUNK_SIZE),
                    newsDisplayed: this.state.newsDisplayed + this.CHUNK_SIZE,
                });
            }else{
                this.setState({
                    articles: [],
                    content: []
                });
            }
        });
    }

    render() {

        return (
            <main className="app__main">
                <SourcesBar sources={this.state.sources} clickHandler={this.sourceClick}/>
                <SearchBar queryHandler={this.filterClick}/>
                <ContentWrapper articles={this.state.content} />
                <ErrorBlock visible={this.state.newsDisplayed < 1}/>
                <MoreButton clickHandler={this.loadMoreClick}
                            visible={this.state.newsDisplayed < this.PAGE_CAPACITY
                            && this.state.newsDisplayed < this.state.articles.length
                            && this.state.newsDisplayed > 0}/>
            </main>
        );
    }
}