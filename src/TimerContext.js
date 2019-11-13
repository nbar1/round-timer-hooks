import React from 'react';
import PropTypes from 'prop-types';

export const TimerContext = React.createContext({});

export const Provider = ({ children }) => {
	// exports
	const timerContext = {};

	return <TimerContext.Provider value={timerContext}>{children}</TimerContext.Provider>;
};

Provider.propTypes = {
	children: PropTypes.any,
};

export const { Consumer } = TimerContext;
