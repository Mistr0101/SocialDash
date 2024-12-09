const socialConfig = {
  facebook: {
    appId: import.meta.env.VITE_FACEBOOK_APP_ID,
    redirectUri: 'http://localhost:5173/auth/facebook/callback',
    // Permissions Facebook valides selon la documentation actuelle
    scope: 'email,public_profile,pages_manage_posts,pages_read_engagement'
  },
  instagram: {
    appId: import.meta.env.VITE_INSTAGRAM_APP_ID,
    redirectUri: 'http://localhost:5173/auth/instagram/callback',
    scope: 'basic,comments,relationships'
  },
  linkedin: {
    appId: import.meta.env.VITE_LINKEDIN_APP_ID,
    redirectUri: 'http://localhost:5173/auth/linkedin/callback',
    scope: 'r_liteprofile r_organization_social w_organization_social'
  },
  tiktok: {
    appId: import.meta.env.VITE_TIKTOK_APP_ID,
    redirectUri: 'http://localhost:5173/auth/tiktok/callback',
    scope: 'user.info.basic,video.list,video.upload'
  },
  whatsapp: {
    appId: import.meta.env.VITE_WHATSAPP_APP_ID,
    redirectUri: 'http://localhost:5173/auth/whatsapp/callback',
    scope: 'business_management'
  }
}

export default socialConfig
