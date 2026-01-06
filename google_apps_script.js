// This code goes into your Google Apps Script (Extensions > Apps Script in Google Sheets)

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Normalize inputs for comparison
    const newTeamName = data.teamName.trim().toLowerCase();
    const newEmails = data.members.map(m => m.email.trim().toLowerCase());

    // Get all existing data
    const rows = sheet.getDataRange().getValues();
    
    // Skip header row
    const existingData = rows.slice(1);

    // Check for duplicates
    for (let i = 0; i < existingData.length; i++) {
      const row = existingData[i];
      // Assuming column B (index 1) is Team Name
      const existingTeamName = String(row[1]).trim().toLowerCase();
      
      if (existingTeamName === newTeamName) {
        return ContentService.createTextOutput(JSON.stringify({ 
          status: 'error', 
          message: 'Team name already taken (names are case-insensitive)' 
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Check emails in columns D, F, H, J (indices 3, 5, 7, 9)
      // Map based on your sheet structure. 
      // Assuming: Timestamp, Team Name, M1 Name, M1 Email, M2 Name, M2 Email, etc.
      // Emails are at indices: 3, 5, 7, 9
      const existingEmails = [row[3], row[5], row[7], row[9]]
        .filter(email => email) // Filter out empty cells
        .map(email => String(email).trim().toLowerCase());

      for (const newEmail of newEmails) {
        if (existingEmails.includes(newEmail)) {
           return ContentService.createTextOutput(JSON.stringify({ 
            status: 'error', 
            message: `Email ${newEmail} is already registered with another team` 
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // If no duplicates, append the new row
    const timestamp = new Date();
    
    // Prepare the row data
    // Timestamp, Team Name, M1 Name, M1 Email, M2 Name, M2 Email...
    const rowData = [
      timestamp, 
      data.teamName,
      data.members[0]?.name || '',
      data.members[0]?.email || '',
      data.members[1]?.name || '',
      data.members[1]?.email || '',
      data.members[2]?.name || '',
      data.members[2]?.email || '',
      data.members[3]?.name || '',
      data.members[3]?.email || ''
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: e.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doOptions(e) {
  // Handle CORS preflight
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .appendHeader("Access-Control-Allow-Origin", "*");
}
