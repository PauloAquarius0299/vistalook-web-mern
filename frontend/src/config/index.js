export const registerFormControls = [
    {
      name: "userName",
      label: "Nome de usuario",
      placeholder: "Digite seu nome",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Digite seu email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Senha",
      placeholder: "Digite sua senha",
      componentType: "input",
      type: "password",
    },
];

export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Digite seu email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Senha",
      placeholder: "Digite sua senha",
      componentType: "input",
      type: "password",
    },
];

export const addProductFormElements = [
  {
    label: "Titulo",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Digite o titulo",
  },
  {
    label: "Descrinção",
    name: "description",
    componentType: "textarea",
    placeholder: "Faça a descrinção do seu produto",
  },
  {
    label: "Categoria",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Masculino" },
      { id: "women", label: "Feminino" },
      { id: "kids", label: "Infantil" },
      { id: "accessories", label: "Acessorios" },
      { id: "footwear", label: "Calçados" },
    ],
  },
  {
    label: "Marca",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Preço",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Digite o valor",
  },
  {
    label: "Preço de Venda",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Preço de desconto (optional)",
  },
  {
    label: "Estoque Total",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Quantos em estoque",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];