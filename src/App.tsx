import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router";
import styled from "styled-components";
import ChallengeCard from "./components/ChallengeCard.tsx";
import SpinButton from "./components/SpinButton.tsx";
import CategoryFilter from "./components/CategoryFilter.tsx";
import HistoryLog from "./components/HistoryLog.tsx";

// Main page wrapper
const StyledWrapper = styled.div`
    width: 80vw;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 24px;
`;

// Page title
const StyledTitle = styled.h1`
    text-align: center;
    color: #cc0000;
    font-size: 2rem;
    margin-bottom: 24px;
`;

// Root layout component
function Root() {
  return (
      <StyledWrapper>
        {/* App title */}
        <StyledTitle>BU Challenge Generator</StyledTitle>
        <Routes>
          <Route path="/" element={
            <>
              {/* Category filter - built by  */}
              <CategoryFilter />

              {/* Spin button - built by  */}
              <SpinButton />

              {/* Challenge card - built by Hershey Jamla */}
              <ChallengeCard challenge={{
                title: "Eat at every dining hall in one day",
                description: "Visit all BU dining halls before midnight.",
                category: "Food",
                difficulty: "Hard"
              }} />

              {/* History log - built by  */}
              <HistoryLog />
            </>
          } />
        </Routes>
      </StyledWrapper>
  );
}

// Browser router setup
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