import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const getStudents = students => ({ type: GET_STUDENTS, students });
export const createStudent = student => ({ type: CREATE_STUDENT, student });
export const removeStudent = id => ({ type: REMOVE_STUDENT, id });
export const updateStudent = student => ({type: UPDATE_STUDENT, student});

export function fetchStudents() {
  return function thunk(dispatch) {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  };
}
export function postStudent(student) {
  return function thunk(dispatch) {
    axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(createStudent(newStudent));
      });
  };
}
export function deleteStudent(id) {
  return function thunk(dispatch) {
    dispatch(removeStudent(id));
    axios.delete(`/api/students/${id}`)
      .catch(err => console.error(`Removing student: ${id} unsuccessful`, err));
  };
}
export function putStudent(id, student){
  return function thunk(dispatch){
    axios.put(`/api/students/${id}`, student)
    .then(res => {dispatch(updateStudent(res.data));})
    .catch(err => console.error(`Updating student: ${student} unsuccessful`, err));

  };
}
export default function studentsReducer(state = [], action) {

  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.id);
    case UPDATE_STUDENT:
      return state.map(student => (
        action.student.Student.id === student.id ? action.student.Student : student
      ));
    default: return state;
  }
}

