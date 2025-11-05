'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Rsvp {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(
        `http://localhost:3001/rsvp?password=${encodeURIComponent(password)}`
      )

      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setRsvps(data)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Error connecting to server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(
        `http://localhost:3001/rsvp?password=${encodeURIComponent(password)}`
      )

      if (response.ok) {
        const data = await response.json()
        setRsvps(data)
      } else {
        setError('Error fetching RSVPs')
      }
    } catch (err) {
      setError('Error connecting to server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setPassword('')
    setRsvps([])
    setError('')
  }

  const exportToCSV = () => {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Created At']
    const rows = rsvps.map((rsvp) => [
      rsvp.id,
      rsvp.firstName,
      rsvp.lastName,
      rsvp.email,
      new Date(rsvp.createdAt).toLocaleString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `rsvps-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-east-african-black via-gray-900 to-east-african-black text-white flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-east-african-yellow via-east-african-gold to-east-african-yellow bg-clip-text text-transparent">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-east-african-gold text-white"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-east-african-yellow to-east-african-gold text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <Link
              href="/"
              className="block mt-4 text-center text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-east-african-black via-gray-900 to-east-african-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-east-african-yellow via-east-african-gold to-east-african-yellow bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-east-african-yellow to-east-african-gold text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 border border-gray-600 backdrop-blur-sm"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Total RSVPs</p>
            <p className="text-3xl font-bold">{rsvps.length}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Last Updated</p>
            <p className="text-sm">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                      No RSVPs yet
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{rsvp.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {rsvp.firstName} {rsvp.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{rsvp.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(rsvp.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

