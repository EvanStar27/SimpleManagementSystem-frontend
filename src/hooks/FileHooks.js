import { useMutation, useQuery } from "react-query";
import { request } from "../utils/request";

// POST PHOTO
const uploadPhoto = (details, boundary) => {
  return request({
    url: "/files/upload/photo",
    method: "post",
    data: details,
    headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
  });
};

export const useUploadPhoto = () => {
  return useMutation(uploadPhoto, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

// PUT PHOTO
const updatePhoto = (details, boundary) => {
  return request({
    url: `/files/update/photo`,
    method: "put",
    data: details,
    headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
  });
};

export const useUpdatePhoto = (onSuccess) => {
  return useMutation(updatePhoto, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

// GET PHOTO
const fetchPhotoByStudentId = (id) => {
  return request({
    url: `/files/download/photo/${id}`,
    method: "get",
  });
};

export const useFetchPhotoByStudentId = (id) => {
  return useQuery(
    ["fetch_photo_by_student_id", id],
    () => fetchPhotoByStudentId(id),
    {
      onSuccess: (data) => data,
      onError: (error) => error,
      retry: false,
    }
  );
};
