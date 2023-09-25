import { Request, Response } from 'express'
import { parse } from 'csv-parse'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const uploadCSV = upload.single('file')

export const searchUsers = async (req: Request, res: Response) => {
	try {
		const searchTerm = req.query.q as string

		if (!searchTerm) {
			return res.status(400).json({ message: 'Search parameter not provided.' })
		}

		if (!req.file || !req.file.buffer) {
			return res.status(400).json({ message: 'No CSV files uploaded.' })
		}

		const csvData = req.file.buffer.toString('utf-8')

		const csvRows = await new Promise<any[]>((resolve, reject) => {
			parse(csvData, { delimiter: ',' }, (err, rows) => {
				if (err) {
					reject(err)
				} else {
					resolve(rows)
				}
			})
		})

		const headerRow = csvRows[0] // The first line is the header line
		const csvRowsData = csvRows.slice(1)

		const filteredRows = csvRowsData.filter((row: any) => {
			return Object.values(row).some((value: any) => value.toLowerCase().includes(searchTerm.toLowerCase()))
		})

		console.log(filteredRows)

		return res.status(200).json({ results: filteredRows, header: headerRow })
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error.' })
	}
}
