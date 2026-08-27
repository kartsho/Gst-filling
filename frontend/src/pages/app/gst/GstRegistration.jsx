import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const CONSTITUTIONS = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited",
  "Public Limited",
];

const STATES = [
  "Uttar Pradesh",
  "Maharashtra",
  "Delhi",
  "Bihar",
  "Madhya Pradesh",
];

const BUSINESS_ACTIVITIES = [
  "Retail & Wholesale Trading",
  "Manufacturing",
  "Services",
  "Retail",
  "Wholesale",
];

const REGISTRATION_REASONS = [
  "New Business",
  "Voluntary Registration",
  "Business Expansion",
];

function FormSelect({ label, name, options, register, error, required = false }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-on-surface"
      >
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </label>

      <select
        id={name}
        {...register(name, {
          ...(required ? { required: `${label} is required` } : {}),
        })}
        className={`h-11 w-full rounded-md border bg-surface px-3 text-sm text-on-surface outline-none transition-colors ${
          error
            ? "border-error focus:border-error"
            : "border-outline-variant focus:border-primary"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

function GstRegistration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Temporary: replace with the GST registration API when available.
    console.log("GST registration details:", data);

    toast.success("Business details saved successfully.");
    navigate("/documents");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-outline-variant bg-surface p-5 shadow-lg sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-on-surface sm:text-3xl">
              GST Business Registration
            </h1>

            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-white" />

            <p className="mx-auto mt-4 max-w-2xl text-sm text-on-surface-variant">
              Enter your business details to continue with your GST filing
              process.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                label="Legal Name of Business"
                placeholder="Enter legal business name"
                {...register("legalName", {
                  required: "Legal name is required",
                })}
                error={errors.legalName?.message}
              />

              <Input
                label="Trade Name"
                placeholder="Enter trade name"
                {...register("tradeName")}
                error={errors.tradeName?.message}
              />

              <FormSelect
                label="Constitution of Business"
                name="constitution"
                options={CONSTITUTIONS}
                register={register}
                error={errors.constitution?.message}
                required
              />

              <Input
                label={
                  <>
                    PAN <span className="text-xs font-normal text-on-surface-variant">(ABCDE1234F)</span>
                  </>
                }
                name="pan"
                placeholder="ABCDE1234F"
                maxLength={10}
                {...register("pan", {
                  required: "PAN is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    message: "Enter a valid PAN",
                  },
                  onChange: (event) => {
                    event.target.value = event.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                      .slice(0, 10);
                  },
                })}
                error={errors.pan?.message}
              />

              <FormSelect
                label="State"
                name="state"
                options={STATES}
                register={register}
                error={errors.state?.message}
                required
              />

              <Input
                label="District"
                placeholder="Enter district"
                {...register("district", {
                  required: "District is required",
                })}
                error={errors.district?.message}
              />

              <FormSelect
                label="Business Activity"
                name="businessActivity"
                options={BUSINESS_ACTIVITIES}
                register={register}
                error={errors.businessActivity?.message}
                required
              />

              <Input
                label="Date of Commencement"
                type="date"
                {...register("commencementDate", {
                  required: "Date of commencement is required",
                })}
                error={errors.commencementDate?.message}
              />

              <FormSelect
                label="Reason for Registration"
                name="reason"
                options={REGISTRATION_REASONS}
                register={register}
                error={errors.reason?.message}
                required
              />

              <Input
                label="Existing GSTIN"
                placeholder="Enter GSTIN / Not Applicable"
                {...register("gstin")}
                error={errors.gstin?.message}
              />

              <Input
                label="Aadhaar Number"
                placeholder="12-digit Aadhaar number"
                maxLength={12}
                inputMode="numeric"
                {...register("aadhaar", {
                  required: "Aadhaar number is required",
                  pattern: {
                    value: /^\d{12}$/,
                    message: "Enter a valid 12-digit Aadhaar number",
                  },
                  onChange: (event) => {
                    event.target.value = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12);
                  },
                })}
                error={errors.aadhaar?.message}
              />

              <Input
                label="Mobile Number"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                inputMode="numeric"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                  onChange: (event) => {
                    event.target.value = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  },
                })}
                error={errors.mobile?.message}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={errors.email?.message}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Continue to Documents
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GstRegistration;
