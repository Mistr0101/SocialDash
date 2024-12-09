import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Publications from './pages/Publications'
import Messages from './pages/Messages'
import Accounts from './pages/Accounts'
import AuthCallback from './pages/AuthCallback'

function App() {
  console.log('App rendering') // Debug log
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/accounts" element={<Accounts />} />
      </Route>
      <Route path="/auth/:platform/callback" element={<AuthCallback />} />
    </Routes>
  )
}

export default App
