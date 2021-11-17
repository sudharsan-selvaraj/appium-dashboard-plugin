import { all, takeEvery } from "redux-saga/effects";

export default function* PollingSaga() {
  yield all([
    takeEvery()
  ]);
};