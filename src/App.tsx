// App.tsx
// Global: Entry point for the Public Speaking Practice App.
// Users click a button to get a random word, then use the timer to practice speaking about it.
// Sets up routing using createBrowserRouter and RouterProvider.

import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import Word from "./components/Word.tsx";
import Button from "./components/Button.tsx";
import Timer from "./components/Timer.tsx";
import Language from "./components/Language.tsx";
import { fetchRandomWord, translateToArabic } from "./apis.tsx";

// Page wrapper
const StyledWrapper = styled.div`
    width: 80vw;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// App title
const StyledTitle = styled.h1`
    text-align: center;
    color: #cc0000;
    font-size: calc(1.5rem + 1vw);
    margin-bottom: 4px;
`;

// App subtitle
const StyledSubtitle = styled.p`
    text-align: center;
    color: #666666;
    font-size: calc(0.9rem + 0.2vw);
    margin-bottom: 24px;
`;

// Root layout
function Root() {
    const [englishWord, setEnglishWord] = useState<string>();
    const [word, setWord] = useState<string>();
    const [isArabic, setIsArabic] = useState(false);

    async function handleSpin() {
        const randomWord = await fetchRandomWord();
        setEnglishWord(randomWord);

        if (isArabic) {
            const arabicWord = await translateToArabic(randomWord);
            setWord(arabicWord);
        } else {
            setWord(randomWord);
        }
    }

    async function handleLanguageToggle(showArabic: boolean) {
        setIsArabic(showArabic);

        if (!englishWord) {
            return;
        }

        if (showArabic) {
            const arabicWord = await translateToArabic(englishWord);
            setWord(arabicWord);
        } else {
            setWord(englishWord);
        }
    }

    return (
        <StyledWrapper>
            <Routes>
                <Route path="/" element={
                    <>
                        {/* App title and description */}
                        <StyledTitle>🗣️ Word Up</StyledTitle>
                        <StyledSubtitle>Practice your public speaking — one word at a time.</StyledSubtitle>

                        {/* Language toggle */}
                        <Language onToggle={handleLanguageToggle} />

                        {/* Pick word button - built by Hershey Jamla */}
                        <Button onSpin={handleSpin} />

                        {/* Word card */}
                        <Word word={word} />

                        {/* Timer - built by Hershey Jamla */}
                        <Timer />
                    </>
                } />
            </Routes>
        </StyledWrapper>
    );
}

const router = createBrowserRouter(
    [{ path: "*", Component: Root }]
);

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
