const express = require("express");

const router = express.Router();

const repairRoutesFunctions = require("../handlers/repairRoutesFunctions");

// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get(
  "/repairsforfront/:id",
  repairRoutesFunctions.getRepairsByModelIdForFront
);

// --------------------------------
// ------------ Back-office -------
// --------------------------------
// Add new repair
router.post("/repair", repairRoutesFunctions.postNewRepair);
// by model id
router.get("/repairs/:id", repairRoutesFunctions.getRepairsByModelId);
// Update repair by id
router.put("/repair/:id", repairRoutesFunctions.updateRepairById);
// Update repair index_id with D&D
router.put("/repairsindex/:id", repairRoutesFunctions.updateRepairIndexById);
// Update Is visible
router.put(
  "/repairisvisible/:id",
  repairRoutesFunctions.updateRepairIsVisibleById
);
// Delete the repair by id
router.delete("/repair/:id", repairRoutesFunctions.deleteRepairById);
// Get the repairs icons
router.get("/icons", repairRoutesFunctions.getIcons);

module.exports = router;
