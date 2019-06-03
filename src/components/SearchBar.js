import React from 'react';
import FilterButton from "./FilterButton";
import InputField from "./InputField";

export default class SearchBar extends React.Component{
    render(){
        return(
            <div className="app__main-search">
                <InputField clickHandler={this.props.queryHandler}/>
                <FilterButton clickHandler={this.props.queryHandler}/>
            </div>
        );
    }
}