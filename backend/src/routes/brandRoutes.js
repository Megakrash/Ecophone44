const express = require("express");

const router = express.Router();

const brandRoutesFunctions = require("../handlers/brandRoutesFunctions");
const { uploadBrandPic } = require("./multers/multers");
// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get("/api/smartbrands", brandRoutesFunctions.getSmartBrandsForFront);
router.get("/api/tabbrands", brandRoutesFunctions.getTabBrandsForFront);
router.get("/api/refurbbrands", brandRoutesFunctions.getRefurbBrandsForFront);
// --------------------------------
// ------------ Back-office -------
// --------------------------------
// All brands by type (smartphones / tablets / refurb)
router.get("/api-token/brands/:type", brandRoutesFunctions.getBrandsByType);
// by Id
router.get("/api-token/brand/:id", brandRoutesFunctions.getBrandById);

router.put("/api-token/brand/:id", brandRoutesFunctions.updateBrandById);
// Update Pic for delete brand pic file
router.put(
  "/api-token/brandpic_delete/:id",
  brandRoutesFunctions.deleteBrandPicByBrandId
);
// upload new file then Update pic in brands
router.put(
  "/api-token/brandpic/:id",
  uploadBrandPic.single("file"),
  brandRoutesFunctions.updateBrandPicByBrandId
);
// Add new Brand
router.post(
  "/api-token/brand",
  uploadBrandPic.single("file"),
  brandRoutesFunctions.postNewBrand
);
// Delete the brand then all models and repairs link then delete all pic
router.delete("/api-token/brand/:id", brandRoutesFunctions.deleteBrandById);

module.exports = router;
