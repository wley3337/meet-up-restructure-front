import React,{ PureComponent } from 'react' 
import {Redirect} from 'react-router-dom'

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

class MeetUpLogin extends PureComponent{
    componentDidMount(){
        //the code is from the router props and is the information you need to complete the log-in with meetup
        const code_for_backend= this.props.location.search.split("code=")[1]
        if(code_for_backend){
            //fetch to backend to get the meetup cridental
            fetch(BACKEND_BASE_URL + "/meetup/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({login: {code: code_for_backend}})
            })
            .then(r=> r.json())
            .then(data => {
                // This is where you'll handle your token and any forwarding logic
                if(data.success){
                    localStorage.setItem('token', data.token)
                    //here you'll want to handle your loggin events/triggers ect.
                    //this is just for demo
                    this.props.li()
                }
            })
        }
    }

    render(){
        
        return (<div>{localStorage.getItem('token') ? <Redirect to="/"/> : <p>Logging In</p>}</div>)
    }
}

export default MeetUpLogin



// secure headers:
// headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: `Bearer ${localStorage.getItem("token")}`
// }