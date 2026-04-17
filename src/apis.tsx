import dictionary from "./data/dictionary.json";

// Picks a random word from the local English dictionary
export const fetchRandomWord = async (): Promise<string> => {
  const words = dictionary as string[];
  const randomWord = words[Math.floor(Math.random() * words.length)];

  if (!randomWord) {
    throw new Error('Local dictionary is empty');
  }

  return randomWord;
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
