import { stdin as input, stdout as output } from 'node:process'
import readline from 'node:readline/promises'
import OPEN_AI_CLIENT from './utils/openai.utils.js'
import { recentMessages, limitTokenBasesMessage, isMemorable } from './utils/token.utils.js'
import { writeFileData } from './services/file.service.js'
import { memoryResult } from './services/memory.service.js'
// create interface
const r1 = readline.createInterface({ input, output })

const context = [{
    "role": "system",
    "content": "you are the  senior gen ai developer who will answer about the user queries"
}]

async function askQuestion(firstinteraction = false) {
    try {
        const interfaceGreetting = firstinteraction == true ? 'Ask something? ' : 'user: ';
        const userQuery = await r1.question(interfaceGreetting)
        // add this in the user context 
        context.push({
            "role": "user",
            "content": userQuery
        })

        // let finalContext =  limitTokenBasesMessage(context,400)
        let fileWritten = await isMemorable(userQuery)
        // let queryResult = await memoryResult(userQuery, 2)

        // console.log(queryResult, "queryResult");
        // let memoryContext = queryResult.length > 0 ? queryResult.map((item) => {
        //     return `-${item.memory}`;
        // }).join('\n'): 'No relevant long-term memories found.'
        // // console.log("memory context is ", memoryContext)
        // let finalContext = [
        //     context[0],
        //     {
        //         'role': "system",
        //         "content":
        //             `
        //         Relevant long-term memories about the user:
        //         ${memoryContext}

        //         `
        //     },
        //      ...context.slice(1)
        // ]

        // send query to the open ai client
        const assistanceRes = await OPEN_AI_CLIENT.responses.create({
            model: 'gpt-4o-mini',
            input: context,
            temperature: 1,
            max_output_tokens: 200
        })

        context.push({
            'role': 'assistant',
            'content': assistanceRes.output_text
        })

        console.log("AI:", assistanceRes.output_text)
        askQuestion()
    } catch (err) {
        console.log(err)

    }
} 
askQuestion(true)
