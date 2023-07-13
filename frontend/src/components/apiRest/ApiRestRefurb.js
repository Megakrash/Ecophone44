import { apiRequest } from "./ApiRest";

// -------------------------------------------
// -------------- FRONT-USER -----------------
// -------------------------------------------

//Refurb.jsx
export const getRefurbById = (id, setDetails) =>
  apiRequest("get", `/refurbbyidforfront/${id}`, null, setDetails);
