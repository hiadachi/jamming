let accessToken = undefined;
let expiresIn  = undefined;
let playlistID = undefined;
const clientID = '8f92137b75474197949f434c6c1b2979';
const url ='https://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/';


const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }else{
      //check the URL to see if it has just been obtained.
      //console.log(window.location.href) ;
      if (
        window.location.href.match(/access_token=([^&]*)/) &&
        window.location.href.match(/expires_in=([^&]*)/)
      ) {
        //If the access token and expiration time are in the URL, implement the following steps:
	// - Set the access token value
	   accessToken =  accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
	// - Set a variable for expiration time
           expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
	// - Set the access token to expire at the value for expiration time
           window.setTimeout(()=>accessToken='', expiresIn *1000); 
	// - Clear the parameters from the URL, so the app doesn’t try grabbing the access token 
	//  after it has expired
	   window.history.pushState('Access Token', null, '/');
	      console.log("accessToken");
	      console.log(accessToken);
	   return accessToken;
      }else{
        window.location=`${url}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`; 
      }
    }
  },
  
  search(searchTerm){
    console.log(searchTerm);
    let accessToken=this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
 	headers: {Authorization: `Bearer ${accessToken}`}
      }
    ).then(response=>{
      if(response.ok){
	      console.log("response");
	      console.log(response);
        return response.json();
      }
      throw new Error('Request failed!');
    }, 
    networkError=>{
      console.log(networkError.message);
    }
    ).then(response=>{
	      console.log("response2");
	      console.log(response);
      if(response){
	console.log("items;");	      
        console.log(response.tracks.items);
        return response.tracks.items.map(track=>({
	      id: track.id,
	      name: track.name,
	      artists: track.artists[0].name,
	      album: track.album.name,
	      uri: track.uri
        }));
      }else{
        return [];
      }
    });
  },
  
  savePlaylist(playlistName, trackURIs){
	  console.log("PLNAME:"+playlistName);
	  console.log("TrackURIs:"+trackURIs);
	 
    if(playlistName&&trackURIs){
      const saveToken = this.getAccessToken();
      const saveHeader = {Authorization: `Bearer ${saveToken}`};
      const saveName = JSON.stringify({name:playlistName});
      const saveTracks = JSON.stringify({uris:trackURIs});
      let saveUserID=undefined;

      return fetch(`https://api.spotify.com/v1/me`,
          {
	    headers: saveHeader
	  }
      ).then(response=>{
        if(response.ok){
	  console.log("responsechk:");
	  console.log(response);
          return response.json();
        }
        throw new Error('Get userID Request failed!');
      }).then(jsonResponse=>{
	  console.log("chk3-sccess:");
	  console.log(jsonResponse.id);
	  saveUserID=jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${saveUserID}/playlists`,
  	    {
	      method: 'POST',
	      headers:  saveHeader,
	      body: saveName
      	    })
      }).then(response=>{
	  if(response.ok){
	    return response.json();
	  }
	  throw new Error('Create Playlist failed!');
      }).then(jsonResponse=>{
          const playlistID=jsonResponse.id;
	  return fetch(`https://api.spotify.com/v1/users/${saveUserID}/playlists/${playlistID}/tracks`,
	    {
	      method: 'POST',
	      headers:  saveHeader,
	      body: saveTracks
	    }
	  )
      }).then(response=>{
      	  if(response.ok){
            console.log("Add playlist success!")
	    return;
	  }
	  throw new Error('Add Tracks failed!');
      })
    }else{
      return;
    }
  }
}

export default Spotify;
