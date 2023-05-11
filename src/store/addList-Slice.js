import { createSlice } from "@reduxjs/toolkit";

const createState = {
  name: "",
  organization: "",
  options: "Dth",
  createdLists: [],
  toggle: false,
};

const addListSlice = createSlice({
  name: "create",
  initialState: createState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    addOrganization: (state, action) => {
      state.organization = action.payload;
    },
    addOptions: (state, action) => {
      state.options = action.payload;
    },
    clearForm: (state, action) => {
      state.name = "";
      state.organization = "";
    },
    addListHandler: (state, action) => {
      const newPayload = action.payload;
      state.createdLists = state.createdLists.concat({
        id: newPayload.id,
        name: newPayload.name,
        organization: newPayload.organization,
        options: newPayload.options,
      });
    },
    toggleHandler: (state, action) => {
      state.toggle = !state.toggle;
    },
    deleteHandler: (state, action) => {
      const newAction = action.payload;
      const index = state.createdLists.findIndex(
        (create, index) => create.id === newAction.id
      );
      if (index >= -1) {
        state.createdLists.splice(index, 1);
      }
    },
    editHandler :(state, action)=>{
      const newAction = action.payload;
      const index = state.createdLists.findIndex(
        (create, index) => create.id === newAction.id
      );
      if(index >= -1){
        state.createdLists[index] = newAction.saveList
      }
    }
  },
});

export const addListActions = addListSlice.actions;
export default addListSlice.reducer;
