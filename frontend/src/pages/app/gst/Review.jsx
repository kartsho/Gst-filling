import { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { AuthContext } from "../../../context/AuthContext";

function DocumentPreview({ title, file }) {
  const preview = useMemo(() => {
    if (!file?.type?.startsWith("image/")) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Card className="h-full p-4">
      <h2 className="mb-3 text-sm font-semibold text-on-surface">{title}</h2>

      {preview ? (
        <div className="h-56 overflow-hidden rounded-md border border-outline-variant bg-surface-low">
          <img
            src={preview}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-56 items-center gap-4 rounded-md border border-outline-variant bg-surface-low p-5">
          <span className="text-4xl" aria-hidden="true">
            📄
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-on-surface">
              {file?.name || "Document"}
            </p>

            <p className="mt-1 text-xs text-on-surface-variant">PDF Document</p>
          </div>
        </div>
      )}

      <p className="mt-2 truncate text-xs text-on-surface-variant">
        {file?.name}
      </p>
    </Card>
  );
}

function ReviewDocuments() {
  const { updateUserOnboarding } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const files = location.state?.files;

  if (!files) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <h1 className="text-xl font-semibold text-on-surface">
              No documents found
            </h1>

            <p className="mt-2 text-sm text-on-surface-variant">
              Please upload your documents first.
            </p>

            <div className="mt-6">
              <Button type="button" onClick={() => navigate("/documents")}>
                Go to Documents
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const handleFinalSubmit = () => {
  const now = new Date();

  const application = {
    id: `GST-${now.getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`,

    type: "New GST Registration",

    submissionDate: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),

    status: "Under Review",

    lastUpdated: now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Store application permanently in browser
  localStorage.setItem(
    "gstApplication",
    JSON.stringify(application)
  );

  console.log("Submitted Documents:", files);
  console.log("Application:", application);

  toast.success("Documents submitted successfully!");

  // Go to dashboard
  navigate("/application-tracking");
};

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="p-5 sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-on-surface sm:text-3xl">
              Review Your Documents
            </h1>

            <p className="mt-2 text-sm text-on-surface-variant">
              Please review all documents before final submission.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <DocumentPreview title="Aadhaar Card" file={files.aadhaar} />

            <DocumentPreview title="PAN Card" file={files.pan} />

            <DocumentPreview title="Applicant Photo" file={files.photo} />

            <DocumentPreview title="Signature" file={files.signature} />

            <DocumentPreview
              title="Business Related Document"
              file={files.businessDocument}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-1/2"
              onClick={() => navigate("/documents")}
            >
              ← Edit Documents
            </Button>

            <Button
              type="button"
              className="w-full sm:w-1/2"
              onClick={handleFinalSubmit}
            >
              Confirm & Submit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export { DocumentPreview };
export default ReviewDocuments;
