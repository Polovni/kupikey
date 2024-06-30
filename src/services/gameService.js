import { supabase } from '../supabaseClient';

export const fetchGames = async () => {
    try {
        console.log("Fetching games...");
        let { data: games, error } = await supabase.from('games').select('*');
        if (error) {
            console.error('Error from Supabase:', error);
            throw error;
        }
        console.log('Fetched games:', games); // Log the fetched games
        games = games.map(game => ({
            ...game,
        }));
        return games;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export const fetchGameById = async (id) => {
    try {
        console.log("Fetching game by ID:", id);
        const { data, error } = await supabase.from('games').select('*').eq('id', id).single();
        if (error) {
            console.error('Error from Supabase:', error);
            throw error;
        }
        console.log('Fetched game data:', data); // Log the fetched game data
        return data;
    } catch (error) {
        console.error('Error fetching game by ID:', error);
        return null;
    }
};
