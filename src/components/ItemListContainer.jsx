import Card from "./Card";

const ItemListContainer = ({ productos }) => {
    return productos && productos.length > 0 ? (
        <div className="ItemList">
            {productos.map((p) => {
                return <Card key={p.productId} producto={p}></Card>;
            })}
        </div>
    ) : (
        <div className="not-found">
            <h4>No hay productos de esta categoria</h4>
        </div>
    );
};

export default ItemListContainer;
