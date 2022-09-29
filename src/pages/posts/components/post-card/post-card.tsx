import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { IShortPostModel } from '../../../../types';
import styles from './post-card.css';

interface IPostCardProps extends IShortPostModel {
  className?: string;
}

export const PostCard: FunctionComponent<IPostCardProps> = ({ className, created_time, message }) => {
  const postDate = new Date(created_time);

  return (
    <div className={classNames(styles['post-card'], className)}>
      <div className={styles['post-card__date']}>{postDate.toUTCString()}</div>
      <div className={styles['post-card__message']}>{message}</div>
    </div>
  );
};
