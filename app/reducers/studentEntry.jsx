const WRITE_STUDENT = 'WRITE_STUDENT';

export const writeStudent = student => ({type: WRITE_STUDENT, student});

export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_STUDENT:
      return action.student;

    default:
      return state;
  }

}
