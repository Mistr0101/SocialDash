const socialConfig = {
  facebook: {
    appId: import.meta.env.VITE_FACEBOOK_APP_ID,
    redirectUri: window.location.origin + '/auth/facebook/callback',
    scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,pages_messaging'
  },
  instagram: {
    appId: import.meta.env.VITE_INSTAGRAM_APP_ID,
    redirectUri: window.location.origin + '/auth/instagram/callback',
    scope: 'basic,comments,relationships'
  },
  linkedin: {
    appId: import.meta.env.VITE_LINKEDIN_APP_ID,
    redirectUri: window.location.origin + '/auth/linkedin/callback',
    scope: 'r_liteprofile r_organization_social w_organization_social'
  },
  tiktok: {
    appId: import.meta.env.VITE_TIKTOK_APP_ID,
    redirectUri: window.location.origin + '/auth/tiktok/callback',
    scope: 'user.info.basic,video.list,video.upload'
  },
  whatsapp: {
    appId: import.meta.env.VITE_WHATSAPP_APP_ID,
    redirectUri: window.location.origin + '/auth/whatsapp/callback',
    scope: 'business_management'
  }
}

export default socialConfig
