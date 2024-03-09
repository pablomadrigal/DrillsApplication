/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../../types/User';

export interface userSliceStateInterface  {
  currentUser?: UserInterface;
  userList: UserInterface[];
} 

const initialState: userSliceStateInterface = {
  currentUser: undefined,
  userList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: () => initialState,
    setName: (state, { payload }) => {
      if(state.currentUser){ 
        state.currentUser.name = payload;
      } else {
        state.currentUser = { name: payload, lastName: '', email: '' } as UserInterface;
      }
    },
    setLastName: (state, { payload }) => {
      if(state.currentUser) {
        state.currentUser.lastName = payload;
      } else {
        state.currentUser = { lastName: payload, name: '', email: '' } as UserInterface;
      }
    },
    setEmail: (state, { payload }) => {
      if(state.currentUser) {
        state.currentUser.email = payload;
      } else {
        state.currentUser = { email: payload, lastName: '', name: '' } as UserInterface;
      }
    },
    setUser: (state, { payload }) => {
      if(state.currentUser) {
        if(payload){
          state.userList = [...state.userList.filter(user => user.id !== payload), state.currentUser]
        } else {
          state.userList = [...state.userList, {...state.currentUser, id: self.crypto.randomUUID()}]
        }
        state.currentUser = undefined;
      }
    },
    deleteUser: (state, { payload }) => {
      state.userList = state.userList.filter(user => user.id !== payload);
    },
    resetCurrentUser: (state) => {
      state.currentUser = undefined;
    },
    loadUser: (state, { payload }) => {
      state.currentUser = state.userList.find(user => user.id === payload)
    },
  },
  selectors: {
    selectUserList: (state) => state.userList,
    selectUser: (state) => state.currentUser,
  },
});

export const {
  resetUsers,
  setName,
  setLastName,
  setEmail,
  setUser,
  resetCurrentUser,
  loadUser
} = userSlice.actions;


export default userSlice;
