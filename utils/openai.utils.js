import { OpenAI } from 'openai'
import APP_CONFIG from './config.utils.js'
const OPEN_AI_CLIENT = new OpenAI({
    apiKey: APP_CONFIG.OPENAPI_KEY
})

export default OPEN_AI_CLIENT