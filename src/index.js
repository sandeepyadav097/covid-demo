import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import rootReducers from "./reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import Main from "./components/main.jsx";
import _ from 'lodash';
import "./main.css"
import 'antd/dist/antd.css';
import registerServiceWorker from "./serviceWorkerRegistration";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];




// create a redux store witxh our reducer above and middleware

const store = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)(rootReducers)

sagaMiddleware.run(rootSaga);
const App = () => {
  return <Main/>
};


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);

registerServiceWorker()