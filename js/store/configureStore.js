import {compose, createStore , applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'


const store = createStore(
	rootReducer,
	undefined,
	compose(
		//applyMiddleware(thunk)
		applyMiddleware(thunk),
		//autoRehydrate()
	)
)

//persistStore(store);
export const purge=()=>{

	persistStore(store).purge()
}
const configureStore = ()=>{
	return store
}
export default configureStore
