import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import campusEntry from './campusEntry';
import student from './studentEntry';

const reducer = combineReducers({
  campuses, students, campusEntry, student
});

export default reducer;
export * from './campuses';
export * from './students';
export * from './studentEntry';
export * from './campusEntry';
