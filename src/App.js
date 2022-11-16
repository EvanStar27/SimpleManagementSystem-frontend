import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import Layout from './Layout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Students from './pages/Admin/Students'
import Courses from './pages/Admin/Courses'
import CourseApplicants from './pages/Admin/CourseApplicants'
import AdminRoutes from './components/utils/AdminRoutes'
import GuestsRoutes from './components/utils/GuestsRoutes'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<GuestsRoutes />}>
              <Route path="/" element={<Home />} />

              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/management/students" element={<Students />} />
              <Route path="/admin/management/courses" element={<Courses />} />
              <Route
                path="/admin/management/courses/applicants/:id"
                element={<CourseApplicants />}
              />
            </Route>

            {/* 404 Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
