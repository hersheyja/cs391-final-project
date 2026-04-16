// App.tsx
// Global: Entry point for the Public Speaking Practice App.
// Users click a button to get a random word, then use the timer to practice speaking about it.
// Sets up routing using createBrowserRouter and RouterProvider.

import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";
import Word from "./components/Word.tsx";
import Button from "./components/Button.tsx";
import Timer from "./components/Timer.tsx";
import Language from "./components/Language.tsx";
import { fetchRandomWord } from "./apis.tsx";

// Global reset so the app fills the full screen
const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        font-family: Arial, Helvetica, sans-serif;
    }

    body {
        background: linear-gradient(135deg, #fff5f5 0%, #f7f8fc 45%, #eef2ff 100%);
    }
`;

// Full page wrapper
const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 20px;
`;

// Main content container
const StyledMainCard = styled.div`
    width: 100%;
    max-width: 850px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 32px;
    padding: 40px 28px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// App title
const StyledTitle = styled.h1`
    text-align: center;
    color: #d90429;
    font-size: calc(2rem + 0.9vw);
    margin: 0;
    font-weight: 800;
    letter-spacing: -0.04em;
`;

// App subtitle
const StyledSubtitle = styled.p`
    text-align: center;
    color: #6b7280;
    font-size: 1.1rem;
    margin-top: 10px;
    margin-bottom: 26px;
`;

// Optional section wrapper
const StyledLanguageWrap = styled.div`
    margin-bottom: 8px;
`;

// Root layout
function Root() {
    const [word, setWord] = useState<string>();

    async function handleSpin() {
        const randomWord = await fetchRandomWord();
        setWord(randomWord);
    }

    return (
        <StyledWrapper>
            <StyledMainCard>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <StyledTitle>🗣️ Word Up</StyledTitle>
                                <StyledSubtitle>
                                    Practice your public speaking — one word at a time.
                                </StyledSubtitle>

                                <StyledLanguageWrap>
                                    <Language />
                                </StyledLanguageWrap>

                                <Button onSpin={handleSpin} />
                                <Word word={word} />
                                <Timer />
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
