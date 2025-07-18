import react, { useState } from 'react';
import { axiosLogin } from '../../api/axios';
import styles from './LoginPage.css';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
const { login } = useAuth();
const navigate = useNavigate();

const [data, setData] = useState({
    login: '',
    password: ''
});

const handleSubmit = async (e) =>{
    e.preventDefault();
    const responseData = await axiosLogin(data); 
    console.log(responseData);
        if (responseData) {
            console.log(responseData);
            login(responseData); 
            navigate('/main');
        }
}


    return (
       <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
        <div className="face face-front">
            <div className="content">
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field-wrapper">
                        <input type="text" name="username" placeholder="username" onChange={(e) => setData(prev=>({...prev, login: e.target.value}))}/>
                        <label>login</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password" placeholder="password" onChange={(e) => setData(prev=>({...prev, password: e.target.value}))}/>
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