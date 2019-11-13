import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as TimerProver } from './TimerContext';

import App from './App';

ReactDOM.render(
	<TimerProver>
		<App />
	</TimerProver>,
	document.getElementById('root')
);
