// Word.tsx
// Global: Displays a random word for the user to practice speaking about.
// Component Author: Hershey Jamla

import styled from "styled-components";

// Card container
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

// The word displayed on the card
const StyledWord = styled.h2`
    font-size: calc(1.5rem + 1vw);
    font-weight: bold;
    color: #cc0000;
    margin-bottom: 12px;
`;

// Subtitle prompt
const StyledPrompt = styled.p`
    font-size: 1rem;
    color: #666666;
`;

// Word component - built by Hershey Jamla
export default function Word({ word = "Your word will appear here" }: { word?: string }) {
    return (
        <StyledCard>

            <StyledWord>{word}</StyledWord>

            <StyledPrompt>Start the timer and speak about this word</StyledPrompt>
        </StyledCard>
    );
}
