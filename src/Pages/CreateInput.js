import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addListActions } from "../store/addList-Slice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  organization: Yup.string().required("Organization is required"),
  options: Yup.string().required("Options  is required"),
});

const CreateInput = () => {
  const formikFiledValue = useSelector((state) => state.create);
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(
      addListActions.addListHandler({
        id: Date.now(),
        name: values.name,
        organization: values.organization,
        options: values.options,
      })
    );
    dispatch(addListActions.clearForm());
  };

  return (
    <Formik
      initialValues={formikFiledValue}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      enableReinitialize
    >
      {(formikValue) => {
        const { values, errors, touched, setValues } = formikValue;

        return (
          <Form class="min-w-40">
            <div class="flex justify-center items-center justify-around pt-6 flex-wrap ">
              <div>
                <Field
                  class="border border-gray-900 rounded block px-6 py-2"
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="Name"
                  onChange={(e) => {
                    dispatch(addListActions.addName(e.target.value));
                    setValues({ ...values, name: e.target.value });
                  }}
                />
                {touched.name && errors.name && (
                  <div class="text-red-500">{errors.name}</div>
                )}
              </div>
              <div>
                <Field
                  type="text"
                  class="border border-gray-900 rounded block px-6  py-2"
                  name="organization"
                  value={values.organization}
                  onChange={(e) => {
                    dispatch(addListActions.addOrganization(e.target.value));
                    setValues({ ...values, organization: e.target.value });
                  }}
                  placeholder="Organizations "
                />
                {touched.organization && errors.organization && (
                  <div class="text-red-500">{errors.organization}</div>
                )}
              </div>
              <div>
                <select
                  class="border border-gray-900 block px-6 rounded py-2"
                  value={values.options}
                  onChange={(e) => {
                    dispatch(addListActions.addOptions(e.target.value));
                    setValues({ ...values, options: e.target.value });
                  }}
                >
                  <option>Dth</option>
                  <option>Amazon</option>
                  <option>Zomato</option>
                </select>
                {/* {errors.options && <div>{errors.options}</div>} */}
              </div>
              <div>
                <button
                  type="submit"
                  class="bg-orange-900 px-4 py-1  text-3xl bg-sky-500 rounded text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateInput;
