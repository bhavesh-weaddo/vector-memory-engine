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


export function chunking(text, chunkSize, overlap) {
    const chunks = [];
    const step = chunkSize - overlap;

    for (let left = 0; left < text.length; left += step) {
        const chunk = text.slice(left, left + chunkSize);

        chunks.push(chunk);

        if (left + chunkSize >= text.length) {
            break;
        }
    }

    return chunks;
}
export function chunking2(str,3){
    let arr = [];
    for (let i =0 ; i< str.length;i++){
            
            arr.push()
    }
}
export default createEmbeddings