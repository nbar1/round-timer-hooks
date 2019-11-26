import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { TimerContext } from '../TimerContext';

import TimeRemaining from './TimeRemaining';
import SoundDispenser from './SoundDispenser';

const Timer = () => {
	const [playSound, setPlaySound] = useState(null);
	const { timeRemaining, roundTime, isInProgress, roundEndWarning, currentRound, isInRest, start } = useContext(
		TimerContext
	);

	useEffect(() => {
		if (timeRemaining === roundTime - 1 && isInProgress === true) {
			// play round start
			setPlaySound('bell');
		} else if (timeRemaining === roundEndWarning && isInProgress === true && isInRest === false) {
			// play slap sticks
			setPlaySound('stick');
		} else if (timeRemaining === 0 && isInProgress === true && isInRest === false) {
			// play round end
			setPlaySound('bell');
		} else if (timeRemaining === 10 && isInRest === true) {
			// play rest end
			setPlaySound('rest-end');
		}
	}, [timeRemaining]);

	return (
		<div>
			<button onClick={() => start()}>start</button>
			<div>round: {currentRound}</div>
			<div>time remaining: {moment.utc(timeRemaining * 1000).format('m:ss')}</div>
			<TimeRemaining />
			<SoundDispenser sound={playSound} />
			<div>is in progress: {isInProgress.toString()}</div>
			<div>is in rest: {isInRest.toString()}</div>
		</div>
	);
};

Timer.propTypes = {};

export default Timer;
