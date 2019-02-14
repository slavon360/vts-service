import React from 'react';
import IconBase from 'react-icon-base';
import PropTypes from 'prop-types';

const AngleDown = ({ color = '#fff', ...props }) => (
    <IconBase viewBox="0 0 486.569 486.569" { ...props }>
        <g>
			<path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782     c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296     c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"/>
		</g>
    </IconBase>
);

export default AngleDown;

AngleDown.propTypes = {
    color: PropTypes.string
}