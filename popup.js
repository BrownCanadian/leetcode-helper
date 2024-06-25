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

api_key = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg"
base_url = "https://api-alpha.julep.ai/api"

  async function getHints(probelmdata){
    client = Client(api_key=api_key, base_url=base_url)
    print("Client initialized successfully")
    console.log(probelmdata)
    

  }
  