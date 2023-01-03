import { useMutation, useQuery } from "react-query";
import { request } from "../utils/request";

// GET All Enclosures
const fetchAllEnclosures = () => {
  return request({
    url: "/enclosures",
    method: "get",
  });
};

export const useFetchAllEnclosures = () => {
  return useQuery("fetch_all_enclosures", () => fetchAllEnclosures(), {
    onSuccess: (data) => data,
    onError: (error) => error,
  });
};

// GET Enclosures By Type
const fetchEnclosuresByType = (type) => {
  return request({
    url: `/enclosures/${type}`,
    method: "get",
  });
};

export const useFetchEnclosuresByType = (type) => {
  return useQuery(
    ["fetch_enclosures_by_type", type],
    () => fetchEnclosuresByType(type),
    {
      onSuccess: (data) => data,
      onError: (error) => error,
    }
  );
};

// POST Enclosure
const addNewEnclosure = (details) => {
  return request({
    url: "/enclosures",
    method: "post",
    data: details,
  });
};

export const useAddNewEnclosure = (onSuccess) => {
  return useMutation(addNewEnclosure, {
    onSuccess,
    onError: (error) => error,
  });
};

// UPDATE Enclosure
const updateEnclosure = (details) => {
  return request({
    url: `/enclosures/${details.enclosureId}`,
    method: "put",
    data: details,
  });
};

export const useUpdateEnclosure = (onSuccess) => {
  return useMutation(updateEnclosure, {
    onSuccess,
    onError: (error) => error,
  });
};

// DELETE Enclosure
const deleteEnclosure = (details) => {
  return request({
    url: `/enclosures/${details.enclosureId}`,
    method: "delete",
  });
};

export const useDeleteEnclosure = (onSuccess) => {
  return useMutation(deleteEnclosure, {
    onSuccess,
    onError: (error) => error,
  });
};
