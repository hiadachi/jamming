import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';


class TrackList extends React.Component{
  render(){
    return(
      <div className="TrackList">
	{/* <!-- You will add a map method that renders a set of Track components  -->  */
	  this.props.tracks.map(track=>{
		  console.log(this.props.isRemoval);
	    return <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>;
	  })
	}
      </div>
    );
  }
}

export default TrackList;
