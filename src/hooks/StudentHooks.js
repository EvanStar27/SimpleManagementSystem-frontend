import { useMutation, useQuery } from "react-query";
import { request } from "../utils/request";

// GET Students
const fetchAllStudents = (search) => {
  return request({
    url: `/students?name=${search}`,
    method: "get",
  });
};

export const useFetchAllStudents = (search) => {
  return useQuery(
    ["fetch_all_students", search],
    () => fetchAllStudents(search),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return error;
      },
      keepPreviousData: true,
    }
  );
};

// GET Student By ID
const fetchStudentById = (id) => {
  return request({
    url: `/students/${id}`,
    method: "get",
  });
};

export const useFetchStudentById = (id) => {
  return useQuery(["fetch_student_by_id", id], () => fetchStudentById(id), {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
    keepPreviousData: true,
    retry: false,
  });
};

// GET Student By USER ID
const fetchStudentByUserId = (id) => {
  return request({
    url: `/students/user/${id}`,
    method: "get",
  });
};

export const useFetchStudentByUserId = (id) => {
  return useQuery(
    ["fetch_student_by_user_id", id],
    () => fetchStudentByUserId(id),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return error;
      },
      keepPreviousData: true,
      retry: false,
    }
  );
};

// POST Student
const addNewStudent = (details) => {
  return request({
    url: "/students",
    method: "post",
    data: details,
  });
};

export const useAddNewStudent = (onSuccess) => {
  return useMutation(addNewStudent, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

// PUT Student
const updateStudent = (details) => {
  return request({
    url: `/students/${details.studentId}`,
    method: "put",
    data: details,
  });
};

export const useUpdateStudent = (onSuccess) => {
  return useMutation(updateStudent, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

// DELETE Student
const deleteStudent = (details) => {
  return request({
    url: `/students/${details.studentId}`,
    method: "delete",
    data: details,
  });
};

export const useDeleteStudent = (onSuccess) => {
  return useMutation(deleteStudent, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};
