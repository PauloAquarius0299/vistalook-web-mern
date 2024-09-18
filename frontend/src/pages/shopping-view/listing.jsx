import ProductFilter from "@/components/shopping-view/filter"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { Button } from "@/components/ui/button"
import { sortOptions } from "@/config"
import { fetchAllFilteredProducts } from "@/store/shop/product-slice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filtersParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join('&');
}

const ShoppingListing = () => {

  const dispatch = useDispatch()
  const {productList} = useSelector(state=> state.shopProducts);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams()

  function handleSort(value){
    setSort(value);
  }

  function handleFilters(getSectionId, getCurrentOption){
   
    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if(indexOfCurrentSection === -1){
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      };
    }else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if(indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
        else cpyFilters[getSectionId].splice(indexOfCurrentOption,1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
    console.log("Filtros após alteração:", cpyFilters);
    
  }
  
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(()=> {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  
  useEffect(() => {
    if (Object.keys(filters).length > 0 && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort }))
    }
  }, [dispatch, sort, filters]);
  

  console.log(filters, searchParams, 'filters');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center  justify-between">
          <h2 className="text-lg font-semibold ">Todos os Produtos</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Produtos</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm ' className='flex items-center gap-1 p-2'>
                <ArrowUpDownIcon className='w-4 h-4' />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem
                  value={sortItem.id}
                  key={sortItem.id}
                  className="cursor-pointer"
                  >
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {productList && productList.length > 0 ? 
        productList.map(productItem => (
        <ShoppingProductTile key={productItem._id} 
        handleGetProductDetails={handleGetProductDetails}
        product={productItem} />
        )) : 
         <p>Nenhum produto encontrado</p>}
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing
