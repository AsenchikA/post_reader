import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { IUserModel } from 'src/types';
import styles from './user-card.css';

interface IUserCardProps extends IUserModel {
  postCount: number;
  className?: string;
}

export const UserCard: FunctionComponent<IUserCardProps> = ({ id, name, postCount, className }) => {
  return (
    <Link className={className} to={`/${id}`}>
      <div className={styles['user-card']} key={id}>
        <span>{name}</span>
        <div className={styles['user-card__post-count']}>{postCount}</div>
      </div>
    </Link>
  );
};
