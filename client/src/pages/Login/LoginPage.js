import axios from 'axios';

const handleClick = async () =>{
    try {
        const response = await axios.get('http://localhost:5000/api/login');
        console.log(response.data);
    }catch (error){
        console.error('Error: ', error);
    }
}

function LoginPage() {
    return (
        <div>
            <button className=" m-5 btn btn-primary" onClick={handleClick}>test</button>
        </div>
    )
}
export default LoginPage