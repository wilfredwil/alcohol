import React, { useState, useEffect } from "react";
import "./styles.css";

const InventoryApp = () => {
    const [inventory, setInventory] = useState(() => {
        const savedInventory = localStorage.getItem("alcohol_inventory");
        return savedInventory ? JSON.parse(savedInventory) : [];
    });
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        localStorage.setItem("alcohol_inventory", JSON.stringify(inventory));
    }, [inventory]);

    const addAlcohol = () => {
        if (name && type && stock) {
            setInventory([...inventory, { id: Date.now(), name, type, stock: parseInt(stock) }]);
            setName("");
            setType("");
            setStock("");
        }
    };

    const updateStock = (id, change) => {
        setInventory(inventory.map(item =>
            item.id === id ? { ...item, stock: Math.max(item.stock + change, 0) } : item
        ));
    };

    const removeAlcohol = (id) => {
        setInventory(inventory.filter(item => item.id !== id));
    };

    return (
        <div className="container">
            <h1>Alcohol Inventory</h1>
            <div className="form">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                <button className="add-button" onClick={addAlcohol}>Add</button>
            </div>
            <ul className="inventory-list">
                {inventory.map(item => (
                    <li key={item.id} className="inventory-item">
                        <span>{item.name} ({item.type}) - {item.stock} left</span>
                        <div className="button-group">
                            <button className="increment" onClick={() => updateStock(item.id, 1)}>+1</button>
                            <button className="decrement" onClick={() => updateStock(item.id, -1)}>-1</button>
                            <button className="remove" onClick={() => removeAlcohol(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryApp;
