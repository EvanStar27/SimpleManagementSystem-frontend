import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Layout from "./Layout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Students from "./pages/Admin/Students";
import Courses from "./pages/Admin/Courses";
import CourseApplicants from "./pages/Admin/CourseApplicants";
import AdminRoutes from "./components/utils/AdminRoutes";
import GuestsRoutes from "./components/utils/GuestsRoutes";
import Subjects from "./pages/Admin/Subjects";
import StudentDetails from "./pages/Admin/StudentDetails";
import Enclosures from "./pages/Admin/Enclosures";
import Register from "./pages/Auth/Register";
import StudentRoutes from "./components/utils/StudentRoutes";
import StudentDashboard from "./pages/Student/StudentDashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<GuestsRoutes />}>
              <Route path="/" element={<Home />} />

              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/management/students" element={<Students />} />
              <Route
                path="/admin/management/students/:id"
                element={<StudentDetails />}
              />
              <Route path="/admin/management/courses" element={<Courses />} />
              <Route
                path="/admin/management/courses/applicants/:id"
                element={<CourseApplicants />}
              />
              <Route path="/admin/management/subjects" element={<Subjects />} />
              <Route
                path="/admin/management/enclosures"
                element={<Enclosures />}
              />
            </Route>

            {/* Student Routes */}
            <Route element={<StudentRoutes />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Route>

            {/* 404 Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
