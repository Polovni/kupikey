import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) {
                setUser(data.user);
                fetchPurchases(data.user.id); // Fetch purchases after getting user data
            } else {
                console.error(error);
            }
        };

        const fetchPurchases = async (userId) => {
            const { data, error } = await supabase
                .from('purchases')
                .select('*')
                .eq('user_id', userId);
            
            if (error) {
                console.error('Error fetching purchases:', error.message);
            } else {
                setPurchases(data); // Set purchases in state
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

            <div className="purchases-container">
                <h2>Your Purchases</h2>
                {purchases.length > 0 ? (
                    <div className="purchases-list">
                        {purchases.map((purchase) => (
                            <div key={purchase.id} className="purchase-item">
                                <h3>{purchase.game_name}</h3>
                                <p><strong>Platform:</strong> {purchase.platform}</p>
                                <p><strong>Activation Code:</strong> {purchase.activation_code}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't purchased any games yet.</p>
                )}
            </div>

            <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
    );
};

export default Profile;
