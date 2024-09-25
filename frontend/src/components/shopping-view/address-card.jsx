import PropTypes from 'prop-types';
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"


const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) => {
  console.log(selectedId, addressInfo?._id)
  return (
    <Card onClick={() => setCurrentSelectedAddress && setCurrentSelectedAddress(addressInfo)}
    className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id  ? "border-red-900 border-[4px]" : 'border-black'} `}>
        <CardContent className={` ${selectedId === addressInfo?._id ? 'border-black' : ''} grid p-4 gap-4`}>
            <Label>Endereço: {addressInfo?.address}</Label>
            <Label>Cidade: {addressInfo?.city}</Label>
            <Label>CEP: {addressInfo?.pincode}</Label>
            <Label>Telefone: {addressInfo?.phone}</Label>
            <Label>Informações: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='p-3 flex justify-between'>
            <Button onClick={()=> handleEditAddress(addressInfo)}>Editar</Button>
            <Button onClick={()=> handleDeleteAddress(addressInfo)}>Deletar</Button>
        </CardFooter>
    </Card>
  )
}

AddressCard.propTypes = {
    addressInfo: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      notes: PropTypes.string,
    }).isRequired,
    handleDeleteAddress: PropTypes.func.isRequired,
    handleEditAddress: PropTypes.func.isRequired,
    setCurrentSelectedAddress: PropTypes.func.isRequired,
    selectedId: PropTypes.func.isRequired,
};

export default AddressCard
