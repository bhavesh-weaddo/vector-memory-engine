import createEmbeddings, { cosineSimilarity } from "../utils/embedding.utils.js";
import { readFilesData } from "./file.service.js";

const readMomory = async () => {
    try {
        return await readFilesData();
    } catch (err) {
        console.log(err)
    }
}

export const memoryResult = async (query, k,RELEVANCE_THRESHOLD=0.30) => {
    try {
        // create the embedding first for the user query
        let queryEmbeddings = await createEmbeddings(query)
        // fetch the existing stored memory result
        let userMemory = await readMomory()
        userMemory =  JSON.parse(userMemory)
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
        return res.filter((item)=>item.score >=RELEVANCE_THRESHOLD).slice(0, k);


    } catch (err) {
        throw err;
    }

}