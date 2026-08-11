import createEmbeddings, { cosineSimilarity } from "../utils/embedding.utils.js";
import { readFilesData } from "./file.service.js";

const readMomory = async () => {
    try {
        return await readFilesData();
    } catch (err) {
        console.log(err)
    }
}

export const memoryResult = async (query, k, RELEVANCE_THRESHOLD = 0.30) => {
    try {
        // create the embedding first for the user query
        let queryEmbeddings = await createEmbeddings(query)
        // fetch the existing stored memory result
        let userMemory = await readMomory()
        userMemory = JSON.parse(userMemory)
        let res = userMemory.map((memory) => {
            // calculate score of each embeddings
            let score = cosineSimilarity(queryEmbeddings, memory.embeddings)
            return {
                id: memory.id,
                memory: memory.memory,
                memory_type: memory.memory_type,
                score
            }
        });
        // 4. Highest similarity first
        res.sort((a, b) => b.score - a.score);
        return res.filter((item) => item.score >= RELEVANCE_THRESHOLD).slice(0, k);


    } catch (err) {
        throw err;
    }

}


export async function checkDuplicacy(userMessage, DUPLICACY_THRESHOLD = 0.50) {
    try {
        let userMemory = await readMomory();
        userMemory = JSON.parse(userMemory);
        let userEmbeddings = await createEmbeddings(userMessage);
        // create embedding score 
        let memories = userMemory.map((memory) => {
            return {
                "id": memory.id,
                "memory": memory.memory,
                "memory_type": memory.memory_type,
                "duplicacyScore": cosineSimilarity(userEmbeddings, memory.embeddings)
            }

        })
        memories.sort((a, b) => b.duplicacyScore - a.duplicacyScore)
        const bestMatch = memories[0];
        if (bestMatch && bestMatch?.duplicacyScore.toFixed(2) >= DUPLICACY_THRESHOLD) {
            return {
                isDuplicate: true,
                match: bestMatch
            }
        } else {
            return {
                isDuplicate: false,
                match: bestMatch || []
            }
        }

    } catch (err) {
        console.log("something went wrong" , err.message);
        throw err;
    }
}

