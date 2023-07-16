const express = require("express");

const router = express.Router();

const brandRoutesFunctions = require("../handlers/brandRoutesFunctions");
const { uploadBrandPic } = require("./multers/multers");
// -----------------------------------
// ---- Front user no verify token ---
// -----------------------------------
router.get("/smartbrands", brandRoutesFunctions.getSmartBrandsForFront);
router.get("/tabbrands", brandRoutesFunctions.getTabBrandsForFront);
router.get("/refurbbrands", brandRoutesFunctions.getRefurbBrandsForFront);
// --------------------------------
// ------------ Back-office -------
// --------------------------------
// All brands by type (smartphones / tablets / refurb)
router.get("/brands/:type", brandRoutesFunctions.getBrandsByType);
// by Id
router.get("/brand/:id", brandRoutesFunctions.getBrandById);

router.put("/brand/:id", brandRoutesFunctions.updateBrandById);
// Update Pic for delete brand pic file
router.put(
  "/brandpic_delete/:id",
  brandRoutesFunctions.deleteBrandPicByBrandId
);
// upload new file then Update pic in brands
router.put(
  "/brandpic/:id",
  uploadBrandPic.single("file"),
  brandRoutesFunctions.updateBrandPicByBrandId
);
// Add new Brand
router.post(
  "/brand",
  uploadBrandPic.single("file"),
  brandRoutesFunctions.postNewBrand
);
// Delete the brand then all models and repairs link then delete all pic
router.delete("/brand/:id", brandRoutesFunctions.deleteBrandById);

module.exports = router;
