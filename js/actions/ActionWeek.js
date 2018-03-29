export function ChangeData(dataRemote){
  return(dispatch => {
    dispatch({ type: 'dataChange', dataManu : dataRemote });
  });

}
