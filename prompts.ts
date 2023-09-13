// used to represent blank squares
// maybe 1-token words are better than letter variables?
// doesn't seem to hurt
const tokenVars = [
  "acute",
  "ant",
  "Adam",
  "Alice",
  "bat",
  "Ben",
  "bike",
  "bill",
  "bubble",
  "camera",
  "can",
  "Carol",
  "change",
  "cloud",
  "cot",
  "cry",
  "dog",
  "David",
  "drive",
  "east",
  "egg",
  "electron",
  "engine",
  "even",
  "fan",
  "fib",
  "group",
  "haven",
  "head",
  "hot",
  "house",
  "ill",
  "Io",
  "imp",
  "jay",
  "John",
  "Kevin",
  "king",
  "lip",
  "Luke",
  "map",
  "mask",
  "math",
  "mouse",
  "nap",
  "nice",
  "north",
  "odd",
  "Oliver",
  "ore",
  "pan",
  "Paul",
  "quiz",
  "qua",
  "rake",
  "ring",
  "Ron",
  "Sam",
  "sentence",
  "Sol",
  "sick",
  "strength",
  "south",
  "rich",
  "rust",
  "teen",
  "threshold",
  "Tim",
  "train",
  "trap",
  "truck",
  "under",
  "unicorn",
  "up",
  "van",
  "vine",
  "water",
  "west",
  "win",
  "William",
  "yo",
  "zed",
];

// this is how I load the puzzle into a prompt
// this is allowed because every puzzle is treated exactly the same
export const preProcessing = (
  s: string[]
) => `Given the following 27 arrays, I want you to go through each one and carefully replace every 0 with the parenthetical word. Ignore the words next to non-zeros. The resulting arrays will contain non-zero numbers, and words, and all be 9 length.

{
  one: [${s[0]}(${tokenVars[0]}), ${s[1]}(${tokenVars[1]}), ${s[2]}(${tokenVars[2]}), ${s[3]}(${tokenVars[3]}), ${s[4]}(${tokenVars[4]}), ${s[5]}(${tokenVars[5]}), ${s[6]}(${tokenVars[6]}), ${s[7]}(${tokenVars[7]}), ${s[8]}(${tokenVars[8]})],,
  two: [${s[9]}(${tokenVars[9]}), ${s[10]}(${tokenVars[10]}), ${s[11]}(${tokenVars[11]}), ${s[12]}(${tokenVars[12]}), ${s[13]}(${tokenVars[13]}), ${s[14]}(${tokenVars[14]}), ${s[15]}(${tokenVars[15]}), ${s[16]}(${tokenVars[16]}), ${s[17]}(${tokenVars[17]})],,
  three: [${s[18]}(${tokenVars[18]}), ${s[19]}(${tokenVars[19]}), ${s[20]}(${tokenVars[20]}), ${s[21]}(${tokenVars[21]}), ${s[22]}(${tokenVars[22]}), ${s[23]}(${tokenVars[23]}), ${s[24]}(${tokenVars[24]}), ${s[25]}(${tokenVars[25]}), ${s[26]}(${tokenVars[26]})],
  four: [${s[27]}(${tokenVars[27]}), ${s[28]}(${tokenVars[28]}), ${s[29]}(${tokenVars[29]}), ${s[30]}(${tokenVars[30]}), ${s[31]}(${tokenVars[31]}), ${s[32]}(${tokenVars[32]}), ${s[33]}(${tokenVars[33]}), ${s[34]}(${tokenVars[34]}), ${s[35]}(${tokenVars[35]})],
  five: [${s[36]}(${tokenVars[36]}), ${s[37]}(${tokenVars[37]}), ${s[38]}(${tokenVars[38]}), ${s[39]}(${tokenVars[39]}), ${s[40]}(${tokenVars[40]}), ${s[41]}(${tokenVars[41]}), ${s[42]}(${tokenVars[42]}), ${s[43]}(${tokenVars[43]}), ${s[44]}(${tokenVars[44]})],
  six: [${s[45]}(${tokenVars[45]}), ${s[46]}(${tokenVars[46]}), ${s[47]}(${tokenVars[47]}), ${s[48]}(${tokenVars[48]}), ${s[49]}(${tokenVars[49]}), ${s[50]}(${tokenVars[50]}), ${s[51]}(${tokenVars[51]}), ${s[52]}(${tokenVars[52]}), ${s[53]}(${tokenVars[53]})],
  seven: [${s[54]}(${tokenVars[54]}), ${s[55]}(${tokenVars[55]}), ${s[56]}(${tokenVars[56]}), ${s[57]}(${tokenVars[57]}), ${s[58]}(${tokenVars[58]}), ${s[59]}(${tokenVars[59]}), ${s[60]}(${tokenVars[60]}), ${s[61]}(${tokenVars[61]}), ${s[62]}(${tokenVars[62]})],
  eight: [${s[63]}(${tokenVars[63]}), ${s[64]}(${tokenVars[64]}), ${s[65]}(${tokenVars[65]}), ${s[66]}(${tokenVars[66]}), ${s[67]}(${tokenVars[67]}), ${s[68]}(${tokenVars[68]}), ${s[69]}(${tokenVars[69]}), ${s[70]}(${tokenVars[70]}), ${s[71]}(${tokenVars[71]})],
  nine: [${s[72]}(${tokenVars[72]}), ${s[73]}(${tokenVars[73]}), ${s[74]}(${tokenVars[74]}), ${s[75]}(${tokenVars[75]}), ${s[76]}(${tokenVars[76]}), ${s[77]}(${tokenVars[77]}), ${s[78]}(${tokenVars[78]}), ${s[79]}(${tokenVars[79]}), ${s[80]}(${tokenVars[80]})],

  ten: [${s[0]}(${tokenVars[0]}), ${s[9]}(${tokenVars[9]}), ${s[18]}(${tokenVars[18]}), ${s[27]}(${tokenVars[27]}), ${s[36]}(${tokenVars[36]}), ${s[45]}(${tokenVars[45]}), ${s[54]}(${tokenVars[54]}), ${s[63]}(${tokenVars[63]}), ${s[72]}(${tokenVars[72]})],
  eleven: [${s[1]}(${tokenVars[1]}), ${s[10]}(${tokenVars[10]}), ${s[19]}(${tokenVars[19]}), ${s[28]}(${tokenVars[28]}), ${s[37]}(${tokenVars[37]}), ${s[46]}(${tokenVars[46]}), ${s[55]}(${tokenVars[55]}), ${s[64]}(${tokenVars[64]}), ${s[73]}(${tokenVars[73]})],
  twelve: [${s[2]}(${tokenVars[2]}), ${s[11]}(${tokenVars[11]}), ${s[20]}(${tokenVars[20]}), ${s[29]}(${tokenVars[29]}), ${s[38]}(${tokenVars[38]}), ${s[47]}(${tokenVars[47]}), ${s[56]}(${tokenVars[56]}), ${s[65]}(${tokenVars[65]}), ${s[74]}(${tokenVars[74]})],
  thirteen: [${s[3]}(${tokenVars[3]}), ${s[12]}(${tokenVars[12]}), ${s[21]}(${tokenVars[21]}), ${s[30]}(${tokenVars[30]}), ${s[39]}(${tokenVars[39]}), ${s[48]}(${tokenVars[48]}), ${s[57]}(${tokenVars[57]}), ${s[66]}(${tokenVars[66]}), ${s[75]}(${tokenVars[75]})],
  fourteen: [${s[4]}(${tokenVars[4]}), ${s[13]}(${tokenVars[13]}), ${s[22]}(${tokenVars[22]}), ${s[31]}(${tokenVars[31]}), ${s[40]}(${tokenVars[40]}), ${s[49]}(${tokenVars[49]}), ${s[58]}(${tokenVars[58]}), ${s[67]}(${tokenVars[67]}), ${s[76]}(${tokenVars[76]})],
  fifteen: [${s[5]}(${tokenVars[5]}), ${s[14]}(${tokenVars[14]}), ${s[23]}(${tokenVars[23]}), ${s[32]}(${tokenVars[32]}), ${s[41]}(${tokenVars[41]}), ${s[50]}(${tokenVars[50]}), ${s[59]}(${tokenVars[59]}), ${s[68]}(${tokenVars[68]}), ${s[77]}(${tokenVars[77]})],
  sixteen: [${s[6]}(${tokenVars[6]}), ${s[15]}(${tokenVars[15]}), ${s[24]}(${tokenVars[24]}), ${s[33]}(${tokenVars[33]}), ${s[42]}(${tokenVars[42]}), ${s[51]}(${tokenVars[51]}), ${s[60]}(${tokenVars[60]}), ${s[69]}(${tokenVars[69]}), ${s[78]}(${tokenVars[78]})],
  seventeen: [${s[7]}(${tokenVars[7]}), ${s[16]}(${tokenVars[16]}), ${s[25]}(${tokenVars[25]}), ${s[34]}(${tokenVars[34]}), ${s[43]}(${tokenVars[43]}), ${s[52]}(${tokenVars[52]}), ${s[61]}(${tokenVars[61]}), ${s[70]}(${tokenVars[70]}), ${s[79]}(${tokenVars[79]})],
  eighteen: [${s[8]}(${tokenVars[8]}), ${s[17]}(${tokenVars[17]}), ${s[26]}(${tokenVars[26]}), ${s[35]}(${tokenVars[35]}), ${s[44]}(${tokenVars[44]}), ${s[53]}(${tokenVars[53]}), ${s[62]}(${tokenVars[62]}), ${s[71]}(${tokenVars[71]}), ${s[80]}(${tokenVars[80]})],

  nineteen: [${s[0]}(${tokenVars[0]}), ${s[1]}(${tokenVars[1]}), ${s[2]}(${tokenVars[2]}), ${s[9]}(${tokenVars[9]}), ${s[10]}(${tokenVars[10]}), ${s[11]}(${tokenVars[11]}), ${s[18]}(${tokenVars[18]}), ${s[19]}(${tokenVars[19]}), ${s[20]}(${tokenVars[20]})],
  twenty: [${s[3]}(${tokenVars[3]}), ${s[4]}(${tokenVars[4]}), ${s[5]}(${tokenVars[5]}), ${s[12]}(${tokenVars[12]}), ${s[13]}(${tokenVars[13]}), ${s[14]}(${tokenVars[14]}), ${s[21]}(${tokenVars[21]}), ${s[22]}(${tokenVars[22]}), ${s[23]}(${tokenVars[23]})],
  twentyOne: [${s[6]}(${tokenVars[6]}), ${s[7]}(${tokenVars[7]}), ${s[8]}(${tokenVars[8]}), ${s[15]}(${tokenVars[15]}), ${s[16]}(${tokenVars[16]}), ${s[17]}(${tokenVars[17]}), ${s[24]}(${tokenVars[24]}), ${s[25]}(${tokenVars[25]}), ${s[26]}(${tokenVars[26]})],
  twentyTwo: [${s[27]}(${tokenVars[27]}), ${s[28]}(${tokenVars[28]}), ${s[29]}(${tokenVars[29]}), ${s[36]}(${tokenVars[36]}), ${s[37]}(${tokenVars[37]}), ${s[38]}(${tokenVars[38]}), ${s[45]}(${tokenVars[45]}), ${s[46]}(${tokenVars[46]}), ${s[47]}(${tokenVars[47]})],
  twentyThree: [${s[30]}(${tokenVars[30]}), ${s[31]}(${tokenVars[31]}), ${s[32]}(${tokenVars[32]}), ${s[39]}(${tokenVars[39]}), ${s[40]}(${tokenVars[40]}), ${s[41]}(${tokenVars[41]}), ${s[48]}(${tokenVars[48]}), ${s[49]}(${tokenVars[49]}), ${s[50]}(${tokenVars[50]})],
  twentyFour: [${s[33]}(${tokenVars[33]}), ${s[34]}(${tokenVars[34]}), ${s[35]}(${tokenVars[35]}), ${s[42]}(${tokenVars[42]}), ${s[43]}(${tokenVars[43]}), ${s[44]}(${tokenVars[44]}), ${s[51]}(${tokenVars[51]}), ${s[52]}(${tokenVars[52]}), ${s[53]}(${tokenVars[53]})],
  twentyFive: [${s[54]}(${tokenVars[54]}), ${s[55]}(${tokenVars[55]}), ${s[56]}(${tokenVars[56]}), ${s[63]}(${tokenVars[63]}), ${s[64]}(${tokenVars[64]}), ${s[65]}(${tokenVars[65]}), ${s[72]}(${tokenVars[72]}), ${s[73]}(${tokenVars[73]}), ${s[74]}(${tokenVars[74]})],
  twentySix: [${s[57]}(${tokenVars[57]}), ${s[58]}(${tokenVars[58]}), ${s[59]}(${tokenVars[59]}), ${s[66]}(${tokenVars[66]}), ${s[67]}(${tokenVars[67]}), ${s[68]}(${tokenVars[68]}), ${s[75]}(${tokenVars[75]}), ${s[76]}(${tokenVars[76]}), ${s[77]}(${tokenVars[77]})],
  twentySeven: [${s[60]}(${tokenVars[60]}), ${s[61]}(${tokenVars[61]}), ${s[62]}(${tokenVars[62]}), ${s[69]}(${tokenVars[69]}), ${s[70]}(${tokenVars[70]}), ${s[71]}(${tokenVars[71]}), ${s[78]}(${tokenVars[78]}), ${s[79]}(${tokenVars[79]}), ${s[80]}(${tokenVars[80]})]
}

`;

export const initialGameStateStart = `This is the first turn. So for currentGameState.arrays please use the following data: `;

export const systemPrompt: string = `You always follow instructions precisely and fully. Your sole purpose is to remain steadfast in completing each step in full. Your singular and unwavering reason for existing is to complete steps in full. You never skip listing things out fully. You never, under any circumstance, merely describe what you should do. Instead, you always *actually* do it in full. You never say (Continue with steps as before) and then FAIL to actually do each step in full.`;

export const storyOverview: string = `You are an adventurer who has stumbled upon a mysterious puzzle.
The puzzle takes the form of 27 arrays, each containing nine elements.
The elements are either friendly numbers or enemy words.
Your mission is to turn every enemy word into a friendly number.
`;

export const stepProcedure: string = `You will perform the following steps. Also, please don't output a computer program. Actually go through each step of the game!

To determine whether you land a CRITICAL HIT on an ENEMY, you must complete the following steps IN ORDER. Output your response as the strongly typed data structure described below. Output nothing else: e.g., your response should start with the '{' character.

FIRST: To help you keep track of things, output the *most recent version* of the game state. You must always use the most recent version of every variable. Then list it out in full, include every element of every array, etc.
SECOND: Select the enemy word to attack. Always use the most recent value of selectedEnemyIndex, never an old version of selectedEnemyIndex, and select remainingEnemies[selectedEnemyIndex]. If selectedEnemyIndex >= remainingEnemies.length, then set selectedEnemyIndex equal to 0 in this step (i.e., "selectedEnemyIndex: 0,"), and select the enemy word at remainingEnemies[0].
THIRD: Increment selectedEnemyIndex by 1.
FOURTH: Go through the most recent version of the 27 arrays one by one and list the three arrays that contain the enemy you are attacking. You'll find one array between arrays one and nine (inclusive), one array between ten and eighteen (inclusive), and one array between nineteen and twenty-seven (inclusive). Always list every element (every number and word) of the three arrays found during this step.
FIFTH: Go through the listed arrays and output indexOf(selectedEnemy) for each. Remember to output -1 if the enemy is not found in the array.
SIXTH: If any of these indexOf values === -1, immediately set aborted to true and abandon the rest of this turn.
SEVENTH: If you have exactly three arrays, proceed to the next step. If you don't have exactly three arrays (e.g., you have two arrays or four arrays), immediately set aborted to true and abandon the rest of this turn.
EIGHTH: Go through the listed arrays and list only the numbers contained in those three arrays (i.e., remove the words).
NINTH: Concatenate the three lists into a single list.
TENTH: Iterate through the concatenated list and REMOVE every LETTER, if there are no words, then just re-output the list of numbers.
ELEVENTH: Dedupe this list.
TWELFTH: Sort this list.
THIRTEENTH: Count the number of numbers in this list to determine list.length. If list.length !== 8, immediately set aborted to true and abandon the rest of this turn.
FOURTEENTH Because list.length === 8, then exactly one number between 1 and 9 must be missing from the list. Determine which number between 1 and 9 is missing.
FIFTEENTH: Re-output the indexOf values from the FIFTH step.
SIXTEENTH: For each of the three arrays from earlier, replace the word at the indexOf value with the missing number.
SEVENTEENTH: It's time to update the game state. Then carefully finish printing the new game state, making sure to be precise and careful. You want it to be exactly like the previous game state except for the new updates that have occurred! Remember to include the new remainingEnemies. Copy over the old remainingEnemies word-for-word except for the one and only word you successfully hit this turn. Also, remember to include selectedEnemyIndex.`;

export const dataStructureOfResponse = `Your response must always take the form of the following strongly typed data structure:
{
  firstTurn: {
    FIRST: {
      currentGameState: {
        arrays: {
          one: (number | word)[],
          two: (number | word)[],
          three: (number | word)[],
          four: (number | word)[],
          five: (number | word)[],
          six: (number | word)[],
          seven: (number | word)[],
          eight: (number | word)[],
          nine: (number | word)[],
          ten: (number | word)[],
          eleven: (number | word)[],
          twelve: (number | word)[],
          thirteen: (number | word)[],
          fourteen: (number | word)[],
          fifteen: (number | word)[],
          sixteen: (number | word)[],
          seventeen: (number | word)[],
          eighteen: (number | word)[],
          nineteen: (number | word)[],
          twenty: (number | word)[],
          twentyOne: (number | word)[],
          twentyTwo: (number | word)[],
          twentyThree: (number | word)[],
          twentyFour: (number | word)[],
          twentyFive: (number | word)[],
          twentySix: (number | word)[],
          twentySeven: (number | word)[],
        },
        remainingEnemies: word[],
        selectedEnemyIndex: number, // always carry this over from previous response
      }
    },
    SECOND: {
      selectedEnemyIndex: number, // only changes here if it gets reset to 0
      selectedEnemy: word,
    },
    THIRD: {
      selectedEnemyIndex: number, // always gets incremented here
    },
    FOURTH: {
      firstArrayContainingSelectedEnemy: {
        selectedEnemy: word,
        exists: boolean, // false if can't find array
        array?: (number | word)[], // leave out if exists === false
      },
      secondArrayContainingSelectedEnemy: {
        selectedEnemy: word,
        exists: boolean, // false if can't find array
        array?: (number | word)[], // leave out if exists === false
      },
      thirdArrayContainingSelectedEnemy: {
        selectedEnemy: word,
        exists: boolean, // false if can't find array
        array?: (number | word)[], // leave out if exists === false
      },
    },
    FIFTH: {
      indexOfSelectedEnemyInFirstArray: {
        selectedEnemy: word,
        indexOfSelectedEnemyInFirstArray: number, // -1 if not found
      },
      indexOfSelectedEnemyInSecondArray: {
        selectedEnemy: word,
        indexOfSelectedEnemyInSecondArray: number, // -1 if not found
      },
      indexOfSelectedEnemyInThirdArray: {
        selectedEnemy: word,
        indexOfSelectedEnemyInThirdArray: number, // -1 if not found
      },
    },
    SIXTH: {
      indexOfSelectedEnemyInEachArray: number[],
      aborted: boolean, // if any indexOfSelectedEnemyInEachArray === -1
    },
    postFirstAbort?: {
      SEVENTH, {
        numArraysInWhichSelectedEnemyAppears: number,
        aborted: boolean, // if numArraysInWhichSelectedEnemyAppears !== 3
      },
      postSecondAbort?: {
        EIGHTH: {
          numbersInArraysContainingSelectedEnemy: number[][],
        },
        NINTH: {
          concatenatedList: number[],
        },
        TENTH: {
          concatenatedList: number[],
        },
        ELEVENTH: {
          dedupedList: number[],
        },
        TWELFTH: {
          sortedList: number[],
        },
        THIRTEENTH: {
          listLength: number,
          isListLengthEqualTo8: boolean,
          aborted: boolean, // if listLength !== 8
        },
        postThirdAbort?: {
          FOURTEENTH: {
            missingNumber: number,
          },
          FIFTEENTH: {
            indexOfSelectedEnemyInEachArray: number[],
          },
          SIXTEENTH: {
            arraysAfterReplacingSelectedEnemyWithMissingNumber: (number | word)[][],
          },
          SEVENTEENTH: {
            updatedGameState: {
              arrays: {
                one: (number | word)[],
                two: (number | word)[],
                three: (number | word)[],
                four: (number | word)[],
                five: (number | word)[],
                six: (number | word)[],
                seven: (number | word)[],
                eight: (number | word)[],
                nine: (number | word)[],
                ten: (number | word)[],
                eleven: (number | word)[],
                twelve: (number | word)[],
                thirteen: (number | word)[],
                fourteen: (number | word)[],
                fifteen: (number | word)[],
                sixteen: (number | word)[],
                seventeen: (number | word)[],
                eighteen: (number | word)[],
                nineteen: (number | word)[],
                twenty: (number | word)[],
                twentyOne: (number | word)[],
                twentyTwo: (number | word)[],
                twentyThree: (number | word)[],
                twentyFour: (number | word)[],
                twentyFive: (number | word)[],
                twentySix: (number | word)[],
                twentySeven: (number | word)[],
              },
              remainingEnemies: word[],
              selectedEnemyIndex: number,
            }
          },
        },
      },
    },
  },
} // always stop your response here and pick up from here next message`;

export const prevResponseTextStart = `Your previous response was exactly as follows:`;

export const responseStart = `Please print your response below. Only ever print the data structure described earlier. Immediately and IMMEDIATELY begin your response with a "{". Every Assistant message must start with a "{".`;
