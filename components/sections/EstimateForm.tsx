'use client'

import { useState } from 'react'

interface FormData {
  name: string
  phone: string
  email: string
  serviceType: string
  message: string
}

export function EstimateForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // TODO: wire up to email service / CRM
    // For now just simulate success
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h3>
        <p className="text-green-700">Thanks {formData.name.split(' ')[0]}! We'll call you back within 2 hours during business hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(508) 000-0000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
        <select
          id="serviceType"
          name="serviceType"
          required
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-colors bg-white"
        >
          <option value="">Select a service…</option>
          <option value="Residential Roofing">Residential Roofing</option>
          <option value="Commercial Roofing">Commercial Roofing</option>
          <option value="Roof Repair">Roof Repair</option>
          <option value="Roof Replacement">Roof Replacement</option>
          <option value="Rubber & Flat Roofing">Rubber &amp; Flat Roofing</option>
          <option value="Solar Roofing">Solar Roofing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us more (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe the work needed, property type, address, etc."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-brand-red px-6 py-4 text-lg font-bold text-white hover:bg-brand-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-red/25"
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Free Estimate'}
      </button>

      <p className="text-xs text-center text-gray-400">
        No spam. No obligation. We typically respond within 2 hours.
      </p>
    </form>
  )
}
