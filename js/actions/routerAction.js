export function ChangeRoute(prevState, newState){
    return(dispatch => {
      let lastRoute = Number(newState.routes.length) - 1;
      let prevRoute;
      if(newState.routes.length == 1){
        prevRoute = "";
      }else{
        prevRoute = newState.routes[Number(newState.routes.length) - 2].routeName;
      }
      dispatch({
        type: 'routeChange',
        currentRoute: newState.routes[lastRoute].routeName,
        prevRoute: prevRoute
      });
    });
  
  }
  