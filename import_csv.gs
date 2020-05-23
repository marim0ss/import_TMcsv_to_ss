//csvインポート を目指す
// https://officeforest.org/wp/2018/11/25/google-apps-script%E3%81%A7csv%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E5%8F%96%E3%82%8A%E6%89%B1%E3%81%86/

// https://qiita.com/YusukeKameyama/items/5ae840ec8d4382a215db
//書き込む対象のSpread Sheetを定義
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName('csv_import');

const dir_myproducts= '1wYQVwWaTrUAkPk_8QDU0_hV4N04G7FN-',
    dir_tm_checker = '1jLd0QcsGI5baqpm9WdtUb0-f7CupbdJN',
    csv_id = '1Url7A7qlWq-UM52982icdTpoMr8RACB_P6B0yk7WJoc';  // shohyoのスプシ

//csv出なくてスプシになってる（？）をインポートする
function importsheet(){
  try {
    var csv_ss = SpreadsheetApp.openById(csv_id);
    var from_sheet = csv_ss.getActiveSheet();
    var values = from_sheet.getDataRange().getValues();
    //Logger.log('values全体:' + values);
    //console.log(values[1]);
    for (var i = 0; i < values.length; i++) {
      //console.log(values[i])
      sheet.appendRow(values[i])
    }
  } catch(e) {
    //失敗したらログをメールで送りつける
    Logger.log('失敗しっ☆')
    //MailApp.sendEmail('xxx@example.com', 'csvインポート失敗しました。',e.message);
  }
}