import expressAsyncHandler from "express-async-handler";
import { appError } from "../middlewares/errorHandler.js";
import { Vendor } from "../models/vendorModel.js";

//@desc create a new vendor
//@route POST /api/v1/vendors
//@access Private
export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      data: vendor,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc get all vendors
//@route GET /api/v1/vendors
//@access Public
export const getVendors = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate({
        path: "user",
        select: "name email",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All vendors",
      data: vendors,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc get a single vendor by slug
//@route GET /api/v1/vendors/:slug
//@access Public
export const getVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ storeSlug: req.params.slug })
      .populate({
        path: "user",
        select: "name email",
      })
      .exec();
    if (!vendor) {
      throw new appError("Vendor not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Vendor found",
      data: vendor,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc update a vendor
//@route PUT /api/v1/vendors/:id
//@access Private
export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vendor) {
      throw new appError("Vendor not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      data: vendor,
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});

//@desc delete a vendor
//@route DELETE /api/v1/vendors/:id
//@access Private
export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      throw new appError("Vendor not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    throw new appError(error.message, 500);
  }
});
