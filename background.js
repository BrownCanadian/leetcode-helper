// // background.js

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['content.js']
//     });
//   });
  


// background.js

// Store your API key here
const API_KEY = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg';

// Inject content script when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchData') {
        getAgentId(request.problemdata).then((response) => {
            sendResponse({ data: response });
        }).catch((error) => {
            sendResponse({ error: error.message });
        });
        return true; // Keep the message channel open for sendResponse
    }
});

// Function to make API calls
async function getAgentId(problemdata) {
    const baseUrl = "https://api-alpha.julep.ai/api";
    try {
        const responsed = await fetch(`${baseUrl}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
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
                'Authorization': `Bearer ${API_KEY}`
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
        return arr;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}
