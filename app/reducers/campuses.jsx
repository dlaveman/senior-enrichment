import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const getCampuses = campuses => ({ type: GET_CAMPUSES, campuses });
export const createCampus = campus => ({ type: CREATE_CAMPUS, campus });
export const removeCampus = id => ({ type: REMOVE_CAMPUS, id });
export const updateCampus = campus => ({ type: UPDATE_CAMPUS, campus });

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  };
}
export function postCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(createCampus(newCampus));
      });
  };
}
export function deleteCampus(id) {
  return function thunk(dispatch) {
    dispatch(removeCampus(id));
    axios.delete(`/api/campuses/${id}`)
      .catch(err => console.error(`Removing campus: ${id} unsuccessful`, err));
  };
}
export function putCampus(id, campus) {
  return function thunk(dispatch) {
    axios.put(`/api/campuses/${id}`, campus)
      .then(res => { dispatch(updateCampus(res.data)); })
      .catch(err => console.error(`Updating campus: ${campus} unsuccessful`, err));
  };
}
export default function campusesReducer(state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...state, action.campus];
    case REMOVE_CAMPUS:
      return state.filter(campus => campus.id !== action.id);
    case UPDATE_CAMPUS:
      console.log(action.campus);
      return state.map(campus => (
        action.campus.Campus.id === campus.id ? action.campus.Campus : campus
      ));
    default: return state;
  }
}

