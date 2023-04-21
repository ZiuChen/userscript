import path from 'path'
import process from 'process'
import * as dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
// load .env from dist or public depends on EXEC_WITH_TSX variable passed from package.json
const fpath = path.resolve(
  process.env.EXEC_WITH_TSX ? path.resolve(process.cwd(), 'public') : __dirname,
  '.env'
)
dotenv.config({ path: fpath })

export const pushplusToken = process.env.PUSHPLUS_TOKEN
export const gladosCookies = JSON.parse(process.env.GLADOS_COOKIES || '[]')
export const iKuuuCookies = JSON.parse(process.env.IKUUU_COOKIES || '[]')
export const v2freeCookies = JSON.parse(process.env.V2FREE_COOKIES || '[]')
