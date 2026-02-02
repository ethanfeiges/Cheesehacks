// This code goes into your Google Apps Script (Extensions > Apps Script in Google Sheets)

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // Use first sheet
    const data = JSON.parse(e.postData.contents);

    // DELETE ACTION
    if (data.action === 'delete') {
      const targetEmail = data.email ? data.email.trim().toLowerCase() : "";
      const targetName = data.name ? String(data.name).trim().toLowerCase() : "";

      // Check if email is valid
      if (!targetEmail) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Email is required for cancellation.'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const rows = sheet.getDataRange().getValues();
      let deleted = false;

      // Indices for Name/Email pairs in the sheet (0-based)
      const memberIndices = [[2, 3], [4, 5], [6, 7], [8, 9]];

      // Iterate backwards to safely delete rows 
      for (let i = rows.length - 1; i >= 1; i--) { // Skip header
        const row = rows[i];
        let shouldDeleteRow = false;

        for (const [nameIdx, emailIdx] of memberIndices) {
          const currentEmail = String(row[emailIdx] || '').trim().toLowerCase();
          const currentName = String(row[nameIdx] || '').trim().toLowerCase();

          if (currentEmail === targetEmail) {
            if (targetName !== "") {
              // If name is provided, verify it matches
              if (currentName === targetName) {
                shouldDeleteRow = true;
              }
            } else {
              // Email match is sufficient if no name provided
              shouldDeleteRow = true;
            }
          }
        }

        if (shouldDeleteRow) {
          sheet.deleteRow(i + 1);
          deleted = true;
        }
      }
      SpreadsheetApp.flush(); // Force update

      if (deleted) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Registration cancelled successfully.' }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No registration found with this email.' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // REGISTRATION ACTION (Default)
    const newTeamName = data.teamName ? data.teamName.trim().toLowerCase() : "";
    const newEmails = (data.members || []).map(m => m.email.trim().toLowerCase());

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

      // Check emails in columns D, F, H, J
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

function DoOptions(e) {
  // Handle CORS preflight
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .appendHeader("Access-Control-Allow-Origin", "*");
}
