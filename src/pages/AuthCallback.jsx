import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

export default function AuthCallback() {
  const { platform } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search)
        
        // Vérifier s'il y a des erreurs dans la réponse de Facebook
        const errorCode = urlParams.get('error_code')
        const errorMessage = urlParams.get('error_message')
        
        if (errorCode || errorMessage) {
          throw new Error(errorMessage || 'Authentication failed')
        }

        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const savedState = localStorage.getItem('oauth_state')

        // Debug logs
        console.log('Received state:', state)
        console.log('Saved state:', savedState)
        console.log('Code:', code)
        
        if (!state || state !== savedState) {
          console.error('State mismatch:', { received: state, saved: savedState })
          throw new Error('Invalid state parameter')
        }

        // Clear the saved state
        localStorage.removeItem('oauth_state')

        if (!code) {
          throw new Error('No authorization code received')
        }

        // Log successful authentication
        console.log('Successfully authenticated with:', platform)
        console.log('Authorization code:', code)

        // Redirect to accounts page
        navigate('/accounts', { 
          state: { 
            success: true, 
            platform,
            message: 'Successfully connected to ' + platform 
          }
        })
      } catch (err) {
        console.error('Authentication error:', err)
        setError(err.message)
        // Optionally redirect to accounts page with error
        navigate('/accounts', { 
          state: { 
            error: true, 
            message: err.message 
          }
        })
      }
    }

    handleCallback()
  }, [location, navigate, platform])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 shadow">
        {error ? (
          <div className="text-red-600">Error: {error}</div>
        ) : (
          <div className="text-gray-600">Processing authentication...</div>
        )}
      </div>
    </div>
  )
}
