import axios from 'axios';

export const fetchQuestions = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.questions; // Adjust according to your API response structure
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
};