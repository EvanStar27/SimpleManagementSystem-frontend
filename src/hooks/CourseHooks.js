import { useMutation, useQuery } from 'react-query'
import { request } from '../utils/request'

// GET Courses
const fetchAllCourses = (search) => {
  return request({
    url: `/courses?name=${search}`,
    method: 'get',
  })
}

export const useFetchAllCourses = (search) => {
  return useQuery(
    ['fetch_all_courses', search],
    () => fetchAllCourses(search),
    {
      onSuccess: (data) => {
        return data
      },
      onError: (error) => {
        return error
      },
      keepPreviousData: true,
    },
  )
}

// GET Course Applicants
const fetchApplicantsByCourseId = (courseId) => {
  return request({
    url: `/courses/applicants/${courseId}`,
    method: 'get',
  })
}

export const useFetchApplicantsByCourseId = (courseId) => {
  return useQuery(
    ['fetch_applicants_by_course_id', courseId],
    () => fetchApplicantsByCourseId(courseId),
    {
      onSuccess: (data) => {
        return data
      },
      onError: (error) => {
        return error
      },
      keepPreviousData: true,
    },
  )
}

// POST Courses
const addNewCourse = (details) => {
  return request({
    url: '/courses',
    method: 'post',
    data: details,
  })
}

export const useAddNewCourse = (onSuccess) => {
  return useMutation(addNewCourse, {
    onSuccess,
    onError: (error) => {
      return error
    },
  })
}

// POST Enroll
const enrollCourse = (details) => {
  return request({
    url: '/courses/enroll',
    method: 'post',
    data: details,
  })
}

export const useEnrollCourse = (onSuccess) => {
  return useMutation(enrollCourse, {
    onSuccess,
    onError: (error) => {
      return error
    },
  })
}

// PUT Course
const updateCourse = (details) => {
  return request({
    url: `/courses/${details.courseId}`,
    method: 'put',
    data: details,
  })
}

export const useUpdateCourse = (onSuccess) => {
  return useMutation(updateCourse, {
    onSuccess,
    onError: (error) => {
      return error
    },
  })
}

// DELETE Course
const deleteCourse = (details) => {
  return request({
    url: `/courses/${details.courseId}`,
    method: 'delete',
    data: details,
  })
}

export const useDeleteCourse = (onSuccess) => {
  return useMutation(deleteCourse, {
    onSuccess,
    onError: (error) => {
      return error
    },
  })
}

// DELETE Course Applicants
const deleteApplicantsById = (details) => {
  return request({
    url: `/courses/applicants/remove/${details.csMappingId}`,
    method: 'delete',
    data: details,
  })
}

export const useDeleteApplicantsById = (details, onSuccess) => {
  return useMutation(() => deleteApplicantsById(details), {
    onSuccess,
    onError: (error) => {
      return error
    },
  })
}
