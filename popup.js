// document.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             func: extractText
//         }, async (results) => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//                 document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
//             } else if (results && results[0] && results[0].result) {
//                 if (results[0].result === 'No content found in the specified div.') {
//                     document.getElementById('output').style.display = 'block';
//                     document.getElementById('button1').style.display = 'none';
//                     document.getElementById('button2').style.display = 'none';
//                     document.getElementById('button3').style.display = 'none';
//                     document.getElementById('output').textContent = 'Pls open a LeetCode problem';
//                 } else {
//                     try {
//                         const ans = await getAgentId(results[0].result);
//                         console.log(ans[0]);
//                         document.getElementById('output1').textContent = ans[0];
//                         document.getElementById('output2').textContent = ans[1];
//                         document.getElementById('output3').textContent = ans[2];

//                         // Add event listeners to buttons after fetching data
//                         document.getElementById('button1').addEventListener('click', () => {
//                             document.getElementById('output1').style.display = 'block';
//                             document.getElementById('button1').style.display = 'none';
//                         });

//                         document.getElementById('button2').addEventListener('click', () => {
//                             document.getElementById('output2').style.display = 'block';
//                             document.getElementById('button2').style.display = 'none';
//                         });

//                         document.getElementById('button3').addEventListener('click', () => {
//                             document.getElementById('output3').style.display = 'block';
//                             document.getElementById('button3').style.display = 'none';
//                         });
//                     } catch (error) {
//                         console.error('Error:', error);
//                         document.getElementById('output').style.display = 'block';
//                         document.getElementById('output').textContent = 'Error: ' + error.message;
//                     }
//                 }
//             } else {
//                 document.getElementById('output').style.display = 'block';
//                 document.getElementById('output').textContent = 'Pls open a LeetCode problem';
//             }
//         });
//     });
// });

// // This function will be executed as a content script in the current tab
// function extractText() {
//     const element = document.querySelector('.elfjS');
//     return element ? element.innerText : 'No content found in the specified div.';
// }

// const apiKey = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";

// async function getAgentId(problemdata) {
//     const baseUrl = "https://api-alpha.julep.ai/api";
    

//      try {
//         const responsed = await fetch(`${baseUrl}/sessions`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify({
//                 "agent_id": "c576cc26-f111-482f-92ce-72994047e104",
//                 "situation": "You are Jessica. You are a coding genius. return the list in an array form",
//             }),
//         });

//         const data2 = await responsed.json();
//         const session_id = data2["id"];

//         const response_chat = await fetch(`${baseUrl}/sessions/${session_id}/chat`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify({
//                 "messages": [
//                     {
//                         "content": problemdata + " Give me 3 hints for this problem. Each hint should be a short sentence under 10 words. Provide just the list of hints separated by commas.",
//                         "role": "user"
//                     }
//                 ]
//             }),
//         });

//         const chat = await response_chat.json();
//         const hints = chat["response"][0][0]["content"];
//         const arr = hints.split(",");
//         console.log(arr);
//         return arr;

//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         return null;
//     }
// }



document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: extractText
        }, (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
            } else if (results && results[0] && results[0].result) {
                if (results[0].result === 'No content found in the specified div.') {
                    document.getElementById('output').style.display = 'block';
                    document.getElementById('button1').style.display = 'none';
                    document.getElementById('button2').style.display = 'none';
                    document.getElementById('button3').style.display = 'none';
                    document.getElementById('output').textContent = 'Pls open a LeetCode problem';
                } else {
                    // Send message to background.js to fetch data
                    chrome.runtime.sendMessage({ action: 'fetchData', problemdata: results[0].result }, (response) => {
                        if (response.data) {
                            const ans = response.data;
                            console.log(ans[0]);
                            document.getElementById('output1').textContent = ans[0];
                            document.getElementById('output2').textContent = ans[1];
                            document.getElementById('output3').textContent = ans[2];

                            // Add event listeners to buttons after fetching data
                            document.getElementById('button1').addEventListener('click', () => {
                                document.getElementById('output1').style.display = 'block';
                                document.getElementById('button1').style.display = 'none';
                            });

                            document.getElementById('button2').addEventListener('click', () => {
                                document.getElementById('output2').style.display = 'block';
                                document.getElementById('button2').style.display = 'none';
                            });

                            document.getElementById('button3').addEventListener('click', () => {
                                document.getElementById('output3').style.display = 'block';
                                document.getElementById('button3').style.display = 'none';
                            });
                        } else {
                            console.error('Error:', response.error);
                            document.getElementById('output').style.display = 'block';
                            document.getElementById('output').textContent = 'Error: ' + response.error;
                        }
                    });
                }
            } else {
                document.getElementById('output').style.display = 'block';
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