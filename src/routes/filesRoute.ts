import { Router } from 'express'
import multer from 'multer'
import { uploadCSV } from '../controllers/FilesController'

const router = Router()

// Multer configuration to save files to disk
// memoryStorage to buffer in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// CSV file upload route
router.post('/api/files', upload.single('file'), uploadCSV)

export default router
