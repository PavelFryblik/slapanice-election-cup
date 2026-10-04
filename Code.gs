const SHEET_NAME = "Tips";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp","player","turnout",
        "party1_pct","party2_pct","party3_pct","party4_pct","party5_pct","party6_pct",
        "party1_seats","party2_seats","party3_seats","party4_seats","party5_seats","party6_seats",
        "jumper","most_votes","biggest_gap","top_votes"
      ]);
    }

    const lastRow = sheet.getLastRow();
    const names = lastRow > 1 ? sheet.getRange(2,2,lastRow-1,1).getValues().flat() : [];
    if (names.includes(data.player)) {
      return json({ok:false,error:"Tato přezdívka už tip odeslala."});
    }

    sheet.appendRow([
      new Date(), data.player, data.turnout,
      ...data.pcts,
      ...data.seats,
      data.jumper, data.mostVotes, data.biggestGap, data.topVotes
    ]);

    return json({ok:true});
  } catch (err) {
    return json({ok:false,error:String(err)});
  }
}

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return json({ok:true,tips:[]});

  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const tips = values.map(row => Object.fromEntries(headers.map((h,i)=>[h,row[i]])));
  return json({ok:true,tips});
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
