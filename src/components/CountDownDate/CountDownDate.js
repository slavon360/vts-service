import React, { Component } from 'react';

import styles from './CountDownDate.module.scss';

class CountDownDate extends Component {
    state = {
        timeCountdown: { },
        intervalInstance: null
    }
    UNSAFE_componentWillMount() {
        const { endDate } = this.props;

        if (endDate) {
            this.countdown(endDate);
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalInstance);
    }
    countdown = (endDate) => {
        let days, hours, minutes, seconds;
  
        const parsedEndDate = new Date(endDate).getTime();
        if (isNaN(parsedEndDate)) {
            return;
        }
        
        const calculate = () => {
            let startDate = new Date().getTime();
            
            let timeRemaining = parseInt((parsedEndDate - startDate) / 1000);
            
            if (timeRemaining >= 0) {
                days = parseInt(timeRemaining / 86400);
                timeRemaining = (timeRemaining % 86400);
                
                hours = parseInt(timeRemaining / 3600);
                timeRemaining = (timeRemaining % 3600);
                
                minutes = parseInt(timeRemaining / 60);
                timeRemaining = (timeRemaining % 60);
                
                seconds = parseInt(timeRemaining);

                this.setState({ timeCountdown: {
                    days,
                    hours,
                    minutes,
                    seconds
                }});            
            } else {
                return false;
            }
        };

        const intervalInstance = setInterval(calculate, 1000);

        this.setState({ intervalInstance });
    }
    render () {
        const { timeCountdown: {
            days,
            hours,
            minutes,
            seconds
        }} = this.state;
        return (
            <div className={styles.CountDownDate}>
                <span className={styles.PromoTitle}>До конца осталось:</span>
                <div className={styles.PromoTimer}>
                    <span className={styles.PromoTimerDigit}>{ parseInt(days) || '0' }</span>
                    <span className={styles.PromoTimerWord}>дни</span>
                </div>
                <div className={styles.PromoTimer}>
                    <span className={styles.PromoTimerDigit}>{ hours < 10 ? "0" + hours : hours }</span>
                    <span className={styles.PromoTimerWord}>часы</span>
                </div>
                <div className={styles.PromoTimer}>
                    <span className={styles.PromoTimerDigit}>{ minutes < 10 ? "0" + minutes : minutes }</span>
                    <span className={styles.PromoTimerWord}>мин</span>
                </div>
                <div className={styles.PromoTimer}>
                    <span className={styles.PromoTimerDigit}>{ seconds < 10 ? "0" + seconds : seconds }</span>
                    <span className={styles.PromoTimerWord}>сек</span>
                </div>
            </div>
        );
    }
};

export default CountDownDate;