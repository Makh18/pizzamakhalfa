import express from "express"
const router=express.Router()
import {getAdminProducts, getProductById, deleteProduct,
    createProduct,
    updateProduct, createProductReview} from '../controllers/productController.js'

import { protect, admin } from '../middelware/authMiddleware.js'

router.route('/').get(getAdminProducts).post(protect, admin, createProduct)


router
.route('/:id')
.get(getProductById)
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router