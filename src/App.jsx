import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import { ModalProvider } from './context/ModalContext'
import Login from './pages/login'
import DashboardLayout from './pages/dashboard/layout'
import RequireAuth from './context/RequiredAuth'
import Dashboard from './pages/dashboard/dashboard'
import Config from './pages/dashboard/config'
import Orders from './pages/dashboard/orders'
import Products from './pages/dashboard/products'
import ProductDetail from './pages/dashboard/product'
import Users from './pages/dashboard/users'
import Categories from './pages/dashboard/categories'
import Settings from './pages/dashboard/settings'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="product" element={<ProductDetail />} />
              <Route path="users" element={<Users />} />
              <Route path="categories" element={<Categories />} />
              <Route path="settings" element={<Settings />} />
              <Route path="config" element={<Config />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
