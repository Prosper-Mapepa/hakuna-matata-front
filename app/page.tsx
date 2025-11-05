'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      console.log('API URL:', apiUrl) // Debug log
      const response = await fetch(`${apiUrl}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/success')
      } else {
        const error = await response.json()
        alert('Error submitting RSVP: ' + (error.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0a0e1a' }}>
      {/* Shiny gradient overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        background: 'radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
      }}></div>
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
      }}></div>
      {/* Subtle color overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40" style={{
        background: 'linear-gradient(135deg, rgba(139, 105, 20, 0.15) 0%, rgba(90, 74, 26, 0.1) 50%, rgba(139, 105, 20, 0.15) 100%)',
      }}></div>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl relative z-10">
        {/* Admin Button */}
        <div className="fixed top-4 right-4 z-50">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 backdrop-blur-sm"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin
          </Link>
        </div>
        {/* Logo & Title Section */}
        <div className="text-center mb-10">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden" style={{
              filter: 'drop-shadow(0 8px 20px rgba(212, 175, 55, 0.3))',
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-east-african-gold/20 to-transparent rounded-2xl blur-xl"></div>
              <Image
                src="/logo.jpeg"
                alt="Hakuna Matata Party Logo"
                width={320}
                height={220}
                className="object-contain max-w-full h-auto relative z-10 rounded-2xl"
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#d4af37' }}>
            Hakuna Matata Party
          </h1>
        </div>

        {/* Event Details Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="relative rounded-xl p-5 text-center border border-gray-600 overflow-hidden transition-transform duration-300 hover:scale-105" style={{
            background: 'linear-gradient(145deg, #111827 0%, #0a0e1a 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}>
            <div className="absolute inset-0 opacity-35" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, transparent 50%)',
            }}></div>
            <div className="relative z-10">
              <div className="mb-3 flex justify-center" style={{
                filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))',
              }}>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="9" r="2" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <h3 className="text-xs font-bold mb-2 text-white uppercase tracking-wider">VENUE</h3>
              <p className="text-white text-sm font-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>H&S Shisha</p>
              <p className="text-gray-300 text-xs">Via Felice Casati 7</p>
            </div>
          </div>

          <div className="relative rounded-xl p-5 text-center border border-gray-600 overflow-hidden transition-transform duration-300 hover:scale-105" style={{
            background: 'linear-gradient(145deg, #111827 0%, #0a0e1a 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}>
            <div className="absolute inset-0 opacity-35" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, transparent 50%)',
            }}></div>
            <div className="relative z-10">
              <div className="mb-3 flex justify-center" style={{
                filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))',
              }}>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="6" width="14" height="15" rx="1.5" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                  <rect x="5" y="6" width="14" height="5" rx="1.5" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="8.5" r="0.8" fill="#d4af37"/>
                  <circle cx="12" cy="8.5" r="0.8" fill="#d4af37"/>
                  <circle cx="15" cy="8.5" r="0.8" fill="#d4af37"/>
                  <path d="M12 12h6M12 14h6M12 16h4" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round"/>
                  <text x="12" y="19.5" textAnchor="middle" fontSize="5" fill="#d4af37" fontWeight="bold" fontFamily="Arial, sans-serif">29</text>
                </svg>
              </div>
              <h3 className="text-xs font-bold mb-2 text-white uppercase tracking-wider">DATE</h3>
              <p className="text-white text-sm font-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Sabato</p>
              <p className="text-gray-300 text-xs">29 November</p>
            </div>
          </div>

          <div className="relative rounded-xl p-5 text-center border border-gray-600 overflow-hidden transition-transform duration-300 hover:scale-105" style={{
            background: 'linear-gradient(145deg, #111827 0%, #0a0e1a 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}>
            <div className="absolute inset-0 opacity-35" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, transparent 50%)',
            }}></div>
            <div className="relative z-10">
              <div className="mb-3 flex justify-center" style={{
                filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))',
              }}>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="7" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.7"/>
                  <circle cx="12" cy="12" r="5" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.5"/>
                  <path d="M8 10h8M8 12h8M8 14h6" stroke="#d4af37" strokeWidth="1" opacity="0.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xs font-bold mb-2 text-white uppercase tracking-wider">THEME</h3>
              <p className="text-white text-sm font-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Centro e Est</p>
              <p className="text-gray-300 text-xs">Africa Night</p>
            </div>
          </div>

          <div className="relative rounded-xl p-5 text-center border border-gray-600 overflow-hidden transition-transform duration-300 hover:scale-105" style={{
            background: 'linear-gradient(145deg, #111827 0%, #0a0e1a 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}>
            <div className="absolute inset-0 opacity-35" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, transparent 50%)',
            }}></div>
            <div className="relative z-10">
              <div className="mb-3 flex justify-center" style={{
                filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))',
              }}>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
                  <rect x="15.5" y="2.5" width="5" height="5" rx="1" stroke="#d4af37" strokeWidth="1" fill="none"/>
                  <rect x="17.5" y="4.5" width="5" height="5" rx="1" stroke="#d4af37" strokeWidth="1" fill="none"/>
                  <rect x="15.5" y="6.5" width="2" height="2" rx="0.5" stroke="#d4af37" strokeWidth="0.8" fill="none"/>
                  <rect x="17.5" y="8.5" width="2" height="2" rx="0.5" stroke="#d4af37" strokeWidth="0.8" fill="none"/>
                  <rect x="19.5" y="6.5" width="2" height="2" rx="0.5" stroke="#d4af37" strokeWidth="0.8" fill="none"/>
                  <rect x="21.5" y="8.5" width="2" height="2" rx="0.5" stroke="#d4af37" strokeWidth="0.8" fill="none"/>
                </svg>
              </div>
              <h3 className="text-xs font-bold mb-2 text-white uppercase tracking-wider">CONTACT</h3>
              <p className="text-white text-sm font-bold" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>3513985586</p>
            </div>
          </div>
        </div>

        {/* DJ Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 relative rounded-xl px-8 py-4 border border-gray-500 overflow-hidden" style={{
            background: 'linear-gradient(145deg, #1a1f2e 0%, #0f1419 100%)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}>
            <div className="absolute inset-0 opacity-30" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
            }}></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="text-3xl" style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.1)',
              }}>
                🎵
              </div>
              <span className="text-base font-semibold text-white tracking-wide">Music by DJ EL</span>
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="relative rounded-2xl p-8 md:p-10 border border-gray-600 overflow-hidden" style={{
          background: 'linear-gradient(145deg, #111827 0%, #0a0e1a 100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}>
          <div className="absolute inset-0 opacity-25" style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
          }}></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#d4af37' }}>
                Join the Celebration
              </h2>
              <p className="text-gray-300 text-sm">Reserve your spot for an unforgettable night</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-xs font-bold text-white uppercase tracking-wider">
                  FIRST NAME <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500 text-sm"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-xs font-bold text-white uppercase tracking-wider">
                  LAST NAME <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500 text-sm"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold text-white uppercase tracking-wider">
                EMAIL ADDRESS <span className="text-yellow-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500 text-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Confirm RSVP'
              )}
            </button>
          </form>
          </div>
        </div>

        {/* Disclaimer */}
        {/* <div className="mt-8 text-center space-y-1">
          <p className="text-xs text-gray-300 font-medium">DOOR SELECTION & LIMITED CAPACITY</p>
          <p className="text-xs text-gray-400">RSVP DOES NOT GUARANTEE ENTRY</p>
        </div> */}
      </div>
    </main>
  )
}
