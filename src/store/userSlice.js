import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userdetails',
  initialState: {
    userDetail:[],
    islogin: true,
    token:null,
    isAdmin: true,
  },
  reducers: {
    getUserDetails:(state,actions)=>{
    },
    SetisLogin:(state)=>{
      state.islogin=!state.islogin;
    },
    Settoken:(state,actions)=>{
       state.token=actions.payload;
    },
    SetAdmin: (state)=>{
      state.isAdmin = !state.isAdmin;
    }
  }
})

export const { getUserDetails,SetisLogin, Settoken, SetAdmin} = userSlice.actions;
export default userSlice.reducer;
