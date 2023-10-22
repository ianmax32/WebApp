const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

export default async function GetReport (message,name){
    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate for me a summary to send to the parents of student ${name} that has commited the following offenses ${message
            } and tell them that she will be on detention next friday and also give positive pointers on what the parents can do to make sure that the students does not commit that offenses again`,
          },
        ],
      };
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      };
      
    await fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('API response:', data.choices[0].message);
          return data.choices[0].message;
        })
        .catch(error => {
          console.error('API request error:', error);
        });
} 
