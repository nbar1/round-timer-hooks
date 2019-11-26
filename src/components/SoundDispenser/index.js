import React from 'react';
import PropTypes from 'prop-types';

const SoundDispenser = ({ sound }) => {
	if (sound === null) return null;

	let soundFile = `./assets/${sound}.mp3`;

	return <audio src={soundFile} autoPlay />;
};

SoundDispenser.propTypes = {
	sound: PropTypes.string,
};

export default SoundDispenser;
