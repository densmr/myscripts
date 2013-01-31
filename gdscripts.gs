/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  SpreadsheetApp.setActiveSheet(SpreadsheetApp.openById("0AvAMsfbcuhxTdDV1MkZCcnQyNTVWQlBsWVBNcklId0E").getSheets()[0]);
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var text;
  var i;
  
  for (i = 1; i <= numRows - 1; i++) {
    if (values[i][0] != "") {
      text = values[i][0] + " android";
      Logger.log(text);
      text = values[i][0] + " андроид";
      Logger.log(text);
    }
    if (values[i][1] != "") {
      text = values[i][1] + " android";
      Logger.log(text);
      text = values[i][1] + " андроид";
      Logger.log(text);
    }
  }
};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  },{
    name : "Delete Empty Rows",
    functionName : "deleteEmptyRows"
  },{
    name : "Delete Text",
    functionName : "deleteText"
  }];
  sheet.addMenu("Script Center Menu", entries);
};



/**
 * Deletes all empty rows in the active sheet.
 *
**/
function deleteEmptyRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var numRows = sheet.getMaxRows();
  var numCols = sheet.getDataRange().getNumColumns();
  var rows = sheet.getRange(1, 1, numRows, numCols);

  var isDel = true;
  var i = 0;
  var j = 0;
  
  do {
    for (j = 0; j < numCols; j++)
      if (!rows.getCell(i + 1, j + 1).isBlank()) {
        isDel = false;
        i++;
        break;
      }
    
    if (isDel) {
      numRows = sheet.getMaxRows();
      rows = sheet.deleteRow(i+1).getRange(1, 1, numRows, numCols);
    }
    
    isDel = true;
  } while (i < numRows);
};



function deleteText() {
  var text = "&feature=apps_topselling_free";
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var numRows = sheet.getMaxRows();
  var col = 8;//sheet.getActiveCell().getColumn();
  var rows = sheet.getRange (1, 1, numRows, col);


  var i = 0;
  
  
  for (i = 1; i < numRows; i++) {
    var str = rows.getCell(i, col).getValue();
    while (str.search(text) != -1)
    str = str.replace(text,"");
    str = str.replace("&feature=apps_topselling_free","");
    rows.getCell(i, col).setValue(str);
  }

}

function removeRowWithDuplicates() {
  sheet = SpreadsheetApp.getActiveSheet();
  range = sheet.getActiveRange();
  rowNum = range.getNumRows();
  column = range.getColumn();
  
  for (i = 1; i < rowNum; i++) {
    if (range.getCell(i, column).isBlank())
      break;

    j = i + 1;
    
    while (j < rowNum)
      if (range.getCell(i, column).getValue().toLowerCase() == range.getCell(j, column).getValue().toLowerCase()) {
        sheet.deleteRow(j);
        rowNum--;
      } else {
        j++;
      }
  }
}
