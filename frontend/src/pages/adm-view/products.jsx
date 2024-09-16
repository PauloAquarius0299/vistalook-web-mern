import { Button } from "@/components/ui/button"
import { Fragment } from "react"


const AdminProducts = () => {
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button>
          Add Novo Produto
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

      </div>
    </Fragment>
  )
}

export default AdminProducts
