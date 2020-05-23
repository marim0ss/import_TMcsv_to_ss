const admin_mail_address = 'marumo_saori@be-engineer.com';
// 書き込むシート
const ss = SpreadsheetApp.getActiveSpreadsheet(),
    sheet = ss.getSheetByName('csv_import');

//csvは自動でスプシに変換されてるのでスプシとしてインポート
function importsheet(){
  try {
    // 対象のCSVファイルが置かれているフォルダ名、ファイル名を定義
    let folderName = "trademarks_checker",
        fileName = "syohyo", //対象とするcsv
        csv_ss_id = ''; //読み込むcsv id

    let folders = DriveApp.getFoldersByName(folderName),
        files = DriveApp.getFilesByName(fileName);  // 一覧を取得（複数ある可能性を考慮）

    while (files.hasNext()) {
        let file = files.next();
        if (file.getName() == fileName) {
          Logger.log('名前が一致するファイルのID:' + file.getId())
          
          csv_ss_id = file.getId()
          let csv_ss = SpreadsheetApp.openById(csv_ss_id);
          let from_sheet = csv_ss.getActiveSheet();
          let values = from_sheet.getDataRange().getValues();
          
          for (var i = 0; i < values.length; i++) {
            //console.log(values[i])
            sheet.appendRow(values[i])
          }
        }
      //終わったらファイルは削除する
      
      Logger.log(csv_ss_id +' のインポート完了せりっ☆');
    }
    Logger.log('全ファイルのインポート完了りっ☆')
  } catch(e) {
    //失敗したらログをメールで送りつける
    Logger.log('失敗しっ☆');
    //MailApp.sendEmail(admin_mail_address, 'csvインポート失敗しました。',e.message);
  }
}
/*csvインポート を目指す
https://officeforest.org/wp/2018/11/25/google-apps-script%E3%81%A7csv%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E5%8F%96%E3%82%8A%E6%89%B1%E3%81%86/

https://qiita.com/YusukeKameyama/items/5ae840ec8d4382a215db
*/