'use client'

import React, { useState } from 'react'

export function WarrantyRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="bg-[#EFF1E3] p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-[#57703C] text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Registration Submitted!</h3>
        <p className="text-gray-600">
          Thank you for registering your Ecogenica heat pump. Our team will review the provided details and photos to activate your warranty. We will be in touch via email shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-3 uppercase">Product Registration</h2>
        <p className="text-gray-600">Register your installation to activate the 5-year standard warranty.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Customer Details */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">First Name <span className="text-red-500">*</span></label>
          <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Last Name <span className="text-red-500">*</span></label>
          <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Email Address <span className="text-red-500">*</span></label>
          <input required type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Phone Number <span className="text-red-500">*</span></label>
          <input required type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>

        {/* Product Details */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Product Model <span className="text-red-500">*</span></label>
          <select required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors appearance-none">
            <option value="">Select a model</option>
            <option value="Outback 5kW">Outback 5kW</option>
            <option value="Outback 8kW">Outback 8kW</option>
            <option value="Outback 11kW">Outback 11kW</option>
            <option value="Outback 16kW">Outback 16kW</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Serial Number <span className="text-red-500">*</span></label>
          <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Purchase Date <span className="text-red-500">*</span></label>
          <input required type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Purchased From <span className="text-red-500">*</span></label>
          <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>

        {/* Installer Details */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Installer Name <span className="text-red-500">*</span></label>
          <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Installer Phone <span className="text-red-500">*</span></label>
          <input required type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors" />
        </div>
      </div>

      <hr className="border-gray-200 my-8" />

      {/* Photo Uploads */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 uppercase">Required Photos</h3>
        <p className="text-gray-500 text-sm mb-6">Please upload the following photos to validate your installation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">1. Nameplate on the side of the unit <span className="text-red-500">*</span></label>
            <input required type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EFF1E3] file:text-[#57703C] hover:file:bg-[#CDDC94] transition-all cursor-pointer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">2. Outdoor unit (including feet) <span className="text-red-500">*</span></label>
            <input required type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EFF1E3] file:text-[#57703C] hover:file:bg-[#CDDC94] transition-all cursor-pointer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">3. Controller / Thermostat <span className="text-red-500">*</span></label>
            <input required type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EFF1E3] file:text-[#57703C] hover:file:bg-[#CDDC94] transition-all cursor-pointer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">4. Proof of purchase <span className="text-red-500">*</span></label>
            <input required type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EFF1E3] file:text-[#57703C] hover:file:bg-[#CDDC94] transition-all cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="space-y-2 mb-8">
        <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Additional Message / Notes</label>
        <textarea rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#57703C] transition-colors resize-none"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary w-full md:w-auto uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  )
}
