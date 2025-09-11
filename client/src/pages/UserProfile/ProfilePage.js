import react, {useState, useEffect, use} from 'react';
import Header from '../../Components/Header';
import styles from '../Main/MoviePreviewPage';
import { axiosGetUserProfile } from '../../api/axios';
import { useAuth } from '../../Contexts/AuthContext';


function ProfilePage() {
const { user, login } = useAuth();

const [profile, setProfile] = useState([]);

useEffect(() => {
    const fetchProfile = async () => {
        const response = await axiosGetUserProfile(user, login, "test");
        setProfile(response.data);
        console.log("RESPONSE:", response);
        console.log("Profile data:", profile);
    }
    fetchProfile();
}, [])



 return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
      <div className="shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center">
        <img
          src={profile.avatar_url || '/default-avatar.png'}
          alt="User avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />

        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">{profile.login}</h2>
          {/* <p className="text-gray-500">{user.email}</p> */}

          <div className="mt-4 space-y-1 text-gray-600 text-sm">
            {/* <p><strong>Role:</strong> {user.role || 'User'}</p> */}
            <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
            {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
          </div>

          <div className="mt-4 flex gap-3 justify-center md:justify-start">
            <button className="px-4 py-2 styled-button">
              Edit Profile
            </button>
            <button className="px-4 py-2 styled-button">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;