import fs from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { writeFileData } from './services/file.service.js'

console.log(await writeFileData('./user.json',{
    'user':"bhavesh kapoor",
    "role":"user"
}));