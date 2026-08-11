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

export async function updateFileData(id, updatedMemory) {
    try {
        let fetchData = await readFilesData();
        fetchData = JSON.parse(fetchData)
        // filter that id 
        let index = fetchData.findIndex(Items => Items.id == id)
        if (index == -1) {
            return {
                "status": false,
                "message": "Memory not found!"
            }
        }
        fetchData[index] = {
            ...fetchData[index],
            memory: updatedMemory.memory,
            memory_type: updatedMemory.memory_type,
            embeddings: await createEmbeddings(updatedMemory.memory),
            updated_at: Date.now()
        }
        // update the record 

        let filePath = './user.json';
        await writeFile(filePath, JSON.stringify(fetchData, null, 2), 'utf-8')
        return {
            "status": true,
            "message": "Memory has been updated",
            "memory": updatedMemory
        }


    } catch (err) {
        console.log(err.message)
        throw err.message
    }

}