const WRITE_CAMPUS = 'WRITE_CAMPUS';

export const writeCampus = campus => ({type: WRITE_CAMPUS, campus});

export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_CAMPUS:
      return action.campus;

    default:
      return state;
  }

}
