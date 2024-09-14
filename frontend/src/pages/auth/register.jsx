import { Link } from "react-router-dom"

const AuthRegister = () => {
  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Criar uma nova conta!</h1>
        <p className="mt-2">
            Certo, você já possuí uma conta?
            <Link
            className='font-medium ml-2 text-primary hover:underline'
            to='/auth/login'
            >
            Acessar!
            </Link>
        </p>
      </div>
    </section>
  )
}

export default AuthRegister
