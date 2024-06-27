// // const btn = document.querySelector('.hintbutton');

// // btn.addEventListener('click',async ()=>{
// //     console.log('hello ji');
// //     let [tab] = await chrome.tabs.query({active : true, currentWindow : true});

// //     chrome.scripting.executeScript({
// //         target : { tabId : tab.id},
// //         function: getText
// //     })

// // })

// // function getText(){
// //     console.log("i am he")
// // }

// // popup.js

// // document.addEventListener('DOMContentLoaded', () => {
// //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// //       chrome.scripting.executeScript({
// //         target: { tabId: tabs[0].id },
// //         func: extractText
// //       }, (results) => {
// //         if (chrome.runtime.lastError) {
// //           console.error(chrome.runtime.lastError.message);
// //           document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
// //         } else if (results && results[0] && results[0].result) {
// //           document.getElementById('output').textContent = results[0].result;
// //         } else {
// //           document.getElementById('output').textContent = 'Failed to extract text';
// //         }
// //       });
// //     });
// //   });
  
// //   // This function will be executed as a content script in the current tab
// //   function extractText() {
// //     return document.body.innerText;
// //   }
  
// // popup.js

// document.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: extractText
//       }, async (results) => {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError.message);
//           document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
//         } else if (results && results[0] && results[0].result) {
//         const ans = await  getAgentId(results[0].result);
//           console.log(results[0].result);
//         //   document.getElementById('output').textContent = ans[0];
//         //   document.getElementById('output2').textContent = ans[1];
//         //   document.getElementById('output3').textContent = ans[2];
//         } else {
//           document.getElementById('output').textContent = 'Pls open a leetocde problem';
//         }
//       });
//     });
//   });
  
//   // This function will be executed as a content script in the current tab
//   function extractText() {
//     const element = document.querySelector('.elfjS');
//     console.log("here")
//     return element ? element.innerText : 'No content found in the specified div.';
//   }

//     // api_key = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg"
//     // base_url = "https://api-alpha.julep.ai/api"  

//     const apiKey = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";
//     async function getAgentId(problemdata){

//         const baseUrl = "https://api-alpha.julep.ai/api";
//         const agentData = {
//           name: "Jessica",
//           about: "Jessica's journey into the world of coding began in her teenage years when she developed a fascination for computers and how they work...",
//           instructions: [],
//           tools: [],
//           default_settings: {
//             temperature: 0.7,
//             top_p: 1,
//             min_p: 0.01,
//             presence_penalty: 0,
//             frequency_penalty: 0,
//             length_penalty: 1.0,
//             max_tokens: 150
//           },
//           model: "gpt-4",
//           docs: [],
//           metadata: {}
//         };
      
//         try {
//           const response = await fetch(`${baseUrl}/agents`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(agentData)
//           });
      
//           if (!response.ok) {
//             throw new Error(`Error creating agent: ${response.statusText}`);
//           }
      
//           const data = await response.json();
//           console.log('Agent created successfully:', data["id"]);
          


//           const responsed = await fetch('https://api-alpha.julep.ai/api/sessions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//               },
//             body: JSON.stringify({
//               "agent_id": data["id"],
//               "situation" : " You are Jessica. You are a coding genius. return the list in an array form ",
              
//             }),
//         });
//         const data2 = await responsed.json();
//             const session_id = data2["id"];


//             const response_chat = await fetch(`https://api-alpha.julep.ai/api/sessions/${session_id}/chat`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//               },
//             body: JSON.stringify({
//               "messages": [
//                 {
//                   "content": problemdata + "Give me 3 hints for this problem. Each hint should be a short sentence under 10 words. Provide just the list of hints seprated by commas.",
//                   "role": "user"
//                 }
//               ]
//             }),
//         });
//         const chat = await response_chat.json();
//         const hints = chat["response"][0][0]["content"]
//         const arr = hints.split(",");
//         console.log(arr)
//         return arr

//         } catch (error) {
//           console.error(`Error: ${error.message}`);
//           return null;
//         }
      
        


//     }
    


document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: extractText
        }, async (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
            } else if (results && results[0] && results[0].result) {
                if (results[0].result === 'No content found in the specified div.') {
                    document.getElementById('output').textContent = 'Pls open a LeetCode problem';
                } else {
                    try {
                        const ans = await getAgentId(results[0].result);
                        console.log(ans[0]);
                        document.getElementById('output').textContent = ans[0];
                        document.getElementById('output2').textContent = ans[1];
                        document.getElementById('output3').textContent = ans[2];
                    } catch (error) {
                        console.error('Error:', error);
                        document.getElementById('output').textContent = 'Error: ' + error.message;
                    }
                }
            } else {
                document.getElementById('output').textContent = 'Pls open a LeetCode problem';
            }
        });
    });
});

// This function will be executed as a content script in the current tab
function extractText() {
    const element = document.querySelector('.elfjS');
    return element ? element.innerText : 'No content found in the specified div.';
}

const apiKey = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";

async function getAgentId(problemdata) {
    const baseUrl = "https://api-alpha.julep.ai/api";
    // const agentData = {
    //     name: "Jessica",
    //     about: "Jessica's journey into the world of coding began in her teenage years when she developed a fascination for computers and how they work...",
    //     instructions: [],
    //     tools: [],
    //     default_settings: {
    //         temperature: 0.7,
    //         top_p: 1,
    //         min_p: 0.01,
    //         presence_penalty: 0,
    //         frequency_penalty: 0,
    //         length_penalty: 1.0,
    //         max_tokens: 150
    //     },
    //     model: "gpt-4",
    //     docs: [],
    //     metadata: {}
    // };

     try {
    //     const response = await fetch(`${baseUrl}/agents`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${apiKey}`
    //         },
    //         body: JSON.stringify(agentData)
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Error creating agent: ${response.statusText}`);
    //     }

    //     const data = await response.json();
    //     console.log('Agent created successfully:', data["id"]);

        const responsed = await fetch(`${baseUrl}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "agent_id": "c576cc26-f111-482f-92ce-72994047e104",
                "situation": "You are Jessica. You are a coding genius. return the list in an array form",
            }),
        });

        const data2 = await responsed.json();
        const session_id = data2["id"];

        const response_chat = await fetch(`${baseUrl}/sessions/${session_id}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "messages": [
                    {
                        "content": problemdata + " Give me 3 hints for this problem. Each hint should be a short sentence under 10 words. Provide just the list of hints separated by commas.",
                        "role": "user"
                    }
                ]
            }),
        });

        const chat = await response_chat.json();
        const hints = chat["response"][0][0]["content"];
        const arr = hints.split(",");
        console.log(arr);
        return arr;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}
