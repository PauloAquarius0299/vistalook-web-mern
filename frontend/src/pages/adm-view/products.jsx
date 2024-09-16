import ProductImageUpload from "@/components/adm-view/image-upload"
import AdminProductTile from "@/components/adm-view/product-tile"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

 const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
}


function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList}= useSelector(state=> state.adminProducts)
  const dispatch = useDispatch();
  const {toast} = useToast()

 function onSubmit(event){
  event.preventDefault();
  dispatch(addNewProduct({
    ...formData,
    image: uploadedImageUrl
  })).then((data) => {
    console.log(data);
    if(data?.payload?.success){
      dispatch(fetchAllProducts())
      setOpenCreateProductsDialog(false)
      setImageFile(null);
      setFormData(initialFormData)
      toast({
        title: 'Produto adicionado com sucesso!',
      })
    }
  })
 }

 useEffect(() => {
  dispatch(fetchAllProducts())
 }, [dispatch])

 console.log(productList, 'productList')

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add+ Novo Produto 
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 
        ? productList.map((productItem) => (
          <AdminProductTile 
          key={productItem.id}
          />
        ))
      : null}
      </div>
        <Sheet open={openCreateProductsDialog} 
        onOpenChange={() => setOpenCreateProductsDialog(false)}>
          <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>Adicinar Novo Produto</SheetTitle>
          </SheetHeader>
          <ProductImageUpload 
          imageFile={imageFile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}/>

          <div className="py-6">
            <CommonForm 
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText="Add+"
            formControls={addProductFormElements}
            />
          </div>
          </SheetContent>
        </Sheet>

    </Fragment>
  )
}

export default AdminProducts
