import { Router } from 'express';
import { inventoryController } from '../../../controllers/inventory.controller';

const router = Router();

router.get('/', inventoryController.find)
router.get('/:id', inventoryController.findById)
router.post('/', inventoryController.create)
router.put('/:id', inventoryController.updateById)
router.delete('/:id', inventoryController.deleteById)
export default router;
