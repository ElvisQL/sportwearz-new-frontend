import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { getAllBrands} from '../api/brandService'; // Importa tus funciones de servicio
import {getCategories} from "../api/categoriesService";
import {useSearchParams} from "react-router-dom";

const Filters = ({ onFilterChange }) => {
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // Leer valores iniciales de la URL (IDs como números)
    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get('categoriaId')?.split(',').filter(Boolean).map(Number) || []
    );
    const [selectedBrands, setSelectedBrands] = useState(
        searchParams.get('marcaId')?.split(',').filter(Boolean).map(Number) || []
    );

    // Cargar categorías y marcas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                const brandsData = await getAllBrands();
                setCategories(categoriesData.response);
                setBrands(brandsData.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Notificar cambios en los filtros
    useEffect(() => {
        onFilterChange(selectedCategories, selectedBrands);
    }, [selectedCategories, selectedBrands]);

    return (
        <section className="filtros-box">
            <h1>Filtros:</h1>
            <div className="filters">
                <h3>Filtrar por: </h3>
                <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                    {/* Filtro de Categorías */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Categoría</Accordion.Header>
                        <Accordion.Body>
                            {categories.map((cat) => (
                                <label key={cat.categoryId}>
                                    <input
                                        type="checkbox"
                                        value={cat.categoryId}
                                        checked={selectedCategories.includes(cat.categoryId)}
                                        onChange={(e) => {
                                            const categoryId = Number(e.target.value);
                                            setSelectedCategories(prev =>
                                                e.target.checked
                                                    ? [...prev, categoryId]
                                                    : prev.filter(id => id !== categoryId)
                                            );
                                        }}
                                    />
                                    {cat.nombre}
                                </label>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* Filtro de Marcas */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Marca</Accordion.Header>
                        <Accordion.Body>
                            {brands.map((brand) => (
                                <label key={brand.brandId}>
                                    <input
                                        type="checkbox"
                                        value={brand.brandId}
                                        checked={selectedBrands.includes(brand.brandId)}
                                        onChange={(e) => {
                                            const brandId = Number(e.target.value);
                                            setSelectedBrands(prev =>
                                                e.target.checked
                                                    ? [...prev, brandId]
                                                    : prev.filter(id => id !== brandId)
                                            );
                                        }}
                                    />
                                    {brand.brandName}
                                </label>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </section>
    );
};

export default Filters;