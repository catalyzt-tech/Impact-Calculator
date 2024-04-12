// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Category from './pages/Category'
import Projects from './pages/Projects.tsx'
import ImpactCatalyst from './pages/Calculator.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:slug" element={<Projects />} />
            <Route path="/impact" element={<ImpactCatalyst />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
