import { supabase } from '../supabaseClient';

export const fetchGames = async () => {
    try {
        let { data: games, error } = await supabase.from('games').select('*');
        if (error) throw error;
        games = games.map(game => ({
            ...game,
        }));
        return games;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

