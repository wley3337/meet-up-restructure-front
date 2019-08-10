import React, { PureComponent } from 'react';
import './App.css';

class App extends PureComponent{


  getTokenMeetup = () =>{
    return `https://secure.meetup.com/oauth2/authorize
    ?client_id=YOUR_CONSUMER_KEY
    &response_type=code
    &redirect_uri=YOUR_CONSUMER_REDIRECT_URI`
  }
  
  render(){
    return (
      <div className="App">
          <h1>Plain react front</h1>

          <a href={this.getTokenMeetup()}  target="_blank" rel="noopener noreferrer" >Link to log in through MeetUp</a>

          {localStorage.getItem('token') ? 
            <p>Logged in through MeetUp</p>
            :
            <p> Not logged in through MeetUp</p>
          }
      </div>
    );

  }
}

export default App;
