import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchAllPostList } from '../../store/slices/postList';
import { Input } from '../../components/input/input';
import { PostCard } from './components/post-card/post-card';
import { UserCard } from './components/user-card/user-card';
import styles from './posts.css';
import { Loader } from '../../components/loader/loader';
import classNames from 'classnames';
import { getFilteredPostList, getFilteredUserList, getSordedPostList } from '../../utils';

export const Posts = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const postListByUserId = useSelector((state: RootState) => state.posts.postListByUserId);
  const userList = useSelector((state: RootState) => state.posts.userList);

  const { userId } = useParams();

  const [sortState, setSortState] = useState<'ascending' | 'descending'>('ascending');

  const [userFilterValue, setUserFilterValue] = useState('');
  const [messageFilterValue, setMessageFilterValue] = useState('');

  useEffect(() => {
    dispatch(fetchAllPostList())
      .unwrap()
      .catch(() => {
        navigate('/login');
      });
  }, []);

  const onAscendingButtonClick = useCallback(() => setSortState('ascending'), []);
  const onDescendingButtonClick = useCallback(() => setSortState('descending'), []);

  const onUserFilterValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setUserFilterValue(event.target.value),
    []
  );
  const onMessageFilterValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setMessageFilterValue(event.target.value),
    []
  );

  const filteredUserList = getFilteredUserList(userFilterValue, userList);

  const isAscending = useMemo(() => sortState === 'ascending', [sortState]);

  const postListInOpenedChat = userId && postListByUserId[userId] ? [...postListByUserId[userId].postList] : [];

  const sortedPostListInOpenedChat = getSordedPostList(postListInOpenedChat, isAscending);

  const filteredPostList = getFilteredPostList(messageFilterValue, sortedPostListInOpenedChat);

  if (!postListByUserId) {
    return (
      <div className={styles['loader-container']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles['sender-list']}>
        <Input
          id="senderNameFilter"
          className={styles['sender-list__filter']}
          type="text"
          value={userFilterValue}
          onChange={onUserFilterValueChange}
          placeholder="Search"
        />
        <div className={styles['sender-list__list']}>
          {filteredUserList.map(({ id, name }) => (
            <UserCard
              key={id}
              className={styles['sender-list__item-card']}
              id={id}
              name={name}
              postCount={postListByUserId[id].postList.length}
            />
          ))}
        </div>
      </div>
      <div className={styles['post-list']}>
        <div className={styles['post-list__settings']}>
          <div className={styles['post-list__sort-button-container']}>
            <div
              className={classNames(styles['post-list__sort-button'], styles['post-list__sort-button--ascending'])}
              onClick={onAscendingButtonClick}
            />
            <div
              className={classNames(styles['post-list__sort-button'], styles['post-list__sort-button--descending'])}
              onClick={onDescendingButtonClick}
            />
          </div>
          <Input
            id="messageFilter"
            className={styles['post-list__filter']}
            type="text"
            value={messageFilterValue}
            onChange={onMessageFilterValueChange}
            placeholder="Search"
          />
        </div>
        {filteredPostList.length > 0 && (
          <div className={styles['post-list__list']}>
            {filteredPostList.map(({ created_time, message }) => (
              <PostCard
                key={created_time}
                className={styles['post-list__post-card']}
                created_time={created_time}
                message={message}
              />
            ))}
          </div>
        )}
        {postListInOpenedChat.length === 0 && (
          <div className={styles['empty-container']}>Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};
