import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/login'
import DashboardLayout from './pages/dashboard/layout'
import Dashboard from './pages/dashboard/dashboard'
import Orders from './pages/dashboard/orders'
import Products from './pages/dashboard/products'
import Users from './pages/dashboard/users'
import Categories from './pages/dashboard/categories'
import Settings from './pages/dashboard/settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
