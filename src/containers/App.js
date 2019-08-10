import React, { PureComponent } from 'react';
import './App.css';
import MeetUpLogin from '../components/MeetUpLogin'
import {Route} from 'react-router-dom'

const CONSUMER_KEY = process.env.REACT_APP_MEETUP_CONSUMER_KEY
const REDIRECT_URI = process.env.REACT_APP_MEETUP_CONSUMER_REDIRECT_URI
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
class App extends PureComponent{
  state={
    madeRequest: false,
    loggedIn: false
  }  

  getTokenMeetup = () =>{
    return `https://secure.meetup.com/oauth2/authorize?client_id=${CONSUMER_KEY}&response_type=code&redirect_uri=${REDIRECT_URI}`
  }

  handleStateLogIn = () =>{
    this.setState({loggedIn: !this.state.loggedIn})
  }

  tryToMakeARequestToMeetUp = () =>{
   fetch(BACKEND_BASE_URL + '/other/routes',{
     method: "GET",
     headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
   }).then(r => r.json())
   .then(data => {
    if(data.success){
      this.setState({
        madeRequest: true 
      })
    }
   })
  }
  
  render(){
    return (
      <div className="App">
          <h1>Plain react front</h1>
          {this.state.loggedIn ? null:
          <React.Fragment>
            <a href={this.getTokenMeetup()} >Link to log in through MeetUp</a>
            <Route exact path="/meetup/login/" render={ props => <MeetUpLogin {...props} li={this.handleStateLogIn}/> }/>

          </React.Fragment>
            }
    


          {!!localStorage.getItem('token') ? 
            <div>
              <p>Logged in through MeetUp</p>
              <button onClick={this.tryToMakeARequestToMeetUp} type="button">
                Try to make MeetUp Request
              </button>
            </div>
            :
            <p> Not logged in through MeetUp</p>
          }

          {this.state.madeRequest ? <p>Succesfully made request back to MeetUp</p> : null}
      </div>
    );

  }
}

export default App;
