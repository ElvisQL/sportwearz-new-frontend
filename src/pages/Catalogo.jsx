import ItemListContainer from "../components/ItemListContainer.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Filters from "../components/Filters.jsx";
import {API_PRODUCT_CATALOG} from "../utilities/baseUrl.jsx";
import Loader from "../components/Loader.jsx";


export const Catalogo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estado inicial desde URL (convertir a números)
    const initialFilters = {
        categories: searchParams.get('categoriaId')?.split(',').map(Number) || [],
        brands: searchParams.get('marcaId')?.split(',').map(Number) || [],
        precioMin: Number(searchParams.get('precioMin')) || 0,
        precioMax: Number(searchParams.get('precioMax')) || 10000000,
        busqueda: searchParams.get('busqueda') || ''
    };

    const [filters, setFilters] = useState(initialFilters);

    // Actualizar productos al cambiar filtros
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {
                    ...filters,
                    categories: filters.categories.join(','),
                    brands: filters.brands.join(',')
                };

                const response = await axios.get(API_PRODUCT_CATALOG, { params: {
                        categoriaId: filters.categories.join(',') || '0', // Antes: categories
                        marcaId: filters.brands.join(',') || '0',         // Antes: brands
                        precioMin: filters.precioMin,
                        precioMax: filters.precioMax,
                        busqueda: filters.busqueda
                    } });
                console.log(response)
                setProducts(response.data.response);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [filters]);

    // Actualizar URL y estado
    const handleFilterChange = (selectedCategories, selectedBrands) => {
        const newFilters = {
            ...filters,
            categories: selectedCategories,
            brands: selectedBrands
        };

        // Convertir arrays vacíos a "0"
        const categoriaId = selectedCategories.length > 0 ? selectedCategories.join(',') : '0';
        const marcaId = selectedBrands.length > 0 ? selectedBrands.join(',') : '0';

        // Actualizar todos los parámetros en la URL
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('categoriaId', categoriaId);
        newSearchParams.set('marcaId', marcaId);
        newSearchParams.set('precioMin', newFilters.precioMin);
        newSearchParams.set('precioMax', newFilters.precioMax);
        newSearchParams.set('busqueda', newFilters.busqueda);

        setFilters(newFilters);
        setSearchParams(newSearchParams);
    };


    return (
        <div className="catalogo-page">
            <Filters onFilterChange={handleFilterChange} />
            {loading ? (
                <Loader/>
            ) : (
                <section className="productos-box">
                    <ItemListContainer productos={products} />
                </section>
            )}
        </div>
    );
};