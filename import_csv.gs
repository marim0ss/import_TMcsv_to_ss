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

    //tmフォルダ特定
    let tm_checker_folder = DriveApp.getFolderById('1jLd0QcsGI5baqpm9WdtUb0-f7CupbdJN');
    Logger.log(tm_checker_folder.getName());
    
    // １つのファイルでも複数個所に設置できるので、親フォルダは１つとは限らない
    let tm_filesIte = tm_checker_folder.getFiles() // tmフォルダのファイル群を取得（イテレータ）
    while (tm_filesIte.hasNext()) {
      let tm_file = tm_filesIte.next();
      console.log('このフォルダにあるfile Name: ' + tm_file.getName());
      console.log('そのfile ID: ' + tm_file.getId());

      if (tm_file.getName() == fileName ) {
        console.log('------------------名前が一致するファイルをみっけ！------------------')
        console.log('------------------名前：' + tm_file.getName() + '------------------')
        console.log('------------------ID：' + tm_file.getId() + '------------------')
        csv_ss_id = tm_file.getId();
        let csv_ss = SpreadsheetApp.openById(csv_ss_id),
            from_sheet = csv_ss.getActiveSheet(),
            values = from_sheet.getDataRange().getValues();
        
        for (var i = 0; i < values.length; i++) {
          //console.log(values[i])
          sheet.appendRow(values[i])
        }
        Logger.log('id: ' + csv_ss_id +' のインポート完了せりっ☆');
        tm_checker_folder.removeFile(tm_file); //removeFile: フォルダからファイルの所属を解除する
        //(公式)ファイルは削除されないが、すべての親からファイルが削除された場合、そのファイルを検索するか[すべてのアイテム]ビューを使用しない限り、ドライブに表示されなくなる
        Logger.log('id: ' + csv_ss_id +' はゴミ箱にポイっ☆');
      }
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