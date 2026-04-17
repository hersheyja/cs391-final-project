// Language.tsx
// Global: Toggle switch to switch between English and Arabic.
// Default is English. When switched to Arabic, page direction changes to right-to-left.
// Component Author: Hershey Jamla

import styled from "styled-components";
import { useState } from "react";

// container pinned to top right corner of the page
const StyledContainer = styled.div`
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: white;
    padding: 8px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 999;
`;

// EN or AR label
const StyledLabel = styled.span<{ $active: boolean }>`
    font-size: 0.85rem;
    font-weight: bold;
    color: ${({ $active }) => $active ? "#cc0000" : "#999999"};
`;

//  red when Arabic, gray when English
const StyledTrack = styled.div<{ $isArabic: boolean }>`
    width: 44px;
    height: 24px;
    background-color: ${({ $isArabic }) => $isArabic ? "#cc0000" : "#cccccc"};
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;
`;

// The knob placement depends on language
const StyledKnob = styled.div<{ $isArabic: boolean }>`
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: ${({ $isArabic }) => $isArabic ? "23px" : "3px"};
    transition: left 0.3s;
`;

// Language component
export default function Language({ onToggle }: { onToggle?: (isArabic: boolean) => void }) {
    // false = English (default), true = Arabic
    const [isArabic, setIsArabic] = useState(false);

    // flip language and change page direction
    function handleToggle() {
        const newVal = !isArabic;
        setIsArabic(newVal);
        // rtl flips the entire page layout for Arabic
        document.documentElement.dir = newVal ? "rtl" : "ltr";
        if (onToggle) onToggle(newVal);
    }

    return (
        <StyledContainer>
            <StyledLabel $active={!isArabic}>EN</StyledLabel>

            <StyledTrack $isArabic={isArabic} onClick={handleToggle}>
                <StyledKnob $isArabic={isArabic} />
            </StyledTrack>

            <StyledLabel $active={isArabic}>AR</StyledLabel>
        </StyledContainer>
    );
}
