// Google Apps Script for Feedback Collection
// Deploy this as a web app in Google Apps Script

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Handle both form data and JSON
    let data;
    if (e.postData && e.postData.contents) {
      try {
        // Try to parse as JSON first
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON fails, use form parameters
        data = {
          username: e.parameter.username || 'anonymous',
          rating: e.parameter.rating || 'none',
          text: e.parameter.text || '',
          conversation_id: e.parameter.conversation_id || 'unknown'
        };
      }
    } else {
      // Use form parameters
      data = {
        username: e.parameter.username || 'anonymous',
        rating: e.parameter.rating || 'none',
        text: e.parameter.text || '',
        conversation_id: e.parameter.conversation_id || 'unknown'
      };
    }
    
    console.log('Received feedback data:', data);
    
    const row = [
      new Date(), // Timestamp
      data.username || 'anonymous',
      data.rating || 'none',
      data.text || '',
      data.conversation_id || 'unknown'
    ];
    
    sheet.appendRow(row);
    
    console.log('Feedback recorded to sheet:', row);
    
    // Return a simple success page
    return HtmlService.createHtmlOutput(`
      <html>
        <head>
          <title>Feedback Submitted</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: green; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="success">✅ Feedback submitted successfully!</div>
          <p>You can close this window.</p>
        </body>
      </html>
    `);
    
  } catch (error) {
    console.error('Error processing feedback:', error);
    
    return HtmlService.createHtmlOutput(`
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: red; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="error">❌ Error: ${error.toString()}</div>
        </body>
      </html>
    `);
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput(JSON.stringify({
    success: true,
    message: 'Feedback endpoint is working!',
    timestamp: new Date().toISOString()
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService.createTextOutput('')
    .setHeaders(headers);
} 