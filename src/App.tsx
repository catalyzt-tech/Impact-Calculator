// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Category from './pages/Category'
import ProjectSelection from './pages/ProjectSelection'
import ImpactCatalyst from './pages/ImpactCatalyst'
import TempGraph from './pages/TempGraph.tsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:slug" element={<ProjectSelection />} />
            <Route path="impact" element={<ImpactCatalyst />} />
            <Route path="tempgraph" element={<TempGraph />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
