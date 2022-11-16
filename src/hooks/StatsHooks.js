import { useQuery } from 'react-query'
import { request } from '../utils/request'

// GET Stats
const fetchStats = () => {
  return request({
    url: `/stats`,
    method: 'get',
  })
}

export const useFetchStats = () => {
  return useQuery('fetch_stats', () => fetchStats(), {
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return error
    },
    keepPreviousData: true,
  })
}

// GET Chart
const fetchChartStats = () => {
  return request({
    url: `/stats/chart`,
    method: 'get',
  })
}

export const useFetchChartStats = () => {
  return useQuery('fetch_chart_stats', () => fetchChartStats(), {
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return error
    },
    keepPreviousData: true,
  })
}
