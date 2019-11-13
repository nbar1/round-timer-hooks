import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const AppWrapper = styled.div`
	box-sizing: border-box;
	height: 100%;
`;

const GlobalStyle = createGlobalStyle`
	html,
	body {
		font-family: Arial, Helvetica, sans-serif;
		margin: 0;
		min-height: 100%;
		padding: 0;
	}
`;

function App() {
	return (
		<AppWrapper>
			app
			<GlobalStyle />
		</AppWrapper>
	);
}

export default App;
