import fs from 'node:fs'
import { writeFile, readFile } from 'node:fs/promises';
import createEmbeddings from '../utils/embedding.utils.js';

export async function readFilesData(filePath = './user.json') {
    if (fs.existsSync(filePath)) {
        let data = await readFile(filePath, 'utf-8');
        if (data == '') {
            return "[]"
        } else {
            return data
        }
    } else {
        return "[]"
    }
}

export async function writeFileData(filePath, message) {
    try {
        let data = await readFilesData(filePath);
        data = JSON.parse(data)
        message.embeddings = await createEmbeddings(message?.memory)
        data.push(message)
        return await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (err) {
        console.log(err)
        throw err;
    }

}