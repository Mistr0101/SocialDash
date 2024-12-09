import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'
import socialConfig from '../config/social'

// ... rest of your platforms array ...

export default function Accounts() {
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Handle navigation state (success/error messages)
    if (location.state) {
      if (location.state.error) {
        setError(location.state.message)
      } else if (location.state.success) {
        setSuccess(location.state.message)
        // Simulate adding the connected account
        const newAccount = {
          id: Date.now(),
          platform: location.state.platform,
          username: `${location.state.platform}_user_${Math.floor(Math.random() * 1000)}`,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${location.state.platform}`,
          connected: new Date().toISOString()
        }
        setConnectedAccounts(prev => [...prev, newAccount])
      }
    }
  }, [location])

  const handleConnect = async (platform) => {
    try {
      const config = socialConfig[platform.platform]
      if (!config || !config.appId) {
        throw new Error(`Configuration manquante pour ${platform.name}`)
      }

      // Générer un état aléatoire pour la sécurité
      const state = Math.random().toString(36).substring(7)
      localStorage.setItem('oauth_state', state)

      // Construire l'URL d'autorisation
      let authUrl
      switch (platform.platform) {
        case 'facebook':
          authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${config.appId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&state=${state}&scope=${encodeURIComponent(config.scope)}`
          break
        // ... autres cas ...
      }

      if (authUrl) {
        window.location.href = authUrl
      }
    } catch (err) {
      setError(err.message)
    }
  }

  // ... rest of your component code ...

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* ... existing JSX ... */}
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{success}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ... rest of your JSX ... */}
    </div>
  )
}
