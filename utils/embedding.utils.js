import OPEN_AI_CLIENT from "./openai.utils.js";

async function createEmbeddings(message) {
    const res = await OPEN_AI_CLIENT.embeddings.create({
        model: "text-embedding-3-small",
        input: message
    })
    return res.data[0].embedding;


}

export function cosineSimilarity(a, b) {
    let dotProduct = 0;
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
    }
    return dotProduct;
}

export default createEmbeddings