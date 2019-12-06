import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';

import { TimerContext } from '../../TimerContext';

import TimeRemaining from './TimeRemaining';
import SoundDispenser from '../SoundDispenser';
import Input from './Input';

const Round = styled.div`
	font-size: 36px;
	margin: 45px auto 40px;
	text-align: center;
`;

const StartButton = styled.div`
	background: #319031;
	border-radius: 6px;
	color: #fff;
	cursor: pointer;
	font-size: 24px;
	margin: 10px auto;
	padding: 10px 20px;
	text-align: center;
	width: 150px;

	${props =>
		props.isInProgress &&
		css`
			background: #b57602;
			color: #222;
		`}
`;

const Rounds = styled.div`
	margin: 20px auto;
	text-align: center;
`;

const Timer = () => {
	const [playSound, setPlaySound] = useState(null);
	const {
		timeRemaining,
		isInProgress,
		roundEndWarning,
		currentRound,
		rounds,
		setRounds,
		isInRest,
		start,
	} = useContext(TimerContext);

	useEffect(() => {
		if (timeRemaining === 0 && isInRest === true) {
			// play round start
			setPlaySound('bell');
		} else if (timeRemaining === roundEndWarning && isInProgress === true && isInRest === false) {
			// play round end warning
			setPlaySound('rest-end');
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
			<StartButton onClick={() => start()} isInProgress={isInProgress}>
				{isInProgress ? 'reset' : 'start'}
			</StartButton>
			<Rounds>
				<Input label={'Rounds'} value={rounds} onChange={target => setRounds(target.value)} />
			</Rounds>
		</div>
	);
};

Timer.propTypes = {};

export default Timer;
