import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { addListActions } from "../../store/addList-Slice";

const DeleteModal = ({id}) => {
  const dispatch = useDispatch();

  const toggleCancel = () => {
    dispatch(addListActions.toggleHandler());
  };

  const deleteHandler = () => {
    dispatch(addListActions.deleteHandler(id))
    dispatch(addListActions.toggleHandler());
  };

  return (
    <Modal>
      <h1 class="text-2xl font-sans font-serif">
        Are You Sure Want to Delete it ?{" "}
      </h1>{" "}
      <br /> <br />
      <div class="text-right">
        <button
          onClick={toggleCancel}
          class="border bg-sky-500 text-white px-3 py-0.5 text-2xl rounded font-sans font-serif"
        >
          Cancel
        </button>
        <button
          onClick={deleteHandler}
          class="border bg-sky-500 text-white px-6 py-0.5 text-2xl rounded font-sans font-serif"
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
