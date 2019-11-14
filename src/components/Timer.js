import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TimerContext } from '../TimerContext';

const Timer = () => {
	const timerContext = useContext(TimerContext);

	return (
		<div>
			<button onClick={() => timerContext.start()}>start</button>
			<div>round: {timerContext.currentRound}</div>
			<div>time remaining: {timerContext.timeRemaining}</div>
			<div>is in progress: {timerContext.isInProgress.toString()}</div>
			<div>is in rest: {timerContext.isInRest.toString()}</div>
		</div>
	);
};

Timer.propTypes = {};

export default Timer;
