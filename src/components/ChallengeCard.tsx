// ChallengeCard.tsx
// Global: Displays a single BU challenge with its title, description, category, and difficulty.
// Component Author: Hershey Jamla

import styled from "styled-components";

type ChallengeCardProps = {
    title: string;
    description: string;
    category: string;
    difficulty: string;
};

const StyledCard = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 480px;
    width: 100%;
`;

const StyledChallengeTitle = styled.h2`
    font-size: 1.4rem;
    font-weight: bold;
    color: #cc0000;
    margin-bottom: 12px;
`;

// text below the title
const StyledDescription = styled.p`
    font-size: 1rem;
    color: #333333;
    margin-bottom: 16px;
    line-height: 1.5;
`;

//  category and difficulty
const StyledBadgeRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

//  challenge category
const StyledCategoryBadge = styled.span`
    background-color: #cc0000;
    color: white;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.85rem;
    font-weight: 600;
`;

//  difficulty level
const StyledDifficultyBadge = styled.span`
    background-color: #333333;
    color: white;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.85rem;
    font-weight: 600;
`;

// ChallengeCard component - built by Hershey Jamla
export default function ChallengeCard({ challenge }: { challenge: ChallengeCardProps }) {
    return (
        <StyledCard>
            <>
                {/* Display the challenge title */}
                <StyledChallengeTitle>{challenge.title}</StyledChallengeTitle>

                {/* Display the challenge description */}
                <StyledDescription>{challenge.description}</StyledDescription>

                {/* Display category and difficulty as badges */}
                <StyledBadgeRow>
                    <StyledCategoryBadge>{challenge.category}</StyledCategoryBadge>
                    <StyledDifficultyBadge>⚡ {challenge.difficulty}</StyledDifficultyBadge>
                </StyledBadgeRow>
            </>
        </StyledCard>
    );
}