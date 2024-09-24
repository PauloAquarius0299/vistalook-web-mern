import PropTypes from 'prop-types';
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"


const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress}) => {
  return (
    <Card onClick={() => setCurrentSelectedAddress && setCurrentSelectedAddress(addressInfo)}>
        <CardContent className='grid p-4 gap-4'>
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
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      notes: PropTypes.string,
    }).isRequired,
    handleDeleteAddress: PropTypes.func.isRequired,
    handleEditAddress: PropTypes.func.isRequired,
    setCurrentSelectedAddress: PropTypes.func.isRequired
};

export default AddressCard
