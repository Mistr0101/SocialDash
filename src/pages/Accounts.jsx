import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import socialConfig from '../config/social'

const platforms = [
  {
    name: 'Facebook',
    icon: '📘',
    description: 'Connect your Facebook pages and profiles',
    platform: 'facebook'
  },
  {
    name: 'Instagram',
    icon: '📸',
    description: 'Connect your Instagram business accounts',
    platform: 'instagram'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    description: 'Connect your LinkedIn profile and pages',
    platform: 'linkedin'
  },
  {
    name: 'TikTok',
    icon: '🎵',
    description: 'Connect your TikTok creator accounts',
    platform: 'tiktok'
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    description: 'Connect your WhatsApp Business account',
    platform: 'whatsapp'
  }
]

export default function Accounts() {
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Log pour debug
    console.log('Social Config:', socialConfig)
    console.log('Facebook App ID:', import.meta.env.VITE_FACEBOOK_APP_ID)
  }, [])

  const handleConnect = async (platform) => {
    try {
      const config = socialConfig[platform.platform]
      if (!config || !config.appId) {
        throw new Error(`Configuration manquante pour ${platform.name}`)
      }

      // Log pour debug
      console.log('Tentative de connexion:', {
        platform: platform.name,
        config: config
      })

      // Générer un état aléatoire pour la sécurité
      const state = Math.random().toString(36).substring(7)
      localStorage.setItem('oauth_state', state)

      // Construire l'URL d'autorisation
      let authUrl
      switch (platform.platform) {
        case 'facebook':
          authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${config.appId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&state=${state}&scope=${encodeURIComponent(config.scope)}`
          break
        // Ajouter d'autres cas pour les autres plateformes
        default:
          // Pour le développement, simuler une connexion
          const newAccount = {
            id: Date.now(),
            platform: platform.name,
            username: `${platform.name.toLowerCase()}_user_${Math.floor(Math.random() * 1000)}`,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${platform.name}`,
            connected: new Date().toISOString()
          }
          setConnectedAccounts(prev => [...prev, newAccount])
          return
      }

      if (authUrl) {
        console.log('Redirection vers:', authUrl)
        window.location.href = authUrl
      }
    } catch (err) {
      console.error('Erreur de connexion:', err)
      setError(err.message)
    }
  }

  const handleDisconnect = (accountId) => {
    setConnectedAccounts(prev => prev.filter(account => account.id !== accountId))
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Connected Accounts
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your social media connections
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
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

      {/* Connected Accounts List */}
      {connectedAccounts.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {connectedAccounts.map((account) => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={account.avatar}
                      alt={account.username}
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{account.username}</div>
                      <div className="text-sm text-gray-500">{account.platform}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-red-700 bg-red-100 hover:bg-red-200"
                  >
                    Disconnect
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Available Platforms */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-6">
            Available Platforms
          </h3>
          <div className="max-w-xl mx-auto space-y-4">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
              >
                <div className="flex-shrink-0 text-2xl">
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      {platform.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {platform.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(platform)}
                  className="inline-flex items-center p-1.5 border border-transparent rounded-full text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
