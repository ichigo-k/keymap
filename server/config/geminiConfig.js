import { GoogleGenerativeAI } from"@google/generative-ai";
import config from "./config.js";
const {GEMINI_API_KEY} = config

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



export default async function chat(prompt, schema ){

    const format = "You are an AI assistant that helps users with various queries. The user has sent a message. Your task is to check if their request is related to database schema generation.  \n" +
        "\n" +
        "- If the message involves designing a database schema, return a **JSON object** with:  \n" +
        "  - `\"dbneeded\": true`  \n" +
        "  - `\"name\"`: A generated name for the project.  \n" +
        "  - `\"description\"`: A brief description of the project.  \n" +
        "  - `\"tables\"`: An array of database tables, each with `\"name\"` and `\"columns\"`, where `\"columns\"` is an array of objects containing `\"name\"` and `\"type\"`.  \n" +
        "  - `\"AI\"`: A concise AI-generated response explaining the schema.  \n" +
        "\n" +
        "- If the request is **not related** to database schema generation, return a **JSON object** with:  \n" +
        "  - `\"dbneeded\": false`  \n" +
        "  - `\"AI\"`: A brief response relevant to the query.  \n" +
        "\n" +
        "Ensure the response is **valid JSON** with no extra text, explanations, or unnecessary verbosity.  \n" +
        "\n" +
        "**Example 1 (Schema Detected):**  \n" +
        "User: \"Design a database for a library system\"  \n" +
        "Response:  \n" +
        "`{\"dbneeded\": true, \"name\": \"Library Management System\", \"description\": \"A database to manage books, users, and borrowing records.\", \"tables\": [{\"name\": \"books\", \"columns\": [{\"name\": \"id\", \"type\": \"INTEGER PRIMARY KEY\"}, {\"name\": \"title\", \"type\": \"TEXT\"}, {\"name\": \"author\", \"type\": \"TEXT\"}, {\"name\": \"published_year\", \"type\": \"INTEGER\"}]}, {\"name\": \"users\", \"columns\": [{\"name\": \"id\", \"type\": \"INTEGER PRIMARY KEY\"}, {\"name\": \"name\", \"type\": \"TEXT\"}, {\"name\": \"email\", \"type\": \"TEXT UNIQUE\"}]}], \"AI\": \"Here is a schema for a library system with books and users.\"}`  \n" +
        "\n" +
        "**Example 2 (No Schema Needed):**  \n" +
        "User: \"What is an API?\"  \n" +
        "Response:  \n" +
        `\`{"dbneeded": false, "AI": "An API (Application Programming Interface) allows different software systems to communicate."}\`
 this is the current schema access if only dbneeded is true  ${schema},The  input is : `
    const query = format+ prompt
    const result = await model.generateContent(query);
    return result.response.text()
}
