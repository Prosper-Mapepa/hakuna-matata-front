'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-east-african-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-east-african-yellow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-700/50 shadow-2xl animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.jpeg"
              alt="Hakuna Matata Party Logo"
              width={200}
              height={150}
              className="object-contain max-w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-east-african-yellow to-east-african-gold flex items-center justify-center shadow-xl shadow-east-african-gold/30 animate-fade-in-up">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-east-african-yellow via-east-african-gold to-east-african-yellow bg-clip-text text-transparent animate-fade-in-up">
            RSVP Confirmed!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 animate-fade-in-up">
            Thank you for your RSVP. We look forward to seeing you at the Hakuna Matata Party!
          </p>

          {/* Event Reminder */}
          <div className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700/50 animate-fade-in-up">
            <p className="text-sm text-gray-400 mb-2">Event Details</p>
            <p className="text-white font-semibold mb-1">Sabato 29 Novembre</p>
            <p className="text-gray-300 text-sm">H&S Shisha Lounge, Milano</p>
          </div>

          {/* Back Button */}
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-east-african-yellow via-east-african-gold to-east-african-yellow text-black font-bold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-east-african-gold/30 hover:scale-105 active:scale-95 transition-all duration-200 text-lg animate-fade-in-up"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

