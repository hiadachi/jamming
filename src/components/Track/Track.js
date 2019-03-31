import React from 'react';
import './Track.css';
class Track extends React.Component{
  constructor(props){
    super(props)
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }
  renderAction(){
    const isRemoval=this.props.isRemoval;
    let aref ="";
    if(isRemoval){
      //aref= "+";
      return <a className='Track-action' onClick={this.addTrack}>+</a>;
    }else{
      //aref= "-";
      return <a className='Track-action' onClick={this.removeTrack}>-</a>;
    }
  }

  addTrack(e){
    this.props.onAdd(this.props.track);
  }
  removeTrack(e){
    this.props.onRemove(this.props.track);
  }

  render(){
    return(
      <div className="Track">
  	<div className="Track-information">
    	  <h3>{this.props.track.name} </h3>
    	  <p> {this.props.track.artist} | {this.props.track.album} </p>
  	</div>
	{this.renderAction()}
      </div>
    );
  }
}

export default Track;
