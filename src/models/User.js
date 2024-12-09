// Structure de la base de données pour les utilisateurs et leurs tokens
export const UserSchema = {
  id: 'string',
  email: 'string',
  name: 'string',
  password: 'string', // Hashed
  socialAccounts: [{
    platform: 'string', // facebook, instagram, etc.
    accountId: 'string',
    accessToken: 'string',
    refreshToken: 'string',
    scope: 'string',
    expiresAt: 'date'
  }],
  createdAt: 'date',
  updatedAt: 'date'
}
