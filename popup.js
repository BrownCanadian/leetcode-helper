// const btn = document.querySelector('.hintbutton');

// btn.addEventListener('click',async ()=>{
//     console.log('hello ji');
//     let [tab] = await chrome.tabs.query({active : true, currentWindow : true});

//     chrome.scripting.executeScript({
//         target : { tabId : tab.id},
//         function: getText
//     })

// })

// function getText(){
//     console.log("i am he")
// }

// popup.js

// document.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: extractText
//       }, (results) => {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError.message);
//           document.getElementById('output').textContent = 'Error: ' + chrome.runtime.lastError.message;
//         } else if (results && results[0] && results[0].result) {
//           document.getElementById('output').textContent = results[0].result;
//         } else {
//           document.getElementById('output').textContent = 'Failed to extract text';
//         }
//       });
//     });
//   });
  
//   // This function will be executed as a content script in the current tab
//   function extractText() {
//     return document.body.innerText;
//   }
  
// popup.js

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
          ans = getHints(results[0].result)
          document.getElementById('output').textContent = results[0].result;
        } else {
          document.getElementById('output').textContent = 'Pls open a leetocde problem';
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
    async function getHints(probelmdata){

        const baseUrl = "https://api-alpha.julep.ai/api";
        const agentData = {
          name: "Jessica",
          about: "Jessica's journey into the world of coding began in her teenage years when she developed a fascination for computers and how they work...",
          instructions: [],
          tools: [],
          default_settings: {
            temperature: 0.7,
            top_p: 1,
            min_p: 0.01,
            presence_penalty: 0,
            frequency_penalty: 0,
            length_penalty: 1.0,
            max_tokens: 150
          },
          model: "gpt-4",
          docs: [],
          metadata: {}
        };
      
        try {
          const response = await fetch(`${baseUrl}/agents`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(agentData)
          });
      
          if (!response.ok) {
            throw new Error(`Error creating agent: ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Agent created successfully:', data);
          return data;
        } catch (error) {
          console.error(`Error: ${error.message}`);
          return null;
        }
      
    }
  