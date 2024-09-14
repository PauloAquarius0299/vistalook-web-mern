import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section className='flex min-h-screen w-full'>
      <main className='hidden lg:flex items-center justify-center bg-black w-1/2 px-12'>
      <div className="max-w-md space-y-6 text-center text-primary-foreground">
        <h1 className='text-4xl font-extrabold tracking-tight'>
            Bem Vindo ao ECommerce VistaLook Web
        </h1>
      </div>
      </main>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout
