import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TimerContext = React.createContext({});

export const Provider = ({ children }) => {
	const [rounds, setRounds] = useState(12);
	const [currentRound, setCurrentRound] = useState(1);
	const [roundTime, setRoundTime] = useState(180); // in seconds
	const [timeRemaining, setTimeRemaining] = useState(180); // in seconds
	const [restTime, setRestTime] = useState(60); // in seconds
	const [prepTime, setPrepTime] = useState(60); // in seconds
	const [roundEndWarning, setRoundEndWarning] = useState(10); // in seconds
	const [isInProgress, setIsInProgress] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	let tickInterval;

	/**
	 * tick
	 *
	 * @returns {void}
	 */
	const tick = () => {
		console.log(timeRemaining);

		let newTimeRemaining = timeRemaining;

		newTimeRemaining = newTimeRemaining === 0 ? roundTime : newTimeRemaining - 1;

		console.log('tick', newTimeRemaining);

		setTimeRemaining(newTimeRemaining);

		/**
		 * round movement cases
		 */
		if (newTimeRemaining === 0 && isInProgress === true && currentRound === rounds) {
			// end session
			setIsInProgress(false);
			setTimeRemaining(0);
			console.log('session ended');
		} else if (newTimeRemaining === 0 && isInProgress === true && currentRound < rounds) {
			// end current round
			setIsInProgress(false);
			setTimeRemaining(restTime);
			console.log('round ended');
		} else if (newTimeRemaining === 0 && isInProgress === false && currentRound < rounds) {
			// continue to next round
			setIsInProgress(true);
			setTimeRemaining(roundTime);
			console.log('round started');
		}

		/**
		 * tick cases
		 */
		if (newTimeRemaining === roundEndWarning) {
			// round end warning
			console.log('round ending soon');
		}
	};

	/**
	 * start
	 *
	 * @returns {void}
	 */
	const start = () => {
		setTimeRemaining(roundTime);
		setIsInProgress(true);

		tickInterval = setInterval(tick, 1000);
	};

	/**
	 * stop
	 *
	 * @returns {void}
	 */
	const stop = () => {
		clearInterval(tickInterval);
		reset();
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
		setPrepTime(60);
		setRoundEndWarning(10);
		setIsInProgress(false);
		setIsPaused(false);
	};

	// exports
	const timerContext = {
		rounds,
		setRounds,
		currentRound,
		setCurrentRound,
		roundTime,
		setRoundTime,
		restTime,
		setRestTime,
		prepTime,
		setPrepTime,
		roundEndWarning,
		setRoundEndWarning,
		isInProgress,
		setIsInProgress,
		isPaused,
		setIsPaused,
		timeRemaining,
		start,
		stop,
		reset,
	};

	return <TimerContext.Provider value={timerContext}>{children}</TimerContext.Provider>;
};

Provider.propTypes = {
	children: PropTypes.any,
};

export const { Consumer } = TimerContext;
