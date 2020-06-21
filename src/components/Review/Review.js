import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import cx from 'classnames';
import Button from '../UI/Button';
import Input from '../UI/Input';
import StarIcon from '../Icons/StarIcon';

import styles from './Review.module.scss';

class Review extends Component{
	state = {
		rating: 5,
		stars: [1, 2, 3, 4, 5]
	};

	renderField = ({ label, input, meta: { error, touched }, type, placeholder }) => {
		return (
			<div className={styles.InputWrp}>
				{/* <label>{label}</label> */}
				{touched && error &&
				<div className={styles.Error}>{error}</div>}
				<Input
					{...input}
					placeholder={placeholder}
					type={type}
					clsName={styles.InputContent}
				/>
			</div>
		  );
	};

	renderTextareaField = ({ label, input, meta: { error, touched }, type, placeholder }) => {
		return (
			<div className={styles.TeaxtareaWrp}>
				{/* <label>{label}</label> */}
				{touched && error &&
				<div className={styles.Error}>{error}</div>}
				<textarea
					{...input}
					placeholder={placeholder}
					className={styles.Textarea}
				></textarea>
			</div>
		  );
	};

	makeSubmit = ({
		pros = '',
		cons = '',
		name = '',
		email = '',
		comment = ''
	}) => {
		const required = 'Поле обязательно к заполнению';
		let error = {};
		let isError = false;

		if (name.trim() === '') {
			error.name = required;
			isError = true;
		}

		if (comment.trim() === '') {
			error.comment = required;
			isError = true;
		}

		if (isError) {
			throw new SubmissionError(error);
		}

		return this.props.makeReview({
			pros,
			cons,
			name,
			email,
			comment,
			rating: this.state.rating,
			product_id: this.props.product_id
		});
	};

	presetRating = (rating) => {
		return () => {
			this.setState({ rating });
		}
	}

	renderContent = () => {
		const { stars, rating } = this.state;

		return (
			<div className={styles.Review}>
				<form
					className={styles.Form}
					onSubmit={this.props.handleSubmit(this.makeSubmit)}
				>
					<div className={styles.StarsWrp}>
						<p>Моя оценка:</p>
						<ul className={styles.RatingStars}>
							{ stars.map(n => {
								const currentNumber = 6 - n;
									return (
										<li
											key={n}
											className={cx(styles.Star, {[styles.Active]: currentNumber === rating})}
											style={{ order: currentNumber }}
											onClick={this.presetRating(currentNumber)}
										>
											<StarIcon />
										</li>
									);
								})
							}
						</ul>
					</div>
					<Field
						name="pros"
						placeholder="Достоинства"
						// label={<MailIcon color="#547a86" />}
						component={this.renderField}
						type="text"
					/>
					<Field
						name="cons"
						placeholder="Недостатки"
						// label={<MailIcon color="#547a86" />}
						component={this.renderField}
						type="text"
					/>
					<div className={styles.NameEmailWrp}>
						<Field
							name="name"
							placeholder="Имя"
							// label={<MailIcon color="#547a86" />}
							component={this.renderField}
							type="text"
						/>
						<Field
							name="email"
							placeholder="Email"
							// label={<MailIcon color="#547a86" />}
							component={this.renderField}
							type="email"
						/>
					</div>
					<Field
						name="comment"
						placeholder="Комментарий"
						// label={<LockIcon color="#547a86" />}
						component={this.renderTextareaField}
					/>
					<Button
						clsName={styles.SubmitButton}
						type="submit"
					>
						Отправить
					</Button>
					<Button
						clsName={styles.CancelButton}
						type="button"
						onClick={this.props.hideReviewForm}
					>
						Отмена
					</Button>
				</form>
			</div>
		);
	}

	render() {
		return this.renderContent();
	}
} 

  Review = reduxForm({
  // a unique name for the form
  form: 'Review'
})(Review)

export default Review