const INITIAL_STATE = { loading: false };

export default function WeekData (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'dataChange':
      return { ...state, dataManu: action.dataManu };
      break;
    default:
      return { loading: false };
  }
};
