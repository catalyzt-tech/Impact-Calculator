// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/Layout'

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Default</h1>} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
