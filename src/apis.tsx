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

function getFirstTranslation(translation: string): string {
  return translation
    .split(/[,،;؛/|\n]/)[0]
    .replace(/[()[\]{}"']/g, '')
    .trim();
}

// API function to translate an English word to Arabic
export const translateToArabic = async (word: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|ar`
    );

    if (!response.ok) {
      throw new Error('Failed to translate word');
    }

    const data: { responseData?: { translatedText?: string } } = await response.json();
    const translatedWord = data.responseData?.translatedText
      ? getFirstTranslation(data.responseData.translatedText)
      : undefined;

    if (!translatedWord) {
      throw new Error('Translation API did not return a word');
    }

    return translatedWord;
  } catch (error) {
    console.error('Error translating word:', error);
    throw error;
  }
};
