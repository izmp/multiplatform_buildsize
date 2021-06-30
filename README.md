# multiplatform_buildsize

## 計測条件
- フレームワークでプロジェクトを作成する
- ウィンドウに設置されているすべてのUI要素を削除する
- タイトルを"multiplatform_buildsize" に変更
- 画面中央にボタンの設置 (text="exit")
  - ボタンを押すとアプリケーションの終了
- それ以外は一切手を加えない。
- リソースの削除なども行わない。
  - ただしソースフォルダ内に含まれる画像リソースの合計サイズは別途記録する

## 結果
|framework|version|target os|source size(KB)|image resource size(KB)|apk/binary size(KB)|installed application size(KB)|remarks|
|--|--|--|--|--|--|--|--|
|-|x.x.x|-|-KB|-KB|-KB|-KB|-|
