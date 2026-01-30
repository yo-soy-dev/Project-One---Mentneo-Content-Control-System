
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateContent from "./pages/CreateContent";
import WebsiteSection from "./pages/WebsiteSection";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import BlogSection from "./pages/BlogSection";
import AnnouncementSection from "./pages/AnnouncementSection";
import SocialSection from "./pages/SocialSection";
import Help from "./components/Help";
import Settings from "./components/Settings";
import Notifications from "./components/Notifications";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
        <Toaster position="top-right" />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateContent />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/website"
          element={
            <Layout>
              <WebsiteSection />
            </Layout>
          }
        />

        <Route
          path="/blog"
          element={
            <Layout>
              <BlogSection />
            </Layout>
          }
        />

        <Route
          path="/social"
          element={
            <Layout>
              <SocialSection />
            </Layout>
          }
        />

        <Route
          path="/announcement"
          element={
            <Layout>
              <AnnouncementSection />
            </Layout>
          }
        />

         <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Layout>
                <Help />
              </Layout>
            </ProtectedRoute>
          }
          />


      </Routes>
    </BrowserRouter>
  );
}
