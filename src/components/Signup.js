import React, {useState}  from 'react'
import { useNavigate  } from 'react-router-dom'
  // const host = "http://localhost:5000";
  const host = "https://inotebook-backend-m8bt.onrender.com";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" }) 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          // history.push("/");
          navigate('/login');
          props.showAlert("Account Created Successfully", "Success");

      }
      else{
          props.showAlert("Invalid credentials", "danger");
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='container log_in'>
       <h3> Create an account to Use iNotebook</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">Name</label>
          <input type="name" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label fs-5">Password</label>
          <input type="password" className="form-control" id="Password" name='password' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label fs-5">Confirm Password</label>
          <input type="password" className="form-control" id="cPassword" name='cpassword' onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup
