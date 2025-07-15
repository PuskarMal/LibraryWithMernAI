import React,{Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Forgot extends Component {
  constructor(props){
    super(props);
    this.state = { email: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const {email} = this.state;
    console.log(email);
    const fetch = async () => {
      try {
        const response = await axios.post("https://librarybackend-3-73l4.onrender.com/api/auth/forgot-password", {email});
        const data = response.data.status; // Extract the data from the response
        alert(data);
      } catch (error) {
        console.error(error);
      }
    }
  fetch();
}
  render(){
    return(
  <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
    <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full mb-50 md:w-3/6 lg:w-2/6">
      <p className="text-zinc-200 text-xl">Password Reset</p>
      <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">Email</label> 
          <input type="email" 
          className="w-full mt-2 bg-zinc-900 text-zinc-700 p-2 outline-none focus:bg-zinc-300" placeholder='Enter your email here'
          onChange = {(e) => this.setState({ email: e.target.value })}/>
          </div>
        
        <div className="mt-4">
          <button className="w-full bg-blue-800 text-white font-semibold py-2 rounded hover:bg-zinc-100 hover:text-zinc-900" 
          onClick={this.handleSubmit}>Reset</button>
        </div>
        <Link to="/login" className='text-zinc-400 flex mt-3 justify-end hover:text-blue-600'>Back to Login</Link>
      </div>
      

    </div>)
  }
};

