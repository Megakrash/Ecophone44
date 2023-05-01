import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateBrand from "./CreateBrand";

function AdminBrandList({ setChoosenBrandId, setChoosenModelId }) {
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [smartBrands, setSmartBrands] = useState([]);
  const [tabBrands, setTabBrands] = useState([]);
  const [showCreateSmartBrand, setShowCreateSmartBrand] = useState(false);
  const [showCreateTabBrand, setShowCreateTabBrand] = useState(false);

  const getAllBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/smartbrand`)
      .then((res) => {
        setSmartBrands(res.data);
      })
      .catch(() => {
        console.error("error");
      });
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/tabbrand`)
      .then((res) => {
        setTabBrands(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllBrand();
  }, []);

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

  const handleClickActiveBrand = (id) => {
    setActiveBrandId(id);
  };

  const reOrderList = (items, result) => {
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    for (const [index, value] of items.entries()) {
      value.index_id = index + 1;
    }
    updateOrderBrand(items);
  }

  function handleOnDragEndSmart(result) {
    if (!result.destination) return;
    const items = Array.from(smartBrands);
    reOrderList(items, result);
  }

  function handleOnDragEndTab(result) {
    if (!result.destination) return;
    const items = Array.from(tabBrands);
    reOrderList(items, result);
  }

  return (
    <div className="adminBrandList">
      <div className="adminBrandList_smartphone">
        <p>SMARTPHONES</p>
      </div>
      <div className="adminBrandList_create">
        <button
          className={
            showCreateSmartBrand
              ? "adminBrandList_brand_btn-activ"
              : "adminBrandList_brand_btn"
          }
          type="button"
          onClick={() => {
            setShowCreateSmartBrand(!showCreateSmartBrand);
            setChoosenBrandId(null);
            setChoosenModelId(null);
            setActiveBrandId(null);
          }
          }
        >
          AJOUTER UNE MARQUE
        </button>
        {showCreateSmartBrand === true && (
          <CreateBrand
            setShowCreateSmartBrand={setShowCreateSmartBrand}
            setShowCreateTabBrand={setShowCreateTabBrand}
            getAllBrand={getAllBrand}
            type={1}
          />
        )}
      </div>
      {smartBrands.length >= 1 && (
        <DragDropContext onDragEnd={handleOnDragEndSmart}>
          <Droppable droppableId="smartBrands">
            {(provided) => (
              <div
                className="adminBrandList_brand"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {smartBrands.map(({ id, name }, index) => {
                  const isActive = id === activeBrandId;
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
                            handleClickActiveBrand(id);
                            setChoosenBrandId(id);
                            setChoosenModelId(null);
                            setShowCreateSmartBrand(false);
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
      <div className="adminBrandList_smartphone">
        <p>TABLETTES</p>
      </div>
      <div className="adminBrandList_create">
        <button
          className={
            showCreateTabBrand
              ? "adminBrandList_brand_btn-activ"
              : "adminBrandList_brand_btn"
          }
          type="button"
          onClick={() => {
            setShowCreateTabBrand(!showCreateTabBrand);
            setChoosenBrandId(null);
            setChoosenModelId(null);
            setActiveBrandId(null);
          }
          }
        >
          AJOUTER UNE MARQUE
        </button>
        {showCreateTabBrand === true && (
          <CreateBrand
            setShowCreateSmartBrand={setShowCreateSmartBrand}
            setShowCreateTabBrand={setShowCreateTabBrand}
            getAllBrand={getAllBrand}
            type={0}
          />
        )}
      </div>
      {tabBrands.length >= 1 && (
        <DragDropContext onDragEnd={handleOnDragEndTab}>
          <Droppable droppableId="tabBrands">
            {(provided) => (
              <div
                className="adminBrandList_brand"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tabBrands.map(({ id, name }, index) => {
                  const isActive = id === activeBrandId;
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
                            handleClickActiveBrand(id);
                            setChoosenBrandId(id);
                            setChoosenModelId(null);
                            setShowCreateSmartBrand(false);
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
  );
}

export default AdminBrandList;

AdminBrandList.propTypes = {
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
};
