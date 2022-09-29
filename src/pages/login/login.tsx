import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/slices/login';
import { Input } from '../../components/input/input';
import { AppDispatch } from 'src/store';
import styles from './login.css';

export const Login: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRegister({ name, email }))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form onSubmit={onSubmit}>
          <h1 className={styles['modal__header']}>Login</h1>
          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={useCallback((event: ChangeEvent<HTMLInputElement>) => setName(event.target.value), [])}
            required
            className={styles['modal__input']}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), [])}
            required
            className={styles['modal__input']}
          />
          <button className={styles['modal__confirm-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};
