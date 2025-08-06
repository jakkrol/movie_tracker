import react, {useState, useEffect, use} from 'react';
import Header from '../../Components/Header';
import { axiosGetUserProfile } from '../../api/axios';
import { useAuth } from '../../Contexts/AuthContext';


function ProfilePage() {
const { user, login } = useAuth();

const [profile, setProfile] = useState([]);

useEffect(() => {
    const response = axiosGetUserProfile(user, login, "test");
    setProfile(response);
    console.log("Profile data:", profile);
}, [])



    return (
    <div>
        <Header />
        <h2>User Profile</h2>
    </div>
    );
};

export default ProfilePage;