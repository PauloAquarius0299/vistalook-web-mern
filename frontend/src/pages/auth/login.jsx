import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"


const initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const {toast} = useToast()

  function onSubmit() {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          toast:data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <>
    <section className="mx-auto w-full max-w-md space-y-6">  
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Acessar sua conta</h1>
        <p className="mt-2">
            Ainda não possui uma conta?
            <Link
            className='font-medium ml-2 text-primary hover:underline'
            to='/auth/register'
            >
            Crie uma
            </Link>
        </p>
      </div>

      <CommonForm
      formControls={loginFormControls}
      buttonText={'Acessar'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </section>
    </>
  )
}

export default AuthLogin