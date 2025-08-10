import { API_PATHS } from "./apiPaths";
import axiosInstance from "../utils/axiosInstanse";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    // (You should return this)
    return response.data;

  } catch (error) {
    console.log('Error uploading the image:', error)
    throw error;
  }
}

export default uploadImage;
