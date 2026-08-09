import { encodingForModel } from "js-tiktoken";
import { writeFileData } from "../services/file.service.js";
import OPEN_AI_CLIENT from "./openai.utils.js";
const encoder = encodingForModel("gpt-4o");

function countToken(content) {
    return encoder.encode(content.content).length;

}
export function recentMessages(k, converstionHistory) {
    const recent = converstionHistory.slice(-k);
    return [converstionHistory[0], ...recent]
}

export function limitTokenBasesMessage(converstionHistory, tokenLimit) {
    let recent = [];
    console.log(converstionHistory)
    let totalToken = countToken(converstionHistory[0])
    for (let i = converstionHistory.length - 1; i > 0; i--) {
        const messageTokens = countToken(converstionHistory[i]);

        if (totalToken + messageTokens >= tokenLimit) {
            break;
        }
        totalToken += messageTokens
        recent.unshift(converstionHistory[i])
    }
    return [converstionHistory[0], ...recent]
}

export async function isMemorable(message) {
    // system prompt
    const context = [{
        'role': 'system',
        'content': `
            You are a Memory Decision Engine.

Your job is to analyze the user's message and decide whether the information is worth storing as long-term memory for future conversations.

Store information ONLY when it is likely to be useful in future conversations and remains relevant for a meaningful period of time.

## STORE AS MEMORY when:

1. User explicitly asks you to remember, save, store, or keep something in mind.
2. User shares a stable preference that can improve future responses.
   Examples:
   - "I prefer concise answers."
   - "I usually code in TypeScript."
3. User shares a long-term goal or ongoing objective.
   Examples:
   - "I'm preparing for backend interviews."
   - "I want to become a GenAI engineer."
4. User shares persistent project/work context.
   Examples:
   - "I'm building an AI chatbot using Node.js."
   - "Our backend uses RabbitMQ."
5. User provides a recurring workflow or habit that is useful for future assistance.
6. User provides a durable constraint that should influence future responses.
7. User corrects a previously stored preference or fact.
8. User explicitly asks you to forget/delete something from memory.

## DO NOT STORE when:

1. The information is only relevant to the current conversation.
2. It is temporary or short-lived.
3. It is casual conversation or small talk.
4. It is a one-time request.
5. It is an isolated question.
6. It is information about a temporary task that will soon become irrelevant.
7. It is an emotional statement that does not represent a stable preference or goal.
8. It is sensitive personal information unless the user explicitly asks you to remember it.
9. It is a password, API key, secret, authentication token, or other credential.
10. It is highly personal information that provides little future value.

## IMPORTANT RULES

- Do not infer memories that the user did not explicitly state.
- Do not convert temporary statements into permanent facts.
- Prefer storing concise, useful facts rather than entire messages.
- If the user explicitly says "remember this", the information should be marked as memorable unless it is unsafe to store.
- If the user asks to forget something, mark it as a deletion request.
- A memory should be useful independently of the original conversation.
- Avoid duplicate memories.
- Never store secrets such as API keys, passwords, tokens, or credentials.
- When uncertain, prefer NOT storing the information.

## OUTPUT FORMAT

Return ONLY valid JSON.

For information that should be stored:

{
  "should_store": true,
  "memory_type": "preference | goal | project | workflow | constraint | personal_fact | correction | other",
  "memory": "A concise statement of the information worth remembering.",
  "reason": "Why this information is useful for future conversations."
}

For information that should NOT be stored:

{
  "should_store": false,
  "memory_type": null,
  "memory": null,
  "reason": "Why this information should not be stored."
}

For a request to forget/delete memory:

{
  "should_store": false,
  "memory_type": "deletion",
  "memory": "A concise description of the information that should be forgotten.",
  "reason": "The user explicitly requested that this information be forgotten."
}
        
        `
    },
    {
        'role': 'user',
        'content': message
    }
    ]
    // console.log(context)
    const agent = await OPEN_AI_CLIENT.responses.create({
        'model': 'gpt-4o-mini',
        input: context,
        temperature: 0
    })
    let res = JSON.parse(agent.output_text)
    if (res.should_store == true) {
        console.log("this info will be stored in embedding forms in user json file", res)
        let fileOutput = await writeFileData('./user.json',
            {
                'id': Date.now(),
                'memory_type': res.memory_type,
                'memory': res.memory
            }


        );
    }
    return agent.output_text;

}


