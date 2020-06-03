import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import CheckIcon from '../../../../../Icons/CheckIcon';

import styles from './Properties.module.scss';

const moveDescriptionToEnd = properties => {
	let descr_item;
	
	const upd_properties = properties.reduce((result, current, index) => {
		if (current[0] !== 'Описание') {
			result.push(current);
		} else {
			descr_item = properties.splice(index, 1);
		}
		return result;
	}, []);

	upd_properties.push(...descr_item);

	return upd_properties;
}

const Properties = ({ properties, sizes }) => {
	const upd_properties = moveDescriptionToEnd(properties);

	return (
		<div className={styles.Properties}>
			<div className={styles.Head}>Характеристики</div>
			<div className={styles.PropertiesContent}>
				{upd_properties.map(item => {
					if (sizes[item[0]] === item[1]) return null;
					return item[1] ? (
						<div
							key={item[0]}
							className={cx(styles.KeyValueWrp, { [styles.Description]: item[0] === 'Описание' })}
						>
							<div className={styles.Key}>{item[0]}</div>
							{item[0] === 'Описание' ?
								<div className={styles.Value} dangerouslySetInnerHTML={{ __html: item[1] }}></div> :
								<div className={styles.Value}>{ item[1] === true ? <CheckIcon /> : item[1]}</div>
							}
						</div>
						) : null
					}
				)}
			</div>
		</div>
	);
}

export default Properties;

Properties.propTypes = {
	properties: PropTypes.array
}

Properties.defaultProps = {
	properties: []
}