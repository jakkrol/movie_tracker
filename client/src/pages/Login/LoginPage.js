import react from 'react';
import axios from 'axios';
import styles from './LoginPage.css';

const handleSubmit = async () =>{
    try {
        const response = await axios.get('http://localhost:5000/api/login');
        console.log(response.data);
    }catch (error){
        console.error('Error: ', error);
    }
}

 // <div>
        //     <button className=" m-5 btn btn-primary" onClick={handleClick}>test</button>
        // </div>

function LoginPage() {
    return (
       <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
        <div className="face face-front">
            <div className="content">
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field-wrapper">
                        <input type="text" name="username" placeholder="username"/>
                        <label>username</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password" placeholder="password" autocomplete="new-password"/>
                        <label>password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit"/>
                    </div>
                    <span className="psw" onClick="showForgotPassword()">Forgot Password?   </span>
                    <span className="signup" onClick="showSignup()">Not a user?  Sign up</span>
                </form>
            </div>
        </div>
       </div>
    )
}
export default LoginPage