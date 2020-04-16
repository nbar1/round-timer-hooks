import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrapper = styled.div`
	background: #000;
	border-radius: 4px;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	color: #fff;
	display: inline-block;
	height: 50px;
	margin: 15px 0;
	position: relative;
	width: ${props => props.width};
`;

const Label = styled.div`
	color: #fff;
	font-size: 16px;
	left: 15px;
	line-height: 50px;
	position: absolute;
	text-transform: uppercase;
`;

const StyledInput = styled.input`
	background: transparent;
	border: none;
	box-sizing: border-box;
	color: #fff;
	direction: rtl;
	font-size: 16px;
	height: 50px;
	left: 0;
	padding: 0 15px;
	position: absolute;
	top: 0;
	width: 100%;

	:focus {
		outline: none;
	}
`;

const Input = ({ label, value = '', onChange, width = '225px' }) => {
	const [hasFocusOrContent, setHasFocusOrContent] = useState(false);
	const inputRef = useRef();

	// set initial value
	useEffect(() => {
		setHasFocusOrContent(value !== '');
	}, [value]);

	return (
		<InputWrapper width={width}>
			<Label hasFocusOrContent={hasFocusOrContent}>{label}</Label>
			<StyledInput
				type={'text'}
				value={value}
				ref={inputRef}
				onFocus={() => setHasFocusOrContent(true)}
				onBlur={() => setHasFocusOrContent(value === '' ? false : true)}
				onChange={event => onChange(inputRef.current, event)}
				hasFocusOrContent={hasFocusOrContent}
				aria-label={label}
			/>
		</InputWrapper>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	width: PropTypes.string,
};

export default Input;
