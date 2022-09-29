import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './input.css';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
}

export const Input: FC<IInputProps> = (props) => {
  const { className, label, id, ...restProps } = props;
  return (
    <div className={classNames(styles.container, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className={styles.input} {...restProps} />
    </div>
  );
};
