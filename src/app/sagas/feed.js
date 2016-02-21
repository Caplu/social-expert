import { call, put } from 'redux-saga/effects';
import { arrayOf, normalize } from 'normalizr';
import { post } from '../constants/schemas';
import * as api from '../api';
import { assignEntity } from '../api/github';
import { fetchFeed } from '../actions/api';
import { updateTrayIcon, showNotification } from '../services/electron';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* setReloadTimeout() {
  yield delay(60000);
  yield put(fetchFeed.request());
}

export function* onFetchFeed(getToken, { host = 'github', participating }) {
  try {
    let feed = yield call(api.fetchFeed, host, getToken(host), { participating });
    feed = normalize(feed, arrayOf(post), { assignEntity });
    const count = feed.result.length;
    updateTrayIcon(count);
    yield put(fetchFeed.success({ [host]: feed }));
  } catch (error) {
    console.error(error);
    yield put(fetchFeed.error(error));
  }
}