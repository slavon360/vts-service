import React from 'react';
import IconBase from 'react-icon-base';
import PropTypes from 'prop-types';

const CheckIcon = ({ color = '#fff', ...props }) => (
    <IconBase viewBox="0 0 512 512" { ...props }>
        <path style={{fill: '#A5EB78'}} d="M433.139,67.108L201.294,298.953c-6.249,6.249-16.381,6.249-22.63,0L78.861,199.15L0,278.011  l150.547,150.549c10.458,10.458,24.642,16.333,39.431,16.333l0,0c14.788,0,28.973-5.876,39.43-16.333L512,145.968L433.139,67.108z"/>
        <g style={{opacity: 0.1}}>
	        <path d="M485.921,119.888L187.59,418.22c-8.254,8.253-18.633,13.882-29.847,16.391c9.363,6.635,20.608,10.28,32.235,10.28l0,0   c14.788,0,28.973-5.876,39.43-16.333L512,145.966L485.921,119.888z"/>
        </g>
    </IconBase>
);

export default CheckIcon;

CheckIcon.propTypes = {
    color: PropTypes.string
}