import react, { useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.css';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
        repeat_password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data.username);
        console.log(data.password);
        console.log(data.repeat_password);

        if(data.password === data.repeat_password){
            console.log("Very gucci")
            try{
                const registerUser = {name: data.username, password: data.password};
                const response = await axios.post('http://localhost:5000/api/register', registerUser);
                console.log(response.data);
                navigate('/');
            }catch{}
        }
    }

    return (
       <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
        <div className="face face-front">
            <div className="content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field-wrapper">
                        <input type="text" name="username" placeholder="username" onChange={(e) => setData(prev=>({...prev, username: e.target.value}))}/>
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