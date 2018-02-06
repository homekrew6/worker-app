import {compose, createStore , applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'


const store = createStore(
	rootReducer,
	undefined,
	compose(
		//applyMiddleware(thunk)
		applyMiddleware(thunk,logger),
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
