// Button.tsx
// Global: Button that triggers a new random word to be fetched from the API.
// First click says "Pick My Word", after that says "New Word".
// Component Author: Jun Kim

import styled from "styled-components";
import { useState } from "react";

const StyledButton = styled.button`
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: calc(1rem + 0.2vw);
    font-weight: bold;
    cursor: pointer;
    margin: 16px;

    &:hover {
        background-color: #aa0000;
    }

    &:active {
        transform: scale(0.97);
    }
`;

// Button component
export default function Button({ onSpin }: { onSpin?: () => void }) {
    // tracks if user has clicked at least once to change button label
    const [clicked, setClicked] = useState(false);

    // set clicked to true and call onSpin to fetch a new word
    function handleClick() {
        setClicked(true);
        if (onSpin) onSpin();
    }

    return (
        // set clicked to true and call onSpin to fetch a new word
        <StyledButton onClick={handleClick}>
            {clicked ? "New Word" : "Pick My Word"}
        </StyledButton>
    );
}
