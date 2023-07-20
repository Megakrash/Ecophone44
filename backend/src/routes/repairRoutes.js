const express = require("express");

const router = express.Router();

const repairRoutesFunctions = require("../handlers/repairRoutesFunctions");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/api/repairsforfront/:id",
  repairRoutesFunctions.getRepairsByModelIdForFront
);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new repair
router.post("/api-token/repair", repairRoutesFunctions.postNewRepair);
// by model id
router.get("/api-token/repairs/:id", repairRoutesFunctions.getRepairsByModelId);
// Update repair by id
router.put("/api-token/repair/:id", repairRoutesFunctions.updateRepairById);
// Update repair index_id with D&D
router.put(
  "/api-token/repairsindex/:id",
  repairRoutesFunctions.updateRepairIndexById
);
// Update Is visible
router.put(
  "/api-token/repairisvisible/:id",
  repairRoutesFunctions.updateRepairIsVisibleById
);
// Delete the repair by id
router.delete("/api-token/repair/:id", repairRoutesFunctions.deleteRepairById);
// Get the repairs icons
router.get("/api-token/icons", repairRoutesFunctions.getIcons);

module.exports = router;
