// App.tsx
// Global: Entry point for the Word Up public speaking practice app.
// Users pick a random word, optionally switch to Arabic, and use the timer to practice speaking.
// Sets up routing using createBrowserRouter and RouterProvider.
// Component Author: Hershey Jamla & Shouq Aldrees

import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";
import Word from "./components/Word.tsx";
import Button from "./components/Button.tsx";
import Timer from "./components/Timer.tsx";
import Language from "./components/Language.tsx";
import { fetchRandomWord, translateToArabic } from "./apis.tsx";

// applied to the entire app
const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        font-family: Inter, Arial, Helvetica, sans-serif;
    }

    body {
        background:
            radial-gradient(circle at top left, rgba(255, 214, 214, 0.9), transparent 30%),
            radial-gradient(circle at bottom right, rgba(214, 227, 255, 0.9), transparent 35%),
            linear-gradient(135deg, #fff8f8 0%, #f8faff 50%, #eef3ff 100%);
        color: #1f2937;
    }
`;

// Full page wrapper centered vertically and horizontally
const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 20px;
`;

// Main frosted glass card containing all content
const StyledMainCard = styled.div`
    width: 100%;
    max-width: 1100px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-radius: 32px;
    padding: 32px;
    box-shadow:
        0 20px 60px rgba(15, 23, 42, 0.10),
        inset 0 1px 0 rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.65);

    @media (max-width: 768px) {
        padding: 22px 16px;
        border-radius: 24px;
    }
`;

// Top bar holding the language toggle on the right
const StyledTopBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
`;

//  title and subtitle
const StyledHero = styled.div`
    text-align: center;
    margin-bottom: 32px;
`;

// badge above the title
const StyledBadge = styled.div`
    display: inline-block;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(217, 4, 41, 0.08);
    color: #d90429;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 16px;
`;

// Main app title
const StyledTitle = styled.h1`
    margin: 0;
    color: #d90429;
    font-size: clamp(2.3rem, 4vw, 4rem);
    font-weight: 900;
    letter-spacing: -0.06em;
    line-height: 1;
`;

// description below title
const StyledSubtitle = styled.p`
    max-width: 700px;
    margin: 14px auto 0;
    color: #6b7280;
    font-size: 1.08rem;
    line-height: 1.6;
`;

// two column grid
const StyledContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

// holds the buttons and word card
const StyledLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

// holds timer
const StyledRightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

function Root() {
    // stores the original English word from the API
    const [englishWord, setEnglishWord] = useState<string>();
    // stores the word currently displayed
    const [word, setWord] = useState<string>();
    // tracks if Arabic mode is active
    const [isArabic, setIsArabic] = useState(false);

    // fetch a new word and translate if Arabic is active
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
    // when language is toggled, translate or revert the current word
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
            <StyledMainCard>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <StyledTopBar>
                                    <Language />
                                </StyledTopBar>


                        {/* Language toggle */}
                        <Language onToggle={handleLanguageToggle} />

                                <StyledHero>
                                    <StyledBadge>Public Speaking Practice</StyledBadge>
                                    <StyledTitle>🗣️ Word Up</StyledTitle>
                                    <StyledSubtitle>
                                        Build confidence, think on your feet, and practice speaking
                                        clearly with a random word challenge and a custom timer
                                    </StyledSubtitle>
                                </StyledHero>

                                <StyledContentGrid>
                                    <StyledLeftColumn>
                                        <Button onSpin={handleSpin} />
                                        <Word word={word} />
                                    </StyledLeftColumn>

                                    <StyledRightColumn>
                                        <Timer />
                                    </StyledRightColumn>
                                </StyledContentGrid>
                            </>
                        }
                    />
                </Routes>
            </StyledMainCard>
        </StyledWrapper>
    );
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
        </>
    );
}