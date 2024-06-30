import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) {
                setUser(data.user);
            } else {
                console.error(error);
            }
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            navigate('/login');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
            </div>
            <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
    );
};

export default Profile;
