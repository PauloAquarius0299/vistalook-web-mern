import PropTypes from 'prop-types';
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from '../ui/badge';


const ShoppingProductTile = ({product, handleGetProductDetails, handleAddCart}) => {
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div onClick={() => handleGetProductDetails(product?._id)}>
            <div className="relative">
                <img 
                src={product?.image}
                alt={product?.title}
                className='w-full h-[300px] object-cover rounded-t-lg'
                /> 
                {
                    product?.salePrice > 0 ? 
                    <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">Exclusivo</Badge> : null
                }
            </div>
            <CardContent className='p-4'>
                <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{product?.category}</span>
                    <span className="text-sm text-muted-foreground">{product?.brand}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                    {
                        product?.salePrice > 0 ? 
                        <span className="text-lg font-semibold text-primary">${product?.salePrice}</span>
                        : null
                    }
                </div>
            </CardContent>
            
        </div>
        <CardFooter>
                <Button onClick={() => handleAddCart(product?._id)} className='w-full'>add ao carrinho</Button>
            </CardFooter>
    </Card>
  )
}

ShoppingProductTile.propTypes = {
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      brand: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    handleGetProductDetails: PropTypes.func.isRequired,
    handleAddCart: PropTypes.func.isRequired,
  };

export default ShoppingProductTile