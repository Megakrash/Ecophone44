import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateBrandOrModel from "../AdminCreate/CreateBrandOrModel";
import AdminModelsCard from "../AdminCards/AdminModelsCard";
import { FaPlusCircle } from "react-icons/fa";

function AdminModelList({
  choosenBrandId,
  choosenModelId,
  setChoosenModelId,
  getAllBrand,
  getAllModelByBrand,
  allModelsByBrand,
  getModelAndRepairs,
  setShowUpdateSmartBrand,
}) {
  const [showCreateModel, setShowCreateModel] = useState(false);

  // To patch the index_id in database
  const updateOrderModel = (items) => {
    const promises = [];

    items.forEach((element) => {
      const promise = axios.put(
        `${import.meta.env.VITE_PORT_BACKEND}/modelindex/${element.id}`,
        {
          indexId: `${element.index_id}`,
        }
      );
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        getAllBrand();
        getAllModelByBrand();
      })
      .catch((err) => console.error(err));
  };

  // Reorder the index_id when D&D
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(allModelsByBrand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderModel(items);
  }

  return (
    <div className="adminModelList">
      <div className="adminModelList_create">
        <button
          className={
            showCreateModel
              ? "adminModelList_brand_btn-activ create-model-activ"
              : "adminModelList_brand_btn create-model"
          }
          type="button"
          onClick={() => {
            setShowCreateModel(!showCreateModel);
            setChoosenModelId(0);
            setShowUpdateSmartBrand(false);
          }}
        >
          <FaPlusCircle className="fa-plus" />
          AJOUTER UN MODELE
        </button>
        {showCreateModel === true && (
          <CreateBrandOrModel
            setShowCreateModel={setShowCreateModel}
            showCreateModel={showCreateModel}
            getAllBrandOrAllModelsByBrand={getAllModelByBrand}
            choosenBrandId={choosenBrandId}
            smartOrTab={1}
            brandOrModel={2}
            setShowCreateSmartBrand={setShowCreateModel}
            setShowCreateTabBrand={setShowCreateModel}
          />
        )}
      </div>
      {allModelsByBrand && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="models">
            {(provided) => (
              <div
                className="adminModelList_brand"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allModelsByBrand.map(({ id, name, is_visible }, index) => {
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
                          <AdminModelsCard
                            id={id}
                            name={name}
                            isVisible={is_visible}
                            choosenModelId={choosenModelId}
                            setChoosenModelId={setChoosenModelId}
                            setShowCreateModel={setShowCreateModel}
                            getAllModelByBrand={getAllModelByBrand}
                            getModelAndRepairs={getModelAndRepairs}
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
      )}
    </div>
  );
}

export default AdminModelList;

AdminModelList.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowUpdateSmartBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  allModelsByBrand: PropTypes.arrayOf(
    PropTypes.shape({
      brand_id: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picmodel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
      ]),
    })
  ).isRequired,
};
