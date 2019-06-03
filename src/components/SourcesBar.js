import React from 'react';
import SourceButton from './SourceButton';

export default class SourcesBar extends React.Component{
    render(){
        return(
            <div id="sources" className="app__main-sources">
                {this.props.sources.map((source) => {
                    return (
                        <SourceButton id={source.id} key={source.id} clickHandler={this.props.clickHandler}>
                            {source.name}
                        </SourceButton>
                    );
                })}
            </div>
        );
    }
}