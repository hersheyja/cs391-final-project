// Button.tsx
// Global: Button that fetches a new random word when clicked.
// First click says "Pick My Word", after that says "New Word".
// Component Author: Jun Kim

import styled from "styled-components";
import { useState } from "react";

// Styled button
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

// Button component - built by Hershey Jamla
export default function Button({ onSpin }: { onSpin?: () => void }) {
    // tracks if user has clicked at least once
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
        if (onSpin) onSpin();
    }

    return (
        <StyledButton onClick={handleClick}>
            {clicked ? "New Word" : "Pick My Word"}
        </StyledButton>
    );
}
