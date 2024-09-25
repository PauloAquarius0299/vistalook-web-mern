import bannerOne from '../../assets/bannerOne.png';
import bannerTwo from '../../assets/banner02.png';
import bannerTree from '../../assets/banner03.png';
import { Button } from '@/components/ui/button';
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Flower,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  Footprints,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { getFeatureImages } from '@/store/common-slice';

const categoriesWithIcon = [
  { id: "men", label: "Masculino", icon: ShirtIcon },
  { id: "women", label: "Feminino", icon: Flower },
  { id: "kids", label: "Infantil", icon: BabyIcon },
  { id: "accessories", label: "Acessorios", icon: WatchIcon },
  { id: "footwear", label: "Calçados", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector((state) => state.shopProducts);
  const {user} = useSelector((state) => state.auth);
  const {featureImageList} = useSelector((state)=> state.commonFeature)
  const slides = [bannerOne, bannerTwo, bannerTree];
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()

  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  };

    
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  function handleAddCart(getCurrentProductId){
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }))
    .then((data)=> {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Produto adicionado ao carrinho",
        });
      }
    })
  }

 useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  },3000);

  return () => clearInterval(timer)
 }, []);

 useEffect(() => {
  dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams: 'price-lowtohigh'}))
 }, [dispatch]);

 useEffect(() => {
  if(productDetails !== null) setOpenDetailsDialog(true)
},[productDetails])

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <div className='relative w-full h-[500px] overflow-hidden'>
      {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
        onClick={()=> setCurrentSlide(prevSlide=> (prevSlide - 1 + slides.length) % slides.length)}>
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
        onClick={()=> setCurrentSlide(prevSlide=> (prevSlide + 1) % slides.length)}>
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Compre por Categoria</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categoriesWithIcon.map(categoryItem => (
                <Card key={categoryItem.id} 
                className='cursor-pointer hover:shadow-lg transition-shadow'
                onClick={() => handleNavigateToListingPage(categoryItem)}
                >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Preferencia de Marca</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
              key={brandItem.id}
              onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Produtos em Destaques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                  key={productItem.id} 
                  handleGetProductDetails={handleGetProductDetails}        
                  product={productItem}
                  handleAddCart={handleAddCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
