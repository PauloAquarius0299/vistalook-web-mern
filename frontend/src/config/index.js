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
    label: "Preço Normal",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Digite o valor",
  },
  {
    label: "Preço do Desconto",
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
    label: "Produtos",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Masculino",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Feminino",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Infantil",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Calçados",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Acessorios",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Pesquisar",
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
  Categoria: [
    { id: "men", label: "Masculino" },
    { id: "women", label: "Feminino" },
    { id: "kids", label: "Infantil" },
    { id: "accessories", label: "Acessorios" },
    { id: "footwear", label: "Calçados" },
  ],
  Marcas: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Preço: Menor ao Maior" },
  { id: "price-hightolow", label: "Preço: Maior ao Menor" },
  { id: "title-atoz", label: "Titulo: A to Z" },
  { id: "title-ztoa", label: "Titulo: Z to A" },
];

export const addressFormControls = [
  {
    label: "Endereço",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Digite sua rua",
  },
  {
    label: "Cidade",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Digite sua cidade",
  },
  {
    label: "CEP",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu CEP",
  },
  {
    label: "Telefone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu numero de celular",
  },
  {
    label: "Informação adicional",
    name: "notes",
    componentType: "textarea",
    placeholder: "Descreva uma informação adicional para o entregador",
  },
];