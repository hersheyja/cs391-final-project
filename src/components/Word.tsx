// Word.tsx
// Global: Displays the random word that the user will practice speaking about.
// Receives a word prop from App.tsx once the API is wired up.
// Component Author: Sarah Alhudaithy

import styled from "styled-components";

// card container
const StyledCard = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 480px;
    width: 100%;
    text-align: center;
`;

// The random word
const StyledWord = styled.h2`
    font-size: calc(1.5rem + 1vw);
    font-weight: bold;
    color: #cc0000;
    margin-bottom: 12px;
`;

// Prompt below the word
const StyledPrompt = styled.p`
    font-size: 1rem;
    color: #666666;
`;

// Word component
export default function Word({ word = "Your word will appear here" }: { word?: string }) {
    return (
        <StyledCard>

            <StyledWord>{word}</StyledWord>

            <StyledPrompt>Start the timer and speak about this word</StyledPrompt>
        </StyledCard>
    );
}
