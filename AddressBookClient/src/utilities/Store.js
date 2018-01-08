import { createStore, applyMiddleware  } from 'redux'; 
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from './Reducers'; 

const config = {
	key: 'root',
	storage,
	debug: true
};

const reducer = persistReducer(config, reducers);

export const configureStore = () => {
	const store = createStore(reducer, applyMiddleware(thunk));
	const persistor = persistStore(store,null,()=>{store.getState()});
  
	return { persistor, store };
};