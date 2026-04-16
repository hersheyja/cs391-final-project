// Button.tsx
// Global: Button that spins 360 degrees when clicked, then reveals a new challenge.
// Component Author: Hershey Jamla &

// wire onSpin prop in App.tsx to pick a random challenge and pass it to Word

import styled, { keyframes } from "styled-components";
import { useState } from "react";

// 360 spin animation
const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

// Button that plays spin animation when spinning state is true
const StyledButton = styled.button<{ $spinning: boolean }>`
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: calc(1rem + 0.2vw);
    font-weight: bold;
    cursor: pointer;
    margin: 16px;
    animation: ${({ $spinning }) => $spinning ? spin : "none"} 0.5s ease;

   
`;

// Button component - built by Hershey Jamla
export default function Button({ onSpin }: { onSpin?: () => void }) {
    // controls whether the spin animation is playing
    const [spinning, setSpinning] = useState(false);

    // spin the button for 0.5s then call onSpin
    function handleClick() {
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            if (onSpin) onSpin();
        }, 500);
    }

    return (
        <StyledButton $spinning={spinning} onClick={handleClick}>
             Feeling Adventurous? 🎲
        </StyledButton>
    );
}