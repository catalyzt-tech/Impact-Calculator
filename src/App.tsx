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
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="category" element={<Category />} />
            <Route path="projectselection" element={<ProjectSelection />} />
            <Route path="impactcalculator" element={<ImpactCalculator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
