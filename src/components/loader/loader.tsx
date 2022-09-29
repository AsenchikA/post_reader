import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import styles from './loader.css';

interface ILoaderProps {
  className?: string;
}

export const Loader: FunctionComponent<ILoaderProps> = ({ className }) => (
  <div className={classNames(styles.loader, className)} />
);
