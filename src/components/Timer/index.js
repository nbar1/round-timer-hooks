import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { TimerContext } from '../../TimerContext';

import TimeRemaining from './TimeRemaining';
import SoundDispenser from '../SoundDispenser';

const Round = styled.div`
	font-size: 36px;
	margin: 40px auto;
	text-align: center;
`;

const StartButton = styled.div`
	background: green;
	color: #fff;
	cursor: pointer;
	font-size: 24px;
	margin: 10px auto;
	padding: 10px 20px;
	text-align: center;
	width: 150px;
`;

const Rounds = styled.div`
	margin: 20px auto;
	text-align: center;
`;

const Timer = () => {
	const [playSound, setPlaySound] = useState(null);
	const {
		timeRemaining,
		roundTime,
		isInProgress,
		roundEndWarning,
		currentRound,
		rounds,
		setRounds,
		isInRest,
		start,
	} = useContext(TimerContext);

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
			<TimeRemaining />
			<SoundDispenser sound={playSound} />
			<Round>{currentRound === 0 ? 'Preparation' : `${currentRound} / ${rounds}`}</Round>
			<StartButton onClick={() => start()}>start</StartButton>
			<Rounds>
				Rounds: <input value={rounds} onChange={e => setRounds(e.target.value)} />
			</Rounds>
		</div>
	);
};

Timer.propTypes = {};

export default Timer;
