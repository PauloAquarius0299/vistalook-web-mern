import { Link } from "react-router-dom"


const AuthLogin = () => {
  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Acessar sua conta</h1>
        <p className="mt-2">
            Ainda não possui uma conta?
            <Link
            className='font-medium ml-2 text-primary hover:underline'
            to='/auth/register'
            >
            Cadastrar
            </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthLogin
