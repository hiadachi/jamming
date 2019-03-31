import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      term:undefined
    }
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }
  search(){
    if(this.state.term){
      this.props.onSearch(this.state.term);
    }else{
      console.log("Error: Blank term");
      return;
    }
  }

  handleTermChange(event){
    this.setState({term:event.target.value}); 
  }

  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

}

export default SearchBar;
