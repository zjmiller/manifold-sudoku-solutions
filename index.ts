// only env var is OPENAI_API_KEY
require("dotenv").config();

import OpenAI from "openai";
import {
  dataStructureOfResponse,
  initialGameStateStart,
  preProcessing,
  prevResponseTextStart,
  responseStart,
  stepProcedure,
  storyOverview,
  systemPrompt,
} from "./prompts";

const fs = require("fs");

const openai = new OpenAI();

// Log everything to a newly created file
const outputFileName = `${Date.now()}-sudoku-attempt.txt`;

function logToFile(message: string, addNewLine = true) {
  fs.appendFileSync(outputFileName, message + (addNewLine ? "\n" : ""));
}

// Handle GPT-4 API calls and log everything
let totalPromptTokens = 0;
let totalCompletionTokens = 0;
let totalTimeInMs = 0;

async function gpt4Call(messages: any) {
  const timeStart = Date.now();

  const completion = await openai.chat.completions.create({
    model: "gpt-4-32k-0314",
    messages,
    temperature: 0,
    top_p: 0,
  });

  const timeEnd = Date.now();

  totalTimeInMs += timeEnd - timeStart;

  if (completion.usage) {
    const promptTokens = completion.usage.prompt_tokens;
    const completionTokens = completion.usage.completion_tokens;

    totalPromptTokens += promptTokens;
    totalCompletionTokens += completionTokens;

    logToFile("\n\n\n");
    logToFile("METRICS:\n");
    logToFile(
      JSON.stringify(
        {
          id: completion.id,
          created: completion.created,
          model: completion.model,
          timeInMs: timeEnd - timeStart,
          timeInMin: (timeEnd - timeStart) / 1000 / 60,
          promptTokens,
          completionTokens,
          promptTokensCost: (promptTokens * 0.06) / 1000,
          completionTokensCost: (completionTokens * 0.12) / 1000,
          cost: (promptTokens * 0.06 + completionTokens * 0.12) / 1000,
          totalTimeInMs: totalTimeInMs,
          totalTimeInMin: totalTimeInMs / 1000 / 60,
          totalPromptTokens,
          totalCompletionTokens,
          totalPromptTokensCost: (totalPromptTokens * 0.06) / 1000,
          totalCompletionTokensCost: (totalCompletionTokens * 0.12) / 1000,
          totalCost:
            (totalPromptTokens * 0.06 + totalCompletionTokens * 0.12) / 1000,
        },
        undefined,
        2
      )
    );
  }

  const responseText = completion.choices[0].message.content;

  return responseText || "";
}

// Actually try to solve the Sudoku puzzle
async function processSudoku(puzzleStr: string, maxResponses: number) {
  logToFile(puzzleStr);

  // We have to split calls into two because otherwise we get 502 errors from OpenAI
  // This partialResponse is just the first half of the response.
  // We get the 2nd half by doing the exact same call but with the first half put at the end.
  let partialResponse = "";

  // This is the response from the previous turn. Except for the preprocessing step
  // at the beginning, this is always composed of two partial responses.
  let prevResponseText = "";

  // This is saved after the preprocessing step at the beginning.
  let initialGameState = "";

  // Which response we're on
  let i = 0;

  while (i < maxResponses) {
    logToFile("\n\n\n\n\n");
    logToFile(`Turn ${i + 1} out of max ${maxResponses}`);

    // The messages we send in the API request, depends on the response index
    let messages: any[];

    if (i === 0) {
      messages = [
        {
          role: "user",
          content: preProcessing(puzzleStr.split("")),
        },
      ];
    } else if (i === 1) {
      messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: storyOverview,
        },
        { role: "user", content: initialGameStateStart },
        { role: "user", content: initialGameState },
        { role: "user", content: stepProcedure },
        { role: "user", content: dataStructureOfResponse },
        { role: "user", content: responseStart },
      ];
    } else if (i === 2) {
      messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: storyOverview,
        },
        { role: "user", content: stepProcedure },
        { role: "user", content: dataStructureOfResponse },
        { role: "user", content: responseStart },
        { role: "assistant", content: partialResponse },
      ];
    } else if (i % 2 === 1) {
      // odd 3 and up (prev response, no partial response)
      messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: storyOverview,
        },
        { role: "user", content: stepProcedure },
        { role: "user", content: dataStructureOfResponse },
        { role: "user", content: prevResponseTextStart },
        { role: "user", content: prevResponseText },
        { role: "user", content: responseStart },
      ];
    } else {
      // even 4 and up (prev response and partial response)
      messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: storyOverview,
        },
        { role: "user", content: stepProcedure },
        { role: "user", content: dataStructureOfResponse },
        { role: "user", content: prevResponseTextStart },
        { role: "user", content: prevResponseText },
        { role: "user", content: responseStart },
        { role: "assistant", content: partialResponse },
      ];
    }

    logToFile("\n\n\n");
    logToFile("MESSAGES:\n");
    logToFile(JSON.stringify(messages, undefined, 2));

    const response = await gpt4Call(messages);

    // response from preprocessing request is saved as initial game state
    if (i === 0) {
      initialGameState = response;
    } else if (i % 2 === 0) {
      // if even, make new prevResponse out of partialResponse + response
      prevResponseText = partialResponse + response;
    } else if (i % 2 === 1) {
      // if odd, set partialResponse equal to response
      partialResponse = response;
    }

    logToFile("\n\n\n");
    logToFile("RESPONSE:\n");
    logToFile(response);

    i++;
  }
}

const puzzleStr = process.argv[2];
// Call to start solving the Sudoku puzzle
processSudoku(
  puzzleStr,
  99 // preprocessing is one Manifold "turn"; every other 2 API responses is one Manifold "turn"
);
