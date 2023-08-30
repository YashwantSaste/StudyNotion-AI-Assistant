const express =require("express");
const cors=require("cors");
const OpenAI=require("openai");
// import readline from 'readline'
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

const openai = new OpenAI({
    apiKey: "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"
});

// (async () => {
//     try {
//         const chatCompletion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{"role": "user", "content": "Hello!"}],
//         });
//         console.log(chatCompletion.choices[0].message);
//     } catch (error) {
//         console.log("Error in chat completion");
//         console.error(error);
//     }
// })();

// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   userInterface.prompt();

//   userInterface.on("line", async (input) => {
//     try {
//         const chatCompletion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: input }],
//         });

//         console.log(chatCompletion.choices[0].message.content);
//         userInterface.prompt();
//     } catch (error) {
//         console.log("Error in chat completion");
//         console.error(error);
//     }
// });

app.post("/", async (req, res) => {
    try {
        const { chats } = req.body;
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "You are an assistant bot for an Edtech Application called StudyNotion, keep your response upto 100 words",
                },
                ...chats,
            ],
        });

        const message = result?.choices?.[0]?.message;
        if (message) {
            res.status(200).json({
                success: true,
                output: message,
            });
        } else {
            res.status(404).json({
                success: false,
                output: "Unexpected response structure",
            });
        }
    } catch (error) {
        console.log("Error in chat completion");
        console.error(error);
        res.status(500).json({
            success: false,
            output: error.message,
        });
    }
});
