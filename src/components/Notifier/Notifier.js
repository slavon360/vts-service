import React, { Component } from 'react';
import cx from 'classnames';
import WarningIcon from '../Icons/WarningIcon';

import styles from './Notifier.module.scss';

class Notifier extends Component {
	componentDidMount() {
		const { autoHide = 6000 } = this.props;
		console.log('didMount');
		setTimeout(this.hideHandler, autoHide);
	}

	componentWillUnmount() {
		clearTimeout(this.hideHandler);
		console.log('willunmount');
	}

	hideHandler = () => {
		this.props.onHide();
	};

	render() {
		const { errorMessage, successMessage } = this.props;

		return (
			<div className={cx(styles.NotifierWrp, {
				[styles.NotifierError]: errorMessage,
				[styles.NotifierSuccess]: successMessage
			})} onClick={this.hideHandler}>
				{errorMessage &&
					<div className={styles.Error}>
						<WarningIcon color="#a11" />
						<p className={styles.ErrorText}>
							{errorMessage}
						</p>
					</div>
				}
				{successMessage &&
					<p className={styles.SuccessText}>{successMessage}</p>
				}
			</div>);
	}
};

export default Notifier;