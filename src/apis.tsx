// API function to fetch a random word from the English dictionary
export const fetchRandomWord = async (): Promise<string> => {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    if (!response.ok) {
      throw new Error('Failed to fetch random word');
    }
    const data: string[] = await response.json();
    return data[0]; // API returns an array, take the first word
  } catch (error) {
    console.error('Error fetching random word:', error);
    throw error; // Re-throw to handle in the component
  }
};