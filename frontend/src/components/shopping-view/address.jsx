import { useState } from "react"
import CommonForm from "../common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
}

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const dispatch = useDispatch();
  const {user} = useSelector((state=> state.auth));
  const {addressList} = useSelector((state=> state.shopAddress));
  const {toast} = useToast();

  function handleManageAddress(event){
    event.preventDefault();
    
    if(addressList.length >= 3 && currentEditedId === null){
      setFormData(initialAddressFormData)
      toast({
        title: 'Você pode adicionar no maximo 3 endereços',
        variant: 'destructive'
      });
      return;
    }

    currentEditedId !== null ? dispatch(editAddress({
      userId: user?.id, addressId: currentEditedId, formData, 
    }
  )).then((data)=> {
      if(data?.payload?.success){
        dispatch(fetchAllAddress(user?.id))
        setCurrentEditedId(null)
        setFormData(initialAddressFormData)
        toast({
          title: 'Endereço editado com successo!'
        })
      }
    }) 
    : dispatch(addNewAddress({
      ...formData,
      userId: user?.id
    })).then((data) => {
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllAddress(user?.id))
        setFormData(initialAddressFormData)
        toast({
          title: 'Endereço adicionado com successo!'
        })
      }
    });    
  }

  function handleDeleteAddress(getCurrentAddress){

    dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress._id})).then(data=> {
      if(data?.payload?.success){
        dispatch(fetchAllAddress(user?.id))
        toast({
          title: 'Endereço deletado com successo!'
        })
      }
    })
  }

  function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  console.log(addressList, 'addresslist')

  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
       {
        addressList && addressList.length > 0 ? 
        addressList.map(singleAddressItem => <AddressCard 
          key={singleAddressItem.id} 
          addressInfo={singleAddressItem} 
          handleDeleteAddress={handleDeleteAddress}
          handleEditAddress={handleEditAddress} />): null
       }
      </div>
      <CardHeader>
        <CardTitle>
          {
            currentEditedId !== null ? 'Editar Endereço' : 'Add Novo Endereço'
          }
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <CommonForm 
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText= {currentEditedId !== null ? 'Editar' : 'Add'}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address
