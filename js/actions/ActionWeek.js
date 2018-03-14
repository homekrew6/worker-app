export function ChangeData(dataRemote){
  console.log('dataRemote', dataRemote);
  return(dispatch => {
    dispatch({ type: 'dataChange', dataManu : dataRemote });
  });

}
