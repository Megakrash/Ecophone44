import React, { useEffect, useState } from "react";
import {
  getIcons,
  updateOrderRepairs,
} from "@components/apiRest/ApiRestRepair";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AdminRepairCard from "./AdminRepairs_list_card/AdminRepairCard";

function AdminRepairList({ repairs, getModelAndRepairs, getAllModelByBrand }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    getIcons(setIcons);
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(repairs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderRepairs(items, getModelAndRepairs);
  }

  return (
    <div className="adminRepairList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="repairs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {repairs.map(
                (
                  { id, name, price, text, is_visible, picIcon, iconId },
                  index
                ) => {
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
                            icons={icons}
                            icon={picIcon}
                            iconId={iconId}
                            name={name}
                            price={price}
                            text={text}
                            isVisible={is_visible}
                            getModelAndRepairs={getModelAndRepairs}
                            getAllModelByBrand={getAllModelByBrand}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                }
              )}
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
      picIcon: PropTypes.string.isRequired,
      iconId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      marque: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picModel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
      ]),
      price: PropTypes.string.isRequired,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    })
  ).isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
};
