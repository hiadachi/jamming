import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
	searchResults:[],
	playlistTracks:[],
	playlistName:'New Playlist'
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack=> savedTrack.id === track.id)){
      return;
    }else{
      let tmpPlTracks = this.state.playlistTracks;
      tmpPlTracks.push(track);      
      this.setState({
    	playlistTracks: tmpPlTracks
  　　});
    }
  }
 
  removeTrack(track){
    let tmpPlTracks=this.state.playlistTracks;
    let newPlTracks=tmpPlTracks.filter(element=>track.id!==element.id);
    this.setState({playlistTracks:newPlTracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }
  
  savePlaylist(){
    const trackURIs = [];
    this.state.playlistTracks.map(function(track){
      trackURIs.push(track.uri)
    });
    
    console.log("URIs");   
    console.log(trackURIs);   
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.state.playlistTracks=[];
    this.state.playlistName='New Playlist';
    
  }

  search(term){
    
    Spotify.search(term).then(searchResults => {
	    console.log(searchResults);
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
	<h1>Ja<span className="highlight">mmm</span>ing</h1>
	<div className="App">
	  {/* <!-- Add a SearchBar component --> */}
	  <SearchBar onSearch={this.search}/>
	  <div className="App-playlist">
	    <SearchResults searchResults={this.state.searchResults} isRemoval={true} onAdd={this.addTrack}/>
	    <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} isRemoval={false} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
	  </div>
	</div>
      </div>
    );
  }
}

export default App;
