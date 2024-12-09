// Configuration des clés d'API pour chaque plateforme
const config = {
  facebook: {
    clientId: 'YOUR_FACEBOOK_APP_ID',
    redirectUri: 'http://localhost:5173/auth/facebook/callback',
    scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,pages_messaging'
  },
  instagram: {
    clientId: 'YOUR_INSTAGRAM_APP_ID',
    redirectUri: 'http://localhost:5173/auth/instagram/callback',
    scope: 'basic,comments,relationships'
  },
  linkedin: {
    clientId: 'YOUR_LINKEDIN_APP_ID',
    redirectUri: 'http://localhost:5173/auth/linkedin/callback',
    scope: 'r_liteprofile r_organization_social w_organization_social'
  },
  tiktok: {
    clientId: 'YOUR_TIKTOK_APP_ID',
    redirectUri: 'http://localhost:5173/auth/tiktok/callback',
    scope: 'user.info.basic,video.list,video.upload'
  },
  whatsapp: {
    clientId: 'YOUR_WHATSAPP_BUSINESS_APP_ID',
    redirectUri: 'http://localhost:5173/auth/whatsapp/callback',
    scope: 'business_management'
  }
}

// Fonction pour initialiser le processus OAuth
export const initiateOAuth = (platform) => {
  const { clientId, redirectUri, scope } = config[platform]
  const state = generateRandomState() // Générer un état aléatoire pour la sécurité

  // Construire l'URL d'autorisation en fonction de la plateforme
  let authUrl
  switch (platform) {
    case 'facebook':
      authUrl = `https://facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`
      break
    case 'instagram':
      authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`
      break
    case 'linkedin':
      authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`
      break
    case 'tiktok':
      authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`
      break
    case 'whatsapp':
      authUrl = `https://wa.me/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`
      break
  }

  // Sauvegarder l'état pour la vérification ultérieure
  localStorage.setItem('oauth_state', state)
  
  // Rediriger vers la page d'autorisation
  window.location.href = authUrl
}

// Fonction pour gérer le callback OAuth
export const handleOAuthCallback = async (platform, code, state) => {
  // Vérifier l'état pour la sécurité
  const savedState = localStorage.getItem('oauth_state')
  if (state !== savedState) {
    throw new Error('Invalid state parameter')
  }

  // Échanger le code contre un token d'accès
  const response = await fetch('/api/auth/' + platform + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  const data = await response.json()
  return data.access_token
}

// Fonction utilitaire pour générer un état aléatoire
function generateRandomState() {
  return Math.random().toString(36).substring(2, 15)
}
