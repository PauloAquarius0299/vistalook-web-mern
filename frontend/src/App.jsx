
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'

function App() {

  return (
    <main className='flex flex-col overflow-hidden bg-white'>
      <h1>header components</h1>

      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
       { /*<Route path='/login' />*/}
        </Route>
      </Routes>
    </main>
  )
}

export default App
