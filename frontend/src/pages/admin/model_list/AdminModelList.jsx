import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CreateModel from "./CreateModel";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function AdminModelList({ choosenBrandId, choosenModelId, setChoosenModelId, getAllBrand }) {

  const [allModelsByBrand, setAllModelsByBrand] = useState([]);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const getAllModelByBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/model/${choosenBrandId}`)
      .then((res) => {
        setAllModelsByBrand(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllModelByBrand();
    setShowCreateModel(false);
  }, [choosenBrandId]);

  // To patch the index_id in database
  const updateOrderModel = (items) => {
    items.forEach((element) => {
      axios
        .put(`${import.meta.env.VITE_PORT_BACKEND}/modelindex/${element.id}`, {
          indexId: `${element.index_id}`,
        })
        .then(() => {
          getAllBrand();
          getAllModelByBrand();
        })
        .catch((err) => console.error(err));
    });
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
              ? "adminModelList_brand_btn-activ"
              : "adminModelList_brand_btn"
          }
          type="button"
          onClick={() => {
            setShowCreateModel(!showCreateModel);
            setChoosenModelId(0);
          }}
        >
          AJOUTER UN MODELE
        </button>
        {showCreateModel === true && (
          <CreateModel
            setShowCreateModel={setShowCreateModel}
            getAllModelByBrand={getAllModelByBrand}
            choosenBrandId={choosenBrandId}
          />
        )}
      </div>
      {allModelsByBrand.length >= 1 && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="models">
            {(provided) => (
              <div
                className="adminModelList_brand"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allModelsByBrand.map(({ id, name }, index) => {
                  const isActive = id === choosenModelId;
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
                              ? "adminModelList_brand_btn-activ"
                              : "adminModelList_brand_btn"
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => {
                            setChoosenModelId(id);
                            setShowCreateModel(false);
                          }}
                        >
                          {name.toUpperCase()}
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
  )
}

export default AdminModelList;

AdminModelList.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
};
