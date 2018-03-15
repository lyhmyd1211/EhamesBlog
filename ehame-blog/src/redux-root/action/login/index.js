import { LOGIN_STATE, LOGIN_STATE_ERROR } from '../action-type';
import { get } from '../../../fetchData';

const loginStateAction = (n) => ({
  type: LOGIN_STATE,
  payload: n,
});
const loginStateError = ()=>({
  type:LOGIN_STATE_ERROR,
});

export const fetchLoginState = ()=>async (dispatch,getState)=>{
  try {
    await get('/users/isLogin', data => {
      dispatch(loginStateAction(data));
    });
  } catch (error) {
    dispatch(loginStateError());
  }
};

