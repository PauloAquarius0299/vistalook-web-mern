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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import ShoppingPaymentSuccess from './pages/shopping-view/payment-success'
import SearchProducts from './pages/shopping-view/search'

function App() {

  const {user, isAuthenticated, isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  if(isLoading) return <Skeleton className='w-[800] bg-black h-[600px]' />

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route 
        path='/'
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }/>
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
        <Route path='paypal-return' element={<PaypalReturnPage />} />
        <Route path='paypal-success' element={<ShoppingPaymentSuccess />} />
        <Route path='search' element={<SearchProducts />} />
        </Route>
        
         {/* Rotas para paginas não autorizadas*/}
         <Route path='/unauth-page' element={<UnanthPage />} />
         <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App
