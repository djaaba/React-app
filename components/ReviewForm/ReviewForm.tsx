import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>()
	const [isSuccess, setIsSuccess] = useState<Boolean>(false);
	const [isErorr, setIsError] = useState<string>();

	const onSubmit = async(formData: IReviewForm) => {
		try{
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
			if(data.message){
				setIsSuccess(true);
				reset();
			} else{
				setIsError('Что-то пошло не так');
			}
		}catch(err: any){
			setIsError(err.message);
		}
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input 
					{...register('name', { required: {value: true, message: 'Заполните имя'}})} 
					placeholder='Имя' 
					error={errors.name}
				/>
				<Input 
					{...register('title', { required: {value: true, message: 'Заполните заголовок'}})} 
					placeholder='Заголовок отзыва' 
					error={errors.title}
					className={styles.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: {value: true, message: 'Укажите рейтинг'}}}
						render={({ field }) => (
							<Rating 
								isEditable 
								rating={field.value}
								ref={field.ref} 
								error={errors.rating}
								setRating={field.onChange}
							/>
						)}
					/>
				</div>
				<TextArea 
					{...register('description', { required: {value: true, message: 'Заполните отзыв'}})}
					placeholder='Текст отзыва' 
					className={styles.description} 
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
			</div>}
			{isErorr && <div className={cn(styles.error, styles.panel)}>
				<div>Что-то пошло не так, попробуйте перезагрузить страницу.</div>
				{isErorr}
				<CloseIcon className={styles.close} onClick={() => setIsError(undefined)}/>
			</div>}
		</form>
	);
};