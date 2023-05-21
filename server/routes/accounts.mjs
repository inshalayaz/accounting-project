import express from 'express'

import { createAccount } from '../controllers/accounts.mjs'

const router = express.Router()

router.post('/', createAccount)

export default router