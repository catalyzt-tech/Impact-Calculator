// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/Layout'
import Category from './pages/Category'
function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="category" element={<Category />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
