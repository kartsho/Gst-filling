import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplicationTracking() {
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    const savedApplication = localStorage.getItem("gstApplication");

    if (savedApplication) {
      try {
        setApplication(JSON.parse(savedApplication));
      } catch (error) {
        console.error("Invalid application data:", error);
        localStorage.removeItem("gstApplication");
      }
    }
  }, []);

  // No application submitted
  if (!application) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">

          <div className="rounded-xl border border-outline-variant bg-surface p-8 text-center shadow-sm">

            <h2 className="mb-2 text-xl font-semibold text-on-surface">
              No Application Found
            </h2>

            <p className="mb-6 text-sm text-on-surface-variant">
              Please upload your documents first.
            </p>

            <button
              type="button"
              onClick={() => navigate("/documents")}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-primary-hover"
            >
              Go to Documents
            </button>

          </div>

        </div>
      </div>
    );
  }

  /* STATUS BADGE */

  const getStatusClass = (status) => {
    switch (status) {

      case "Pending":
        return "border-warning/30 bg-warning/10 text-warning";

      case "Under Review":
        return "border-primary/30  text-primary bg-emerald-600";

      case "Approved":
        return "border-success/30 bg-success/10 text-success";

      case "Rejected":
        return "border-error/30 bg-error/10 text-error";

      case "Additional Information Required":
        return "border-info/30 bg-info/10 text-info";

      default:
        return "border-outline-variant bg-surface-low text-on-surface-variant";
    }
  };


  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-6 pt-2">

          <h1 className="mb-2 text-2xl font-semibold text-on-surface sm:text-3xl">
            Application Tracking
          </h1>

          <p className="text-sm text-on-surface-variant sm:text-base">
            Track the current status and progress of your GST application.
          </p>

        </div>


        {/* ================= APPLICATION INFORMATION ================= */}

        <div className="mb-6 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">

          <div className="p-5 sm:p-6">

            {/* Application ID + Status */}

            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">

              <div>

                <p className="mb-1 text-sm text-on-surface-variant">
                  Application ID
                </p>

                <h2 className="text-lg font-semibold text-on-surface">
                  {application.id}
                </h2>

              </div>


              {/* Status */}

              <span
                className={`rounded-full border px-4 py-2 text-sm font-medium text-white  bg-blue-500 ${getStatusClass(
                  application.status
                )}`  }
              >
                {application.status}
              </span>

            </div>


            <div className="h-px bg-outline-variant" />


            {/* ================= DETAILS ================= */}

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* Application Type */}

              <div className="min-h-[60px]">

                <p className="text-sm text-on-surface-variant">
                  Application Type
                </p>

                <p className="mt-1 font-medium text-on-surface">
                  {application.type}
                </p>

              </div>


              {/* Submission Date */}

              <div className="min-h-[60px]">

                <p className="text-sm text-on-surface-variant">
                  Submission Date
                </p>

                <p className="mt-1 font-medium text-on-surface">
                  {application.submissionDate}
                </p>

              </div>


              {/* Current Status */}

              <div className="min-h-[60px]">

                <p className="text-sm text-on-surface-variant">
                  Current Status
                </p>

                <p className="mt-1 font-medium text-on-surface">
                  {application.status}
                </p>

              </div>


              {/* Last Updated */}

              <div className="min-h-[60px]">

                <p className="text-sm text-on-surface-variant">
                  Last Updated
                </p>

                <p className="mt-1 font-medium text-on-surface">
                  {application.lastUpdated}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= STATUS TIMELINE ================= */}

        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">

          <div className="p-5 sm:p-6">

            <h2 className="mb-6 text-lg font-semibold text-on-surface">
              Application Status
            </h2>


            <div className="relative pl-1">

              {/* Pending */}

              <StatusStep
                number="1"
                title="Pending"
                description="Application submitted successfully and is waiting for processing."
                active={application.status === "Pending"}
                completed={true}
              />


              {/* Under Review */}

              <StatusStep
                number="2"
                title="Under Review"
                description="Your application is currently being reviewed."
                active={application.status === "Under Review"}
              />


              {/* Approved */}

              <StatusStep
                number="3"
                title="Approved"
                description="Your GST application has been approved."
                active={application.status === "Approved"}
              />


              {/* Rejected */}

              <StatusStep
                number="4"
                title="Rejected"
                description="Your GST application has been rejected."
                active={application.status === "Rejected"}
              />


              {/* Additional Information */}

              <StatusStep
                number="5"
                title="Additional Information Required"
                description="Additional documents or information may be required."
                active={
                  application.status ===
                  "Additional Information Required"
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STATUS STEP
========================================================= */

function StatusStep({
  number,
  title,
  description,
  active,
  completed = false,
}) {
  return (
    <div className="relative flex gap-3 pb-8 sm:gap-4">

      {/* Vertical Line */}

      <div
        className={`absolute left-[17px] top-9 h-[calc(100%-10px)] w-0.5 ${
          active || completed
            ? "bg-primary"
            : "bg-outline-variant"
        }`}
      />


      {/* Status Circle */}

      <div
        className={`relative z-10 flex h-9 w-9 min-w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
          completed && active
            ? "bg-success text-on-success"
            : active
            ? "bg-primary text-on-primary shadow-[0_0_0_5px_rgba(0,0,0,0.08)]"
            : completed
            ? "bg-success text-on-success"
            : "bg-surface-low text-on-surface-variant border border-outline-variant"
        }`}
      >
        {completed && active ? "✓" : number}
      </div>


      {/* Content */}

      <div className="pt-1">

        <h3
          className={`mb-1 text-sm font-semibold sm:text-base ${
            active
              ? "text-primary"
              : "text-on-surface"
          }`}
        >
          {title}
        </h3>

        <p className="text-sm text-on-surface-variant">
          {description}
        </p>

      </div>

    </div>
  );
}

export default ApplicationTracking;