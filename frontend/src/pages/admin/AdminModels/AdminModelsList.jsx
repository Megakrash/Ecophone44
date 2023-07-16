import React, { useState } from "react";
import { updateOrderModel } from "@components/apiRest/ApiRestModel";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateBrandOrModel from "../AdminCreate/CreateBrandOrModel";
import AdminModelsCard from "../AdminCards/AdminModelsCard";
import { FaPlusCircle } from "react-icons/fa";

function AdminModelsList({
  choosenBrandId,
  choosenModelId,
  setChoosenModelId,
  getAllBrand,
  getAllModelByBrand,
  allModelsByBrand,
  getModelAndRepairs,
  setShowUpdateBrand,
  type,
}) {
  const [showCreateModel, setShowCreateModel] = useState(false);

  // Reorder the index_id when D&D
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(allModelsByBrand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderModel(items, getAllBrand, getAllModelByBrand);
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
            setShowUpdateBrand(false);
          }}
        >
          <FaPlusCircle className="fa-plus" />
          AJOUTER UN MODELE
        </button>
        {showCreateModel === true && (
          <CreateBrandOrModel
            getAllBrandOrAllModelsByBrand={getAllModelByBrand}
            showCreateBrandOrModel={showCreateModel}
            setShowCreateBrandOrModel={setShowCreateModel}
            type={type}
            brandOrModel={2}
            choosenBrandId={choosenBrandId}
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
                            setShowUpdateBrand={setShowUpdateBrand}
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

export default AdminModelsList;

AdminModelsList.propTypes = {
  choosenBrandId: PropTypes.number.isRequired,
  choosenModelId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
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
  getModelAndRepairs: PropTypes.func.isRequired,
  setShowUpdateBrand: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};
