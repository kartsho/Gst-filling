import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../pages/app/Dashboard";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import UiTest from "../pages/UiTest";
import ProtectedRoute from "./ProtectedRoute";
import OnboardingRoute from "./OnboardingRoute";

import Home from "../pages/Home";

import Documents from "../pages/app/gst/Documents";
import ReviewDocuments from "../pages/app/gst/Review";
import GstRegistration from "../pages/app/gst/GstRegistration";
import ApplicationTracking from "../pages/app/gst/ApplicationTrack";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          {/* =========================
              GST ONBOARDING
          ========================== */}

          <Route element={<AppLayout />}>
            <Route path="/gst-registration" element={<GstRegistration />} />

            <Route path="/documents" element={<Documents />} />

            <Route path="/review-documents" element={<ReviewDocuments />} />
            <Route path="/application-tracking" element={<ApplicationTracking />} />
          </Route>

          {/* =========================
              COMPLETED USERS ONLY
          ========================== */}

          <Route element={<OnboardingRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/checklist" element={<div>Checklist</div>} />

              <Route path="/roadmap" element={<div>Roadmap</div>} />

              <Route path="/services" element={<div>Services</div>} />

              <Route path="/appointments" element={<div>Appointments</div>} />

              <Route path="/payments" element={<div>Payments</div>} />

              <Route path="/messages" element={<div>Messages</div>} />

              <Route path="/notifications" element={<div>Notifications</div>} />

              <Route path="/uitest" element={<UiTest />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
