import React, { useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AdminBrandsCard from "../AdminCards/AdminBrandsCard";
import UserContext from "../../../context/UserContext";

function AdminBrandsList({
  brands,
  choosenBrandId,
  setChoosenBrandId,
  setChoosenModelId,
  getAllBrand,
  setShowCreateBrand,
  setShowUpdateBrand,
}) {
  const { userToken } = useContext(UserContext);
  // To patch the index_id in database
  const updateOrderBrand = (items) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const promises = [];

    items.forEach((element) => {
      const promise = axios.put(
        `${import.meta.env.VITE_PORT_BACKEND}/brand/${element.id}`,
        {
          indexId: `${element.index_id}`,
        },
        config
      );
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        getAllBrand();
      })
      .catch((err) => console.error(err));
  };

  // Reorder the index_id when D&D
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(brands);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderBrand(items);
  }

  return (
    <div className="adminBrandList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="brands">
          {(provided) => (
            <div
              className="adminBrandList_brand"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {brands.map(({ id, name, is_visible }, index) => {
                return (
                  <Draggable
                    key={JSON.stringify(id)}
                    draggableId={JSON.stringify(id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AdminBrandsCard
                          id={id}
                          isVisible={is_visible}
                          name={name}
                          choosenBrandId={choosenBrandId}
                          setChoosenBrandId={setChoosenBrandId}
                          setChoosenModelId={setChoosenModelId}
                          setShowCreateBrand={setShowCreateBrand}
                          setShowUpdateBrand={setShowUpdateBrand}
                          getAllBrand={getAllBrand}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default AdminBrandsList;

AdminBrandsList.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string,
      type: PropTypes.number.isRequired,
    })
  ).isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
  setShowCreateBrand: PropTypes.func.isRequired,
  setShowUpdateBrand: PropTypes.func.isRequired,
};
