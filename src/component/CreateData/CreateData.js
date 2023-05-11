import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListActions } from "../../store/addList-Slice";
import DeleteModal from "../UI/DeleteModal";
import EditData from "../EditData/EditData";
import { Pagination } from "@mui/material";
import usePagination from "../Pagination/Pagination";

const CreateData = () => {
  const { createdLists, toggle } = useSelector((state) => state.create);
  const [editToggle, setEditToggle] = useState(false);
  const [editSelected, setEditSelected] = useState(null);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("ascending");
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(createdLists.length / PER_PAGE);
  const _DATA = usePagination(createdLists, PER_PAGE);
  console.log(_DATA.currentData());
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const editHandler = (item) => {
    setEditSelected(item);
    setEditToggle(true);
  };

  const deleteHandler = (id) => {
    setId(id);
    dispatch(addListActions.toggleHandler());
  };

  const sortedItems = [..._DATA.currentData()].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.id + b.id;
    } else {
      return b.id - a.id;
    }
  });

  return (
    <div>
      {toggle && <DeleteModal id={id} />}
      {editToggle && (
        <EditData editSelected={editSelected} setEditToggle={setEditToggle} />
      )}
      <h1 class="text-center pt-8 font-light font-sans font-serif text-3xl text-gray-500">
        Created Data is Hear !
      </h1>
      <hr class="mx-20 text-gray-900 border border-gray-200 " />

      <table class="mt-8">
        {sortedItems.length > 0 && (
          <tr>
            <th class="text-start">
              <td class="text-gray-500">Name :- </td>
              <td>
                <select
                  id="sortOrder"
                  class="border-none"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="ascending" class="text-gray-500">
                    Asc
                  </option>
                  <option value="descending" class="text-gray-500">
                    Des
                  </option>
                </select>
              </td>
            </th>
            <th class="text-start text-gray-500">Organization</th>
            <th class="text-start text-gray-500">Options</th>
            <th class="text-start text-gray-500">Actions </th>
          </tr>
        )}

        {sortedItems.map((create) => {
          return (
            <tr>
              <td>
                <input
                  value={create.name}
                  type="text"
                  readOnly
                  class="border border-gray-900 rounded block px-6  py-2"
                />
              </td>
              <td>
                <input
                  value={create.organization}
                  type="text"
                  readOnly
                  class="border border-gray-900 rounded block px-6  py-2"
                />
              </td>
              <td>
                <input
                  value={create.options}
                  type="text"
                  readOnly
                  class="border border-gray-900 rounded block px-6  py-2"
                />
              </td>
              <td>
                <button
                  class="border bg-sky-500 text-white px-4 py-0.5 text-2xl rounded"
                  onClick={() => editHandler(create)}
                >
                  Edit
                </button>
                <button
                  class="border bg-sky-500 text-white px-4 py-0.5 text-2xl rounded"
                  onClick={() => deleteHandler(create.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {sortedItems.length > 0 && (
        <div class="text-center mt-40 content-center fixed">
          <Pagination count={count} onChange={handleChange} page={page} />
        </div>
      )}
    </div>
  );
};

export default CreateData;
