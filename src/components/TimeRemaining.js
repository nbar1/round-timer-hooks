import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

import { TimerContext } from '../TimerContext';

const TimeRemainingWrapper = styled.div`
	background: #000;
	border-radius: 200px;
	color: #fff;
	font-size: 72px;
	height: 400px;
	line-height: 400px;
	margin: 0 auto;
	text-align: center;
	width: 400px;

	${props =>
		props.isInProgress === true &&
		css`
			background: #008000;
		`}

	${props =>
		props.isInRest === true &&
		css`
			background: #ffa500;
		`}
`;

const TimeRemaining = () => {
	const { timeRemaining, isInProgress, isInRest } = useContext(TimerContext);

	return (
		<TimeRemainingWrapper isInProgress={isInProgress} isInRest={isInRest}>
			{moment.utc(timeRemaining * 1000).format('m:ss')}
		</TimeRemainingWrapper>
	);
};

TimeRemaining.propTypes = {};

export default TimeRemaining;
