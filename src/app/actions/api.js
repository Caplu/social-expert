import { action } from '../utils/createAction';
import { LOGIN, LOGOUT, FEED, FEED_REMOVE, MARK } from '../constants/ActionTypes';

export const login = {
  request: (host) => action(LOGIN.REQUEST)({ host }),
  success: (payload) => action(LOGIN.SUCCESS)({ payload }),
  error: (error) => action(LOGIN.ERROR)({ error })
};

export const logout = action(LOGOUT);

export const removeFromFeed = (payload) => action(FEED_REMOVE)(payload);

export const fetchFeed = {
  request: (host) => action(FEED.REQUEST)({ host }),
  success: (payload) => action(FEED.SUCCESS)({ payload }),
  error: (error) => action(FEED.ERROR)({ error })
};

export const markAsRead = {
  request: (id, owner, target) => action(MARK.REQUEST)({ id, owner, target }),
  success: (payload) => action(MARK.SUCCESS)({ payload }),
  error: (error) => action(MARK.ERROR)({ error })
};