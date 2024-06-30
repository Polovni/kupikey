import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) {
                setUser(data.user);
            } else {
                console.error(error);
            }
            setLoading(false);
        };

        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
