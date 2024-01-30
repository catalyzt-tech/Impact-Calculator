// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Category from './pages/Category'
import ProjectSelection from './pages/ProjectSelection'
import ImpactCalculator from './pages/ImpactCalculator'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:slug" element={<ProjectSelection />} />
            <Route path="impact" element={<ImpactCalculator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
