import React from 'react';

interface IActions {
  type: string;
  offsetCnt: number;
}

interface IState {
  offsetCnt: number;
}

interface IPaginationContext {
  paginationState: IState;
  paginationDispatch: React.Dispatch<IActions>;
}

export const paginationInitialState = {
  offsetCnt: 0,
};

export const paginationReducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        offsetCnt: action.offsetCnt,
      };
    default:
      return state;
  }
};

export const PaginationDispatch = React.createContext<IPaginationContext>({
  paginationState: paginationInitialState,
  paginationDispatch: () => {},
});
