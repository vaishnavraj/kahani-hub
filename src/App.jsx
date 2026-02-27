import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import StoriesPage from './pages/StoriesPage.jsx'
import GenresPage from './pages/GenresPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import StoryDetailPage from './pages/StoryDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-DEFAULT text-ink dark:bg-slate-DEFAULT dark:text-cream-soft">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/stories/:id" element={<StoryDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
