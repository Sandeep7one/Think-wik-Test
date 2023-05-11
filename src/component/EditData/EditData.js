import React from "react";
import Modal from "../UI/Modal";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { addListActions } from "../../store/addList-Slice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  organization: Yup.string().required("Organization is required"),
  options: Yup.string().required("Options  is required"),
});

const EditData = ({ setEditToggle, editSelected }) => {
  const dispatch = useDispatch();

  const saveEditedValue = (value) => {
    dispatch(addListActions.editHandler({ id: value.id, saveList: value }));
    setEditToggle(false);
  };

  const cancelHandler = () => {
    setEditToggle(false);
  };
  return (
    <Modal>
      <Formik
        initialValues={editSelected}
        validationSchema={validationSchema}
        onSubmit={saveEditedValue}
      >
        {(formData) => {
          const { values, errors, touched, setValues } = formData;
          return (
            <Form>
              <p class="text-left text-2xl font-sans font-serif text-gray-500">
                Edit Single Lists !{" "}
              </p>
              <div class="flex justify-center items-center justify-around pt-6 flex-wrap ">
                <div>
                  <Field
                    class="border border-gray-900 rounded block px-6  py-2"
                    type="text"
                    name="api"
                    value={values.name}
                    placeholder="Api Input"
                    onChange={(e) => {
                      dispatch(addListActions.addName(e.target.value));
                      setValues({ ...values, name: e.target.value });
                    }}
                  />
                  {touched.name && errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                  <Field
                    class="border border-gray-900 rounded block px-6  py-2"
                    type="text"
                    name={values.organization}
                    value={values.organization}
                    onChange={(e) => {
                      dispatch(addListActions.addOrganization(e.target.value));
                      setValues({ ...values, organization: e.target.value });
                    }}
                    placeholder="Perform Input"
                  />
                  {touched.organization && errors.organization && (
                    <div>{errors.organization}</div>
                  )}
                </div>
                <div>
                  <select
                    class="border border-gray-900 rounded block px-6  py-2"
                    value={values.options}
                    onChange={(e) => {
                      dispatch(addListActions.addOptions(e.target.value));
                      setValues({ ...values, options: e.target.value });
                    }}
                  >
                    <option>DTH</option>
                    <option>Amazon</option>
                    <option>Zomato</option>
                  </select>
                  {/* {errors.options && <div>{errors.options}</div>} */}
                </div>
              </div>{" "}
              <br />
              <div class="text-right top-4 ">
                <button
                  type="submit"
                  class="border bg-sky-500 text-white px-2 py-0.5 text-2xl rounded font-sans font-serif"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="border bg-sky-500 text-white px-4 py-0.5 text-2xl rounded font-sans font-serif"
                >
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditData;
