
const INITIAL_STATE = { loading: false };

export default function CheckBox (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'none':
      return { loading: true}
      break;
    default:
      return { loading: false };
  }
}
