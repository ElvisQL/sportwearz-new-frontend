import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../api/authService.js";
import axios from "axios";
import {API_CART_URL, API_CREATE_USER, API_GET_CART} from "../../utilities/baseUrl.jsx";
import {addItem, getCart, removeItem, updateItem} from "../../api/cartService.js";
import {registrarVenta} from "../../api/ordersService.js";


const userDefaultState = {
    _id: null,
    username: "",
    email: "",
    role:"",
    token:"",
    cart: {
        cartItems: [],
        totalPrice : 0
    },
    wishList:[]

};

const initialState = {
    user: userDefaultState,
    redirectMessage: "",
}

export const emptyCart = createAction('cart/emptyCart');

export const createUser = createAsyncThunk(
    "user/createUser",
    async (data, thunkAPI) => {
        try {
            console.log(data);
            const response = await axios.post(API_CREATE_USER, data);
            console.log(response);
            return response.data; // Suponiendo que devuelve el token u otra info
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, passwordHash }, thunkAPI) => {
        try {
            const response = await login({ email, passwordHash }); // Llama al endpoint /Auth
            console.log(response)
            if (response.data.success) {

                return response.data.response; // Devuelve UserSessionDTO
            } else {
                return thunkAPI.rejectWithValue(response.data.message); // Maneja errores
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de conexión");
        }
    }
);

export const addToCart = createAsyncThunk('user/addToCart', async (data,{rejectWithValue})=> {
    try {
        console.log(data)
        const response = await addItem(data);
        console.log(response);
        return response.response;
    }
    catch (e) {
        console.log(e);
        return rejectWithValue(e.response?.data?.message) || 'error al agregar al carrito'
    }
})
// Eliminar un producto del carrito
export const removeFromCart = createAsyncThunk(
    'user/removeFromCart',
    async (itemId, { rejectWithValue }) => {
        try {

            const response = await removeItem(itemId);
            console.log(response)
            return response.response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Error eliminando producto");
        }
    }
);

export const updateItemQuantity = createAsyncThunk('user/updateItem', async ({cartItemId, quantity}, { rejectWithValue }) => {
    try {

        const response = await updateItem({cartItemId,quantity});
        console.log(response)
        return response.response;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || "Error actualizando producto");
    }
})

export const finalizarCompra = createAsyncThunk(
    'user/finalizarCompra',
    async (ventaData, { dispatch, rejectWithValue }) => {
        try {
            console.log("llegue aquiiiii")
            const response = await registrarVenta(ventaData);
            console.log(response)
            // Vaciar carrito SOLO si el backend responde OK
            if(response.data.success){
                dispatch(emptyCart());
            }


            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
           state.user = userDefaultState;
        },
        updateCart: (state, action) => {
            state.cart = action.payload; // Actualiza el carrito en el estado
        },
        updateWishList: (state, action) => {
            state.wishList = action.payload; // Actualiza la lista de deseos
        },
    },
    extraReducers: (builder) => {
        builder
            // Login de usuario
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const { userId, username, email, role, token ,cart} = action.payload;
                state.user = {
                    _id: userId,
                    username: username,
                    email: email,
                    role: role.roleName, // Asegúrate de que Role.RoleName esté definido
                    token: token,
                    cart: cart?  {
                        cartItems : cart.cartItems,
                        totalPrice: cart.totalPrice
                    } : [],
                    wishList: [],
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.cart.cartItems = action.payload.cartItems;
                state.user.cart.totalPrice = action.payload.totalPrice;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // RemoveFromCart
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.cart.cartItems = action.payload.cartItems;
                state.user.cart.totalPrice = action.payload.totalPrice;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateItemQuantity.pending,(state,action)=>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateItemQuantity.rejected,(state,action)=> {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateItemQuantity.fulfilled, (state,action) => {
                state.isLoading = false;
                state.error = null;
                state.user.cart.cartItems = action.payload.cartItems;
                state.user.cart.totalPrice = action.payload.totalPrice;
            })
            .addCase(finalizarCompra.pending,(state,action)=>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(finalizarCompra.rejected,(state,action)=> {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(emptyCart, (state) => {
                state.user.cart.cartItems = [];
                state.user.cart.totalPrice = 0;
            });




/*
            // ClearCart
            .addCase(clearCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.isLoading = false;
                state.user.cart = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });*/

    }
})

export const { logout, updateCart, updateWishList } = userSlice.actions;
export const getCurrentUser = (state) => state.user.user;
export default userSlice.reducer;