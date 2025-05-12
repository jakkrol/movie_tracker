import react from 'react';
import axios from 'axios';
import styles from './LoginPage.css';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/api/login');
        console.log(response.data);
        const user = {name: 'John', email: 'ettattea@asd.as'};
        login(user);
        navigate('/main');
    }catch (error){
        console.error('Error: ', error);
    }
}


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
                        <input type="password" name="password" placeholder="password"/>
                        <label>password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit"/>
                    </div>
                    <span className="psw" onClick="showForgotPassword()">Forgot Password?   </span>
                    <span className="signup" onClick={() => navigate('register')}>Not a user?  Sign up</span>
                </form>
            </div>
        </div>
       </div>
    )
}
export default LoginPage