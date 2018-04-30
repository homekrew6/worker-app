
const INITIAL_STATE = { loading: false };

export default function RouterOwn (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'routeChange':
      return { currentRoute: action.currentRoute, prevRoute: action.prevRoute}
      break;
    default:
      return { loading: false };
  }
}
