import { HhDataProps } from './HhData.props';
import styles from './hhData.module.css';
import cn from 'classnames';
import React from 'react';
import StarIcon from './star.svg';
import { Card } from '../Card/Card';
import { priceRu } from '../../helpers/helpers';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего вакансий</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles.salaryValue}>{ juniorSalary? priceRu(juniorSalary): "Нет цены"}</div>
					<div className={styles.rate}>
						<StarIcon className={styles.filled} />
						<StarIcon />
						<StarIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles.salaryValue}>{middleSalary? priceRu(middleSalary): "Нет цены"}</div>
					<div className={styles.rate}>
						<StarIcon className={styles.filled} />
						<StarIcon className={styles.filled} />
						<StarIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.salaryValue}>{seniorSalary? priceRu(seniorSalary): "Нет цены"}</div>
					<div className={styles.rate}>
						<StarIcon className={styles.filled} />
						<StarIcon className={styles.filled} />
						<StarIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	);
};