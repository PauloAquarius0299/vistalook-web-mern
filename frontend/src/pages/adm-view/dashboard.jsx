import ProductImageUpload from "@/components/adm-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const {featureImageList} = useSelector(state=> state.commonFeature)

  function handleUploadFeatureImage(){
    dispatch(addFeatureImage(uploadedImageUrl)).then(data=> {
      if(data?.payload?.success){
        dispatch(getFeatureImages())
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  console.log(featureImageList, 'imageListFeatue')

  return (
    <div>
    <h1>
      Carregar conteudo de imagem
    </h1>
    <ProductImageUpload 
    imageFile={imageFile} 
    setImageFile={setImageFile} 
    uploadedImageUrl={uploadedImageUrl} 
    setUploadedImageUrl={setUploadedImageUrl}
    setImageLoadingState={setImageLoadingState}
    imageLoadingState={imageLoadingState}
    isCustomStyling={true}
    //isEditMode={currentEditedId !== null}
    />
    <Button onClick={handleUploadFeatureImage} className='mt-5 w-full'>Upload</Button>
    <div className='flex flex-col gap-4 mt-5'>
      {
        featureImageList && featureImageList.length > 0 ?
        featureImageList.map((featureImgItem, index)=> (
        <div key={featureImgItem.id || index}>
          <div className="relative">
                <img 
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
                />
            </div>
        </div>
        )) 
        : null
      }
    </div>
    </div>
  )
}

export default AdminDashboard
