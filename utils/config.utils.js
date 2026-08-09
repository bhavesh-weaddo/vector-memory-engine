import dotenv  from 'dotenv'
dotenv.config()

const APP_CONFIG ={ 
    'OPENAPI_KEY':process.env.OPENAI_API_KEY
}

export default  APP_CONFIG