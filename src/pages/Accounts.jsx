import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import socialConfig from '../config/social'

// ... rest of imports ...

export default function Accounts() {
  const [connectedAccounts, setConnectedAccounts] = useState([])

  const handleConnect = async (platform) => {
    // Simulation de connexion pour le développement
    const newAccount = {
      id: Date.now(),
      platform: platform.name,
      username: `${platform.name.toLowerCase()}_user_${Math.floor(Math.random() * 1000)}`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${platform.name}`,
      connected: new Date().toISOString()
    }
    
    setConnectedAccounts([...connectedAccounts, newAccount])

    // Afficher les informations de debug
    console.log('Connexion simulée :', {
      platform: platform.name,
      appId: socialConfig[platform.platform]?.appId,
      redirectUri: socialConfig[platform.platform]?.redirectUri
    })
  }

  // ... rest of the component code ...
}
