import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { PropertiesTab, ReviewsTab } from './components';

import styles from './Properties.module.scss';

class Properties extends Component {
	state = {
		tabs: {
			reviews_tab: false,
			properties_tab: true
		},
		upd_properties: null
	};

	moveDescriptionToEnd = properties => {
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
	};

	componentDidMount() {
		const upd_properties = this.moveDescriptionToEnd(this.props.properties);

		this.setState({ upd_properties });
	};

	setActivePropertiesTab = () => {
		this.setState({ tabs: { reviews_tab: false, properties_tab: true }});
	};

	setActiveReviewsTab = () => {
		this.setState({ tabs: { reviews_tab: true, properties_tab: false }});
	}

	render () {
		const { sizes, reviews = [] } = this.props;
		const { tabs: { properties_tab, reviews_tab }, upd_properties } = this.state;

		return (
			upd_properties && upd_properties.length ?
				(<div className={styles.Properties}>
					<div className={styles.Tabs}>
						<div
							className={cx(styles.Tab, { [styles.ActiveTab]: properties_tab })}
							onClick={this.setActivePropertiesTab}
						>
							Характеристики
						</div>
						<div
							className={cx(styles.Tab, { [styles.ActiveTab]: reviews_tab })}
							onClick={this.setActiveReviewsTab}
						>
							Отзывы
						</div>
					</div>
					<div className={styles.PropertiesContent}>
						{ properties_tab ?
							<PropertiesTab properties={upd_properties} sizes={sizes} /> :
							<ReviewsTab reviews={reviews} />
						}
					</div>
				</div>) :
				null
		)
	}
}

export default Properties;

Properties.propTypes = {
	properties: PropTypes.array
}

Properties.defaultProps = {
	properties: []
}