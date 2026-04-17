// Timer.tsx
// Global: Countdown timer for the Word Up public speaking practice app.
// Users set a custom time using minute and second dropdowns, then start, pause, or reset the timer.
// Plays an alarm sound when time runs out.
// Component Author: Shouq Aldrees

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

//card container
const StyledTimerCard = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 480px;
    width: 100%;
    text-align: center;
`;

// timer section heading
const StyledHeading = styled.h2`
    color: #cc0000;
    font-size: calc(1.2rem + 0.5vw);
    margin-bottom: 16px;
`;

//wrapper for minutes and seconds dropdown
const StyledInputWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

// individual input group
const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// label above dropdown
const StyledLabel = styled.label`
    font-size: 0.95rem;
    color: #666666;
    margin-bottom: 6px;
`;

// dropdown select
const StyledSelect = styled.select`
    width: 110px;
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    border: 2px solid #dddddd;
    border-radius: 8px;
    background-color: white;
    color: #333333;

    &:focus {
        outline: none;
        border-color: #cc0000;
    }
`;

// Large countdown
const StyledTimeDisplay = styled.div`
    font-size: calc(2rem + 1vw);
    font-weight: bold;
    color: #cc0000;
    margin: 20px 0;
`;

//  start, pause, reset buttons
const StyledButtonRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
`;

// Shared button style for start, pause, reset
const StyledButton = styled.button`
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #aa0000;
    }

    &:active {
        transform: scale(0.97);
    }
`;

// Status message
const StyledStatus = styled.p`
    margin-top: 16px;
    font-size: 1rem;
    color: #666666;
`;

export default function Timer() {
    // Status message shown below buttons
    const [minutesInput, setMinutesInput] = useState<number>(1);
    const [secondsInput, setSecondsInput] = useState<number>(0);
    // current time left in seconds
    const [timeLeft, setTimeLeft] = useState<number>(60);
    // whether the timer is actively counting down
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // whether the timer has finished
    const [isFinished, setIsFinished] = useState<boolean>(false);
    // ref to the alarm audio element
    const alarmRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!isRunning) return;

        if (timeLeft <= 0) {
            setIsRunning(false);
            setIsFinished(true);
            // alarm sound
            if (alarmRef.current) {
                alarmRef.current.play();
            }

            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    // start the timer if time is remaining
    function handleStart() {
        if (timeLeft > 0) {
            setIsRunning(true);
            setIsFinished(false);
        }
    }

    //pause timer
    function handlePause() {
        setIsRunning(false);
    }
    // reset timer
    function handleReset() {
        const totalSeconds = minutesInput * 60 + secondsInput;
        setIsRunning(false);
        setTimeLeft(totalSeconds);
        setIsFinished(false);

        if (alarmRef.current) {
            alarmRef.current.pause();
            alarmRef.current.currentTime = 0;
        }
    }

    // update total time when minutes dropdown changes
    function handleMinutesChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = Number(e.target.value);
        setMinutesInput(value);

        if (!isRunning) {
            setTimeLeft(value * 60 + secondsInput);
            setIsFinished(false);
        }
    }

    // update total time when seconds dropdown changes
    function handleSecondsChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = Number(e.target.value);
        setSecondsInput(value);

        if (!isRunning) {
            setTimeLeft(minutesInput * 60 + value);
            setIsFinished(false);
        }
    }
    // format seconds
    function formatTime(totalSeconds: number): string {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <>
            <StyledTimerCard>
                <StyledHeading>Set Your Speaking Time</StyledHeading>

                <StyledInputWrapper>
                    <StyledInputGroup>
                        <StyledLabel htmlFor="minutes">Minutes</StyledLabel>
                        <StyledSelect
                            id="minutes"
                            value={minutesInput}
                            onChange={handleMinutesChange}
                        >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </StyledSelect>
                    </StyledInputGroup>

                    <StyledInputGroup>
                        <StyledLabel htmlFor="seconds">Seconds</StyledLabel>
                        <StyledSelect
                            id="seconds"
                            value={secondsInput}
                            onChange={handleSecondsChange}
                        >
                            <option value={0}>00</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                        </StyledSelect>
                    </StyledInputGroup>
                </StyledInputWrapper>

                <StyledTimeDisplay>{formatTime(timeLeft)}</StyledTimeDisplay>

                <StyledButtonRow>
                    <StyledButton onClick={handleStart}>Start</StyledButton>
                    <StyledButton onClick={handlePause}>Pause</StyledButton>
                    <StyledButton onClick={handleReset}>Reset</StyledButton>
                </StyledButtonRow>

                <StyledStatus>
                    {isFinished ? "Time’s up!" : isRunning ? "Keep speaking!" : "Ready to begin."}
                </StyledStatus>
            </StyledTimerCard>

            <audio ref={alarmRef}>
                <source src="/alarm.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
}