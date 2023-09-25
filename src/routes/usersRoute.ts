import express from 'express'
import { searchUsers } from '../controllers/UsersController'

const router = express.Router()

router.get('/api/users', searchUsers)

export { router as usersRoute }
export default router
