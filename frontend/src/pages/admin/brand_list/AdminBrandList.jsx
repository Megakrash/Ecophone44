import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function AdminBrandList({
  choosenBrandId,
  setChoosenBrandId,
  setChoosenModelId,
  brands,
  getAllBrand,
  setShowUpdateSmartBrand,
  setShowCreateSmartBrand,
  setShowCreateTabBrand,
  setShowUpdateTabBrand,
}) {

  // To patch the index_id in database
  const updateOrderBrand = (items) => {
    items.forEach((element) => {
      axios
        .put(`${import.meta.env.VITE_PORT_BACKEND}/brandindex/${element.id}`, {
          indexId: `${element.index_id}`,
        })
        .then(() => {
          getAllBrand();
        })
        .catch((err) => console.error(err));
    });
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
              {brands.map(({ id, name }, index) => {
                const isActive = id === choosenBrandId;
                return (
                  <Draggable
                    key={JSON.stringify(id)}
                    draggableId={JSON.stringify(id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={
                          isActive
                            ? "adminBrandList_brand_btn-activ"
                            : "adminBrandList_brand_btn"
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => {
                          setChoosenBrandId(id);
                          setChoosenModelId(0);
                          setShowCreateSmartBrand(false);
                          setShowUpdateSmartBrand(false);
                          setShowCreateTabBrand(false);
                          setShowUpdateTabBrand(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <p>{name.toUpperCase()}</p>
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

export default AdminBrandList;

AdminBrandList.propTypes = {
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowUpdateSmartBrand: PropTypes.func.isRequired,
  setShowCreateSmartBrand: PropTypes.func.isRequired,
  setShowCreateTabBrand: PropTypes.func.isRequired,
  setShowUpdateTabBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_smart: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
