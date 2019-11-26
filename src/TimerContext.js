import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TimerContext = React.createContext({});

export const Provider = ({ children }) => {
	const [rounds, setRounds] = useState(12);
	const [currentRound, setCurrentRound] = useState(0);
	const [roundTime, setRoundTime] = useState(180); // in seconds
	const [timeRemaining, setTimeRemaining] = useState(180); // in seconds
	const [restTime, setRestTime] = useState(60); // in seconds
	const [roundEndWarning, setRoundEndWarning] = useState(10); // in seconds
	const [isInProgress, setIsInProgress] = useState(false);
	const [isInRest, setIsInRest] = useState(false);

	useEffect(() => {
		if (!isInProgress) return;

		const tick = () => {
			if (timeRemaining !== 0) {
				// tick clock
				setTimeRemaining(timeRemaining - 1);

				return;
			}

			if (isInRest === false) {
				// set to rest mode
				if (currentRound === 12) {
					setIsInProgress(false);
					return;
				}

				setIsInRest(true);
				setTimeRemaining(restTime - 1);
			} else {
				// start next round
				setIsInRest(false);
				setCurrentRound(round => round + 1);
				setTimeRemaining(roundTime - 1);
			}
		};

		const id = setInterval(tick, 1000);

		return () => clearInterval(id);
	}, [timeRemaining, isInProgress, roundTime, isInRest, restTime, currentRound, roundEndWarning]);

	/**
	 * start
	 *
	 * @returns {void}
	 */
	const start = () => {
		setTimeRemaining(restTime - 1);
		setIsInProgress(true);
		setIsInRest(true);
	};

	/**
	 * reset
	 *
	 * @returns {void}
	 */
	const reset = () => {
		setRounds(12);
		setCurrentRound(1);
		setRoundTime(180);
		setRestTime(60);
		setRoundEndWarning(10);
		setIsInProgress(false);
	};

	// exports
	const timerContext = {
		rounds,
		setRounds,
		currentRound,
		roundTime,
		setRoundTime,
		restTime,
		setRestTime,
		roundEndWarning,
		setRoundEndWarning,
		isInProgress,
		isInRest,
		timeRemaining,
		start,
		reset,
	};

	return <TimerContext.Provider value={timerContext}>{children}</TimerContext.Provider>;
};

Provider.propTypes = {
	children: PropTypes.any,
};

export const { Consumer } = TimerContext;
