import { Request, Response } from 'express'
import { uploadCSVFile } from '../fileService'

export const uploadCSV = async (req: Request, res: Response) => {
	try {
		// Checks if the CSV file was sent in the request
		if (!req.file || !req.file.buffer) {
			return res.status(400).json({ message: 'Nenhum arquivo CSV enviado.' })
		}

		// Calls the function to process the CSV file (using uploadCSVFile)
		// The uploadCSVFile function processes the file and returns formatted

		const result = await uploadCSVFile(req.file.buffer)

		if (result.success) {
			return res.status(200).json({ message: 'CSV file uploaded successfully.' })
		} else {
			return res.status(500).json({ message: 'Internal server error.' })
		}
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error.' })
	}
}
