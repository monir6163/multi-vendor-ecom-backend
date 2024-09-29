import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to cloudinary single or multiple
const cloudinaryUpload = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    localFilePath = Array.isArray(localFilePath)
      ? localFilePath
      : [localFilePath];

    const uploadPromises = localFilePath.map((path) =>
      cloudinary.uploader.upload(path, {
        folder: folderName,
        resource_type: "auto",
      })
    );

    const uploadedFiles = await Promise.all(uploadPromises);

    const result = uploadedFiles.map((res) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      url: res.url,
    }));

    localFilePath.forEach((path) => {
      try {
        fs.unlinkSync(path);
        console.log(`File ${path} was deleted successfully`);
      } catch (deleteError) {
        console.error(`Error deleting file ${path}:`, deleteError.message);
      }
    });

    return result;
  } catch (error) {
    console.error("Error during upload:", error.message);

    if (Array.isArray(localFilePath)) {
      localFilePath.forEach((path) => {
        try {
          fs.unlinkSync(path);
          console.log(`File ${path} was deleted after error`);
        } catch (deleteError) {
          console.error(
            `Error deleting file ${path} after error:`,
            deleteError.message
          );
        }
      });
    } else {
      try {
        fs.unlinkSync(localFilePath);
        console.log(`File ${localFilePath} was deleted after error`);
      } catch (deleteError) {
        console.error(
          `Error deleting file ${localFilePath} after error:`,
          deleteError.message
        );
      }
    }

    return null;
  }
};

// Delete image from cloudinary single or multiple
const deleteOnCloudinary = (publicId) => {
  if (!publicId) return null;
  publicId = Array.isArray(publicId) ? publicId : [publicId];
  publicId?.forEach(async (id) => {
    await cloudinary.uploader.destroy(id);
  });
  return true;
};

export { cloudinaryUpload, deleteOnCloudinary };
