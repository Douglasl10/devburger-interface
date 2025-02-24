import { Table } from '../index';
import { useCart } from '../../hooks/CartContext';

export function CartItems() {
    const { cartProducts, increaseProducts, decreaseProduct } = useCart()
    
    
    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                </Table.Tr>
            </Table.Header>

            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map(product => (
                        <Table.Tr key={product.id}>
                        <Table.Td>
                            <img src={product.url}/>
                        </Table.Td>
                        <Table.Td>
                            {product.name}
                        </Table.Td>
                        <Table.Td>
                            {product.currencyValue}
                        </Table.Td>
                        <Table.Td>
                            {product.quantity}
                        </Table.Td>
                        
                        </Table.Tr>
                    ))
                ) :  (<div>carrinho vazio</div>
            )}
            </Table.Body>
        </Table.Root>
    );
}