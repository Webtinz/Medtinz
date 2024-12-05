const Inventory = require('../../../Models/InventoryPharma');

// add item
exports.addInventoryItem = async (req, res) => {
    try {
        const { drugName, drugDescription, quantityInStock, reorderLevel, price, batchNumber, expiryDate, supplierId } = req.body;

        const newItem = new Inventory({
            drugName,
            drugDescription,
            quantityInStock,
            reorderLevel,
            price,
            batchNumber,
            expiryDate,
            supplierId,
        });

        await newItem.save();

        res.status(201).json({
            message: 'Inventory item added successfully',
            item: newItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding inventory item', error: error.message });
    }
};

// UPDATE ITEM
exports.updateInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {drugName, drugDescription, quantityInStock, reorderLevel, price, batchNumber, expiryDate, supplierId  } = req.body;

        const updatedItem = await Inventory.findByIdAndUpdate(id, {drugName, drugDescription, quantityInStock, reorderLevel, price, batchNumber, expiryDate, supplierId  }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json({
            message: 'Inventory item updated successfully',
            item: updatedItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating inventory item', error: error.message });
    }
};


// search item
exports.searchInventory = async (req, res) => {
    try {
        const { name, supplierId } = req.query;
        const query = {};

        if (name) {
            query.drugName = { $regex: name, $options: 'i' };
        }
        if (supplierId) {
            query.supplierId = supplierId;
        }

        const items = await Inventory.find(query);

        if (items.length === 0) {
            return res.status(404).json({ message: 'No inventory items found' });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching inventory', error: error.message });
    }
};

// 