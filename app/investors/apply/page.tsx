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

export default function InvestorApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    address: "",
    socialWebsite: "",
    financialInvestor: false,
    advisorMentor: false,
    businessPartner: false,
    otherType: "",
    sector: "",
    experienceSkills: "",
    investmentModel: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (!formData.experienceSkills.trim())
      newErrors.experienceSkills = "Experience and skills are required";
    if (!formData.investmentModel.trim())
      newErrors.investmentModel = "Investment method is required";

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // At least one investor type must be selected
    if (
      !formData.financialInvestor &&
      !formData.advisorMentor &&
      !formData.businessPartner &&
      !formData.otherType.trim()
    ) {
      newErrors.investorType =
        "Please select at least one investor/partner type";
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
      const response = await fetch("/api/investors", {
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
        organization: "",
        address: "",
        socialWebsite: "",
        financialInvestor: false,
        advisorMentor: false,
        businessPartner: false,
        otherType: "",
        sector: "",
        experienceSkills: "",
        investmentModel: "",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us in shaping the future of education. Fill out the form below
            to express your interest in partnering or investing with us.
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
                  Thank you for your interest in partnering with us. We have
                  received your application and will review it carefully. Our
                  team will contact you within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Process Overview */}
        <Card className="mb-8 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">
              Application Process
            </CardTitle>
            <CardDescription>
              Here's what happens after you submit your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-700 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Application</h3>
                <p className="text-sm text-gray-600">
                  Submit your application form
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-700 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Review & Interview</h3>
                <p className="text-sm text-gray-600">
                  We review and contact you for discussion
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-700 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Partnership</h3>
                <p className="text-sm text-gray-600">
                  Start our collaboration journey
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">
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
                <div className="border-b border-emerald-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Personal Information
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
                    <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-base">
                    Organization/Company Name (if any)
                  </Label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="ABC Holdings, Ltd."
                    value={formData.organization}
                    onChange={handleInputChange}
                  />
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
                  <Label htmlFor="socialWebsite" className="text-base">
                    Social Media or Website Link
                  </Label>
                  <Input
                    id="socialWebsite"
                    name="socialWebsite"
                    type="url"
                    placeholder="www.yourwebsite.com or LinkedIn profile"
                    value={formData.socialWebsite}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Section 2: Investment Information */}
              <div className="space-y-6">
                <div className="border-b border-emerald-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Investment Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">
                    Type of Partner <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">Select all that apply</p>

                  <div className="space-y-3 pl-2">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="financialInvestor"
                        name="financialInvestor"
                        checked={formData.financialInvestor}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <Label
                        htmlFor="financialInvestor"
                        className="font-normal cursor-pointer"
                      >
                        Collaborator
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="advisorMentor"
                        name="advisorMentor"
                        checked={formData.advisorMentor}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <Label
                        htmlFor="advisorMentor"
                        className="font-normal cursor-pointer"
                      >
                        Advisor/Mentor (Provide Skills/Advice)
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="businessPartner"
                        name="businessPartner"
                        checked={formData.businessPartner}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <Label
                        htmlFor="businessPartner"
                        className="font-normal cursor-pointer"
                      >
                        Business Partner (Work with the Business)
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherType" className="font-normal">
                        Other (Please Explain)
                      </Label>
                      <Textarea
                        id="otherType"
                        name="otherType"
                        placeholder="Briefly describe how you want to partner"
                        rows={2}
                        value={formData.otherType}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {errors.investorType && (
                    <p className="text-sm text-red-500">
                      {errors.investorType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector" className="text-base">
                    Sector/Industry You're Interested In{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sector"
                    name="sector"
                    type="text"
                    placeholder="E.g., Tech, Education, Health, Food"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className={errors.sector ? "border-red-500" : ""}
                  />
                  {errors.sector && (
                    <p className="text-sm text-red-500">{errors.sector}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceSkills" className="text-base">
                    Experience and Skills You Can Share{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="experienceSkills"
                    name="experienceSkills"
                    placeholder="E.g., Financial management, marketing, business expansion"
                    rows={4}
                    value={formData.experienceSkills}
                    onChange={handleInputChange}
                    className={errors.experienceSkills ? "border-red-500" : ""}
                  />
                  {errors.experienceSkills && (
                    <p className="text-sm text-red-500">
                      {errors.experienceSkills}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentModel" className="text-base">
                    Your Preferred Investment Method{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="investmentModel"
                    name="investmentModel"
                    placeholder="E.g., Mentoring, Strategic Partnership"
                    rows={4}
                    value={formData.investmentModel}
                    onChange={handleInputChange}
                    className={errors.investmentModel ? "border-red-500" : ""}
                  />
                  {errors.investmentModel && (
                    <p className="text-sm text-red-500">
                      {errors.investmentModel}
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
                    data.
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
              href="mailto:info@edubusiness.academy"
              className="text-emerald-600 hover:underline"
            >
              info@edubusiness.academy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
