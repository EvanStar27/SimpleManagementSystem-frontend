import { useMutation, useQuery } from "react-query";
import { request } from "../utils/request";

// GET Subjects
const fetchAllSubject = () => {
  return request({
    url: "/subjects",
    method: "get",
  });
};

export const useFetchAllSubject = () => {
  return useQuery("fetch_all_subjects", () => fetchAllSubject(), {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
    keepPreviousData: true,
  });
};

// POST Subjects
const addNewSubject = (details) => {
  return request({
    url: "/subjects",
    method: "post",
    data: details,
  });
};

export const useAddNewSubject = (onSuccess) => {
  return useMutation(addNewSubject, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

// PUT Subjects
const updateSubject = (details) => {
  return request({
    url: `/subjects/${details.subjectId}`,
    method: "put",
    data: details,
  });
};

export const useUpdateSubject = (onSuccess) => {
  return useMutation(updateSubject, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

const deleteSubject = (details) => {
  return request({
    url: `/subjects/${details.subjectId}`,
    method: "delete",
  });
};

export const useDeleteSubject = (onSuccess) => {
  return useMutation(deleteSubject, {
    onSuccess,
    onError: (error) => {
      return error;
    },
  });
};

// GET Subjects By Course Id
const fetchSubjectsByCourseId = (courseId) => {
  if (courseId === 0) return;
  return request({
    url: `/subjects/course/${courseId}`,
    method: "get",
  });
};

export const useFetchSubjectsByCourseId = (courseId) => {
  return useQuery(
    ["fetch_subjects_by_course_id", courseId],
    () => fetchSubjectsByCourseId(courseId),
    {
      onSuccess: (data) => data,
      onError: (error) => error,
    }
  );
};

// GET Subject Array by Student Id
const fetchSubjectsByStudentId = (studentId) => {
  return request({
    url: `/subjects/student/${studentId}`,
    method: "get",
  });
};

export const useFetchSubjectsByStudentId = (studentId) => {
  return useQuery(
    ["fetch_subjects_by_student_id", studentId],
    () => fetchSubjectsByStudentId(studentId),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return error;
      },
    }
  );
};
