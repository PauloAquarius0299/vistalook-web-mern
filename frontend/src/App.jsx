import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/adm-view/layout'
import AdminDashboard from './pages/adm-view/dashboard'
import AdminProducts from './pages/adm-view/products'
import AdminOrders from './pages/adm-view/orders'
import AdminFeatures from './pages/adm-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnanthPage from './pages/unauth-page'
import { useSelector } from 'react-redux'

function App() {

  const {user, isAuthenticated} = useSelector(state=> state.auth)

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        {/* Rotas de autentificação de usuário */}
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>

        
         {/* Rotas de autentificação do Administrador */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route  path='dashboard' element={<AdminDashboard />} />
          <Route  path='products' element={<AdminProducts />} />
          <Route  path='orders' element={<AdminOrders />} />
          <Route  path='features' element={<AdminFeatures />} />
        </Route>

        
         {/* Rotas de autentificação das compras*/}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
        <Route path='home' element={<ShoppingHome />} />
        <Route path='listing' element={<ShoppingListing />} />
        <Route path='checkout' element={<ShoppingCheckout />} />
        <Route path='account' element={<ShoppingAccount />} />
        </Route>
        
         {/* Rotas para paginas não autorizadas*/}
         <Route path='/unauth-page' element={<UnanthPage />} />
         <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App
