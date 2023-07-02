import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, LOGOUT_USER, SHOW_MESSAGE, UPDATING_CONTENT } from "../../config/shared/action.type";

type Dispatcher = (arg0: { type: string; payload?: any; }) => any;

export const onFetchStart =()=> {
  return (dispatch: Dispatcher)=>{
    dispatch({type: FETCH_START})
  }
}
export const onFetchError =()=> {
  return (dispatch: Dispatcher)=>{
    dispatch({type: FETCH_ERROR})
  }
}
export const onFetchSuccess =()=> {
  return (dispatch: Dispatcher)=>{
    dispatch({type: FETCH_SUCCESS})
  }
}

export const updatingContent = () => {
  return (dispatch: Dispatcher) => dispatch({type: UPDATING_CONTENT});
};


export const showMessage = (message: any) => {
  return (dispatch: (arg0: { type: string; payload: any }) => any) => dispatch({type: SHOW_MESSAGE, payload: message});
};

export const hideMessage = () => {
  return (dispatch: any) => dispatch({type: HIDE_MESSAGE});
};