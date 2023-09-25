import { parse } from 'csv-parse'
import { Readable } from 'stream'

interface CSVRow {
	name: string
	city: string
	country: string
	favorite_sport: string
}

export async function uploadCSVFile(fileBuffer: Buffer): Promise<{ success: boolean; data?: CSVRow[] }> {
	try {
		// Converts the file buffer into a readable stream
		const readableStream = new Readable()
		readableStream.push(fileBuffer)
		readableStream.push(null)

		// Parse the CSV from the stream
		const csvData = await parseCSVFromStream(readableStream)
		console.log(csvData)

		// To do: database storage (optional)

		return { success: true, data: csvData }
	} catch (error) {
		console.error('Error processing CSV file:', error)
		return { success: false }
	}
}

// Helper function to parse CSV from the stream
async function parseCSVFromStream(stream: Readable): Promise<CSVRow[]> {
	return new Promise((resolve, reject) => {
		const data: CSVRow[] = []

		stream
			.pipe(parse({ delimiter: ',' })) // csv file delimiter
			.on('data', (row: CSVRow) => {
				data.push(row)
			})
			.on('end', () => {
				resolve(data)
			})
			.on('error', (error: Error) => {
				reject(error)
			})
	})
}
