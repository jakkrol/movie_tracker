import react, { useState } from 'react';
import { axiosRegister } from '../../api/axios';
import styles from './LoginPage.css';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        login: '',
        password: '',
        repeat_password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data.login);
        console.log(data.password);
        console.log(data.repeat_password);

        const register = await axiosRegister(data);
        if(register) {
            navigate("/");
        }
    }

    return (
       <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
        <div className="face face-front">
            <div className="content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field-wrapper">
                        <input type="text" name="username" placeholder="username" onChange={(e) => setData(prev=>({...prev, login: e.target.value}))}/>
                        <label>username</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password" placeholder="password" onChange={(e) => setData(prev=>({...prev, password: e.target.value}))}/>
                        <label>password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="repeat_password" placeholder="repeat password" onChange={(e) => setData(prev=>({...prev, repeat_password: e.target.value}))}/>
                        <label>repeat password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit" value="Zarejestruj"/>
                    </div>
                    <span className="signup" onClick={() => navigate('/')}>I already have an account</span>
                </form>
            </div>
        </div>
       </div>
    )
}
export default RegisterPage