export const API_BASE_URL = "https://sportwearzapp.azurewebsites.net/api";

//**************USUARIO**********************
export const API_USER_URL = API_BASE_URL + "/Usuario";
export const API_CREATE_USER = API_USER_URL + "/Create";
export const API_EDIT_USER = API_USER_URL + "/Edit";
export const API_DELETE_USER = API_USER_URL + "/Delete";
export const API_LIST_USER = API_USER_URL + "/lista";
export const API_GET_USER = API_USER_URL + "/Get";
export const API_LOGIN_USER = API_USER_URL + "/Auth"

//******************************************





//*************PRODUCTOS************************
export const API_PRODUCT_URL = API_BASE_URL + "/Product";
export const API_CREATE_PRODUCT = API_PRODUCT_URL + "/Create";
export const API_EDIT_PRODUCT = API_PRODUCT_URL + "/Edit";
export const API_PRODUCT_DELETE = API_PRODUCT_URL + "/Delete";
export const API_PRODUCT_LIST = API_PRODUCT_URL + "/lista";
export const API_PRODUCT_CATALOG = API_PRODUCT_URL + "/catalogo";
export const API_PRODUCT_GET = API_PRODUCT_URL + "/Get";
//*********************************************

//***********CATEGORY*********************************
export const API_CATEGORY_URL = API_BASE_URL + "/Categoria";
export const API_CATEGORY_GET = API_CATEGORY_URL + "/Get";
export const API_CATEGORY_LIST = API_CATEGORY_URL + "/lista";
export const API_CATEGORY_CREATE = API_CATEGORY_URL + "/Create";
export const API_CATEGORY_DELETE = API_CATEGORY_URL + "/Delete";
export const API_CATEGORY_EDIT = API_CATEGORY_URL + "/Edit";
//*******************************************************************************



//*********************BRAND***********************************

export const API_BRAND_URL = API_BASE_URL + "/Brand";
export const API_BRAND_GET = API_BRAND_URL + "/Get";
export const API_BRAND_LIST = API_BRAND_URL + "/lista";
export const API_BRAND_CREATE = API_BRAND_URL + "/Create";
export const API_BRAND_DELETE = API_BRAND_URL + "/Delete";
export const API_BRAND_EDIT = API_BRAND_URL + "/Edit";
//*******************CARRITO********************************

export const API_CART_URL = API_BASE_URL + "/Cart"
export const API_GET_CART = API_CART_URL + "/getCart"
export const API_ADD_ITEM_CART = API_CART_URL + "/AddItem"
export const API_REMOVE_ITEM =(cartItemId) => `${API_CART_URL}/RemoveItem/${cartItemId}`

export const API_UPDATE_ITEM = (cartItemId) => `${API_CART_URL}/UpdateQuantity/${cartItemId}`







//********************VENTA********************************
export const API_VENTA_URL = API_BASE_URL + "/Venta";
export const API_VENTA_REGISTRAR = API_VENTA_URL + "/Registrar";
export const API_VENTA_LISTAR = API_VENTA_URL + "/Listar";
export const API_VENTA_CAMBIAR_ESTADO = (idVenta) => `${API_VENTA_URL}/${idVenta}/estado`