"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EntrepreneurApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    currentOccupation: "",
    address: "",
    socialLinks: "",
    businessName: "",
    ideaSummary: "",
    problemSolved: "",
    targetCustomer: "",
    businessStage: "",
    physicalAssets: "",
    mentalAssets: "",
    assistanceNeeded: "",
    expectations: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.currentOccupation.trim())
      newErrors.currentOccupation = "Current occupation is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.ideaSummary.trim())
      newErrors.ideaSummary = "Business idea description is required";
    if (!formData.problemSolved.trim())
      newErrors.problemSolved = "Problem description is required";
    if (!formData.businessStage)
      newErrors.businessStage = "Business stage is required";
    if (!formData.physicalAssets.trim())
      newErrors.physicalAssets = "Physical assets description is required";
    if (!formData.mentalAssets.trim())
      newErrors.mentalAssets = "Skills and knowledge description is required";
    if (!formData.assistanceNeeded.trim())
      newErrors.assistanceNeeded = "Assistance needed is required";
    if (!formData.expectations.trim())
      newErrors.expectations = "Expectations are required";

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/entrepreneurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        currentOccupation: "",
        address: "",
        socialLinks: "",
        businessName: "",
        ideaSummary: "",
        problemSolved: "",
        targetCustomer: "",
        businessStage: "",
        physicalAssets: "",
        mentalAssets: "",
        assistanceNeeded: "",
        expectations: "",
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Hide success message after 10 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessStages = [
    {
      value: "idea",
      label: "Idea Stage",
      description: "Just started thinking about the business",
    },
    {
      value: "research",
      label: "Research Stage",
      description: "Still studying the market and analyzing",
    },
    {
      value: "testing",
      label: "Testing Stage",
      description: "Have a prototype or MVP (Minimum Viable Product)",
    },
    {
      value: "operating",
      label: "Operating Stage",
      description: "Business is running and needs help to grow",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aspiring Entrepreneur Application Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our Mini Incubation Center to turn your business idea into
            reality. Fill out the form below to get started on your
            entrepreneurial journey.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-900">
                  Application Submitted Successfully!
                </h3>
                <p className="mt-2 text-green-800">
                  Thank you for applying to our Mini Incubation Center. We have
                  received your application and will review it carefully. Our
                  team will contact you within 5-7 business days to discuss the
                  next steps.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">
              Application Form
            </CardTitle>
            <CardDescription>
              Please provide accurate information. All information will be kept
              strictly confidential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Personal Information */}
              <div className="space-y-6">
                <div className="border-b border-blue-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    📋 Personal Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full legal name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-base">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={errors.phoneNumber ? "border-red-500" : ""}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentOccupation" className="text-base">
                    Current Job/Occupation{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="currentOccupation"
                    name="currentOccupation"
                    type="text"
                    placeholder="Student, Software Engineer, Teacher, etc."
                    value={formData.currentOccupation}
                    onChange={handleInputChange}
                    className={errors.currentOccupation ? "border-red-500" : ""}
                  />
                  {errors.currentOccupation && (
                    <p className="text-sm text-red-500">
                      {errors.currentOccupation}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base">
                    Residential Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="123 Main Street, City, Country"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialLinks" className="text-base">
                    Social Media Links (if any)
                  </Label>
                  <Input
                    id="socialLinks"
                    name="socialLinks"
                    type="url"
                    placeholder="Link to LinkedIn, Facebook, or other professional page"
                    value={formData.socialLinks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Section 2: Idea and Business Details */}
              <div className="space-y-6">
                <div className="border-b border-blue-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    💡 Idea and Business Details
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-base">
                    Business Name (if you have one)
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="E.g., EcoClean Laundry Service"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ideaSummary" className="text-base">
                    Briefly Describe Your Idea (150 words){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="ideaSummary"
                    name="ideaSummary"
                    placeholder="What your business is and why you want to start it"
                    rows={5}
                    value={formData.ideaSummary}
                    onChange={handleInputChange}
                    className={errors.ideaSummary ? "border-red-500" : ""}
                  />
                  <p className="text-xs text-gray-500">
                    Word count:{" "}
                    {formData.ideaSummary.split(/\s+/).filter((w) => w).length}{" "}
                    / ~150 words
                  </p>
                  {errors.ideaSummary && (
                    <p className="text-sm text-red-500">{errors.ideaSummary}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problemSolved" className="text-base">
                    What Problem Will Your Business Solve?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="problemSolved"
                    name="problemSolved"
                    placeholder="Describe the problem and how your idea solves it"
                    rows={4}
                    value={formData.problemSolved}
                    onChange={handleInputChange}
                    className={errors.problemSolved ? "border-red-500" : ""}
                  />
                  {errors.problemSolved && (
                    <p className="text-sm text-red-500">
                      {errors.problemSolved}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetCustomer" className="text-base">
                    Who is Your Target Customer?
                  </Label>
                  <Textarea
                    id="targetCustomer"
                    name="targetCustomer"
                    placeholder="Who will buy your product/service and how it will benefit them"
                    rows={3}
                    value={formData.targetCustomer}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">
                    What Stage is Your Business In?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-3">
                    {businessStages.map((stage) => (
                      <div
                        key={stage.value}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.businessStage === stage.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            businessStage: stage.value,
                          }));
                          if (errors.businessStage) {
                            const newErrors = { ...errors };
                            delete newErrors.businessStage;
                            setErrors(newErrors);
                          }
                        }}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id={stage.value}
                            name="businessStage"
                            value={stage.value}
                            checked={formData.businessStage === stage.value}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="ml-3">
                            <Label
                              htmlFor={stage.value}
                              className="font-semibold cursor-pointer"
                            >
                              {stage.label}
                            </Label>
                            <p className="text-sm text-gray-600">
                              {stage.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.businessStage && (
                    <p className="text-sm text-red-500">
                      {errors.businessStage}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physicalAssets" className="text-base">
                    Physical Assets You Own{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="physicalAssets"
                    name="physicalAssets"
                    placeholder="E.g., Equipment, initial money, office space"
                    rows={3}
                    value={formData.physicalAssets}
                    onChange={handleInputChange}
                    className={errors.physicalAssets ? "border-red-500" : ""}
                  />
                  {errors.physicalAssets && (
                    <p className="text-sm text-red-500">
                      {errors.physicalAssets}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentalAssets" className="text-base">
                    Skills and Knowledge You Have{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="mentalAssets"
                    name="mentalAssets"
                    placeholder="E.g., Design skills, marketing experience, professional certificates"
                    rows={3}
                    value={formData.mentalAssets}
                    onChange={handleInputChange}
                    className={errors.mentalAssets ? "border-red-500" : ""}
                  />
                  {errors.mentalAssets && (
                    <p className="text-sm text-red-500">
                      {errors.mentalAssets}
                    </p>
                  )}
                </div>
              </div>

              {/* Section 3: Requirements */}
              <div className="space-y-6">
                <div className="border-b border-blue-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    🎯 Requirements
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assistanceNeeded" className="text-base">
                    What Kind of Help Do You Need?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="assistanceNeeded"
                    name="assistanceNeeded"
                    placeholder="E.g., Funding, marketing, mentorship, financial management"
                    rows={4}
                    value={formData.assistanceNeeded}
                    onChange={handleInputChange}
                    className={errors.assistanceNeeded ? "border-red-500" : ""}
                  />
                  {errors.assistanceNeeded && (
                    <p className="text-sm text-red-500">
                      {errors.assistanceNeeded}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectations" className="text-base">
                    What Do You Expect From Us?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="expectations"
                    name="expectations"
                    placeholder="Describe your goals for joining the Incubation Center"
                    rows={4}
                    value={formData.expectations}
                    onChange={handleInputChange}
                    className={errors.expectations ? "border-red-500" : ""}
                  />
                  {errors.expectations && (
                    <p className="text-sm text-red-500">
                      {errors.expectations}
                    </p>
                  )}
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div className="text-sm text-blue-900">
                    <strong className="font-semibold">Confidentiality:</strong>{" "}
                    All information provided in this application will be kept
                    strictly confidential and will only be used for evaluation
                    purposes. We respect your privacy and protect your personal
                    data and business ideas.
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:info@edubusiness.com"
              className="text-blue-600 hover:underline"
            >
              info@edubusiness.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
