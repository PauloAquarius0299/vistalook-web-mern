import { useEffect, useRef } from "react"
import PropTypes from "prop-types";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState}) => {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
          const isValidImageType = selectedFile.type.startsWith("image/");
          const maxSizeInBytes = 5 * 1024 * 1024; 
      
          if (!isValidImageType) {
            alert("Por favor, selecione um arquivo de imagem válido.");
            return;
          }
      
          if (selectedFile.size > maxSizeInBytes) {
            alert("O tamanho da imagem deve ser inferior a 5MB.");
            return;
          }
      
          setImageFile(selectedFile);
        }
      }      

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }
    
    console.log(imageFile);

    async function uploadImageToCloudinary() {
        try {
          setImageLoadingState(true);
          const data = new FormData();
          data.append("my_file", imageFile);
      
          const response = await axios.post(
            "http://localhost:5000/api/admin/products/upload-image",
            data
          );
      
          if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
          } else {
            console.error("Erro no upload da imagem");
          }
        } catch (error) {
          console.error("Erro ao fazer upload", error);
        } finally {
          setImageLoadingState(false);
        }
      }      

      useEffect(() => {
        if (imageFile && imageFile.type.startsWith("image/")) {
          uploadImageToCloudinary();
        } else {
          setImageFile(null); 
        }
      }, [imageFile]);
      

  return (
    <div className="w-full max-w-md mx-auto mt-4">
        <Label className='text-lg font-semibold mb-2 block' > upload image</Label>
       <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
        <Input id='image-upload' type='file' 
        className='hidden' 
        ref={inputRef}
        onChange={handleImageFileChange} />
        {
            !imageFile ? (
            <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                <span>Arraste ou Clique e carrege a imagem</span>
            </Label>
            ) : imageLoadingState ? ( 
                <Skeleton className='h-10 bg-gray-100' /> 
            ) : (
            <div className="flex items-center justify-between">
                <div className='flex items-center'>
                    <FileIcon className="w-8 text-primary mr-2 h-8" />
                </div>
                <p className="text-sm font-medium">{imageFile.name}</p>
                <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remover Imagem</span>
                </Button>
            </div>
        )}
       </div>
    </div>
  )
}

ProductImageUpload.propTypes = {
    imageFile: PropTypes.object, 
    setImageFile: PropTypes.func.isRequired,
    uploadedImageUrl: PropTypes.string,
    setUploadedImageUrl: PropTypes.func.isRequired,
    setImageLoadingState: PropTypes.func.isRequired,
  };

export default ProductImageUpload