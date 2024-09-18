import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "@radix-ui/react-label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function MenuItems(){
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem){
    sessionStorage.removeItem('filters');
    const currentFilter = 
    getCurrentMenuItem.id !== 'home' &&
    getCurrentMenuItem.id !== 'products' &&
    getCurrentMenuItem.id !== 'search'
     ? {
      category: [getCurrentMenuItem.id],
     }
     : null;

     sessionStorage.setItem('filters', JSON.stringify(currentFilter));

     location.pathname.includes('listing') && currentFilter !== null 
     ? setSearchParams(
      new URLSearchParams(`?category=${getCurrentMenuParams.id}`)
      
     )
     : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

function HeaderRightContent(){
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
  }

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Sheet>
        <Button variant='outline' size='icon' className="relative">
        <ShoppingCart className='w-6 h-6' />
        <span className='sr-only'>Carrinho</span>
      </Button>
      </Sheet>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold px-4 p-2 rounded-md cursor-pointer">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logado {user?.userName} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate('/shop/account')} >
            <UserCog className="mr-2 h-4 w-4" />
            Usuario
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='hover:bg-black hover:text-white cursor-pointer' onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

}

function ShoppingHeader(){
  const { isAuthenticated } = useSelector((state) => state.auth);;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold text-2xl">VistaLook Web</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />

          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}
export default ShoppingHeader
