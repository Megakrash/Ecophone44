import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AdminRepairCard from "./repair_card/AdminRepairCard";

function AdminRepairList({ repairs, getModelAndRepairs }) {
  // To patch the index_id in database
  const updateOrderRepairs = (items) => {
    const promises = [];
    items.forEach((element) => {
      const promise = axios.put(
        `${import.meta.env.VITE_PORT_BACKEND}/repairsindex/${element.id}`,
        {
          indexId: `${element.index_id}`,
        }
      );
      promises.push(promise);
    });
    Promise.all(promises)
      .then(() => {
        getModelAndRepairs();
      })
      .catch((err) => console.error(err));
  };

  // Reorder the index_id when D&D
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(repairs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderRepairs(items);
  }

  return (
    <div className="adminRepairList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="repairs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {repairs.map(({ id, name, price, text, is_visible }, index) => {
                return (
                  <Draggable
                    key={JSON.stringify(id)}
                    draggableId={JSON.stringify(id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className=""
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AdminRepairCard
                          repairId={id}
                          name={name}
                          price={price}
                          text={text}
                          isVisible={is_visible}
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
    </div>
  );
}

export default AdminRepairList;

AdminRepairList.propTypes = {
  repairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      marque: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picmodel: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    })
  ).isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
