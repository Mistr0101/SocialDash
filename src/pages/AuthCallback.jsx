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
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        
        const savedState = localStorage.getItem('oauth_state')
        if (state !== savedState) {
          throw new Error('Invalid state parameter')
        }

        console.log('Authorization Code:', code)
        console.log('Platform:', platform)

        navigate('/accounts')
      } catch (err) {
        setError(err.message)
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
          <div className="text-gray-600">Connecting your account...</div>
        )}
      </div>
    </div>
  )
}
