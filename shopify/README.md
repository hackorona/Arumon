# README
- Shopify BenToGo プロジェクトのベースリポジトリ

# theme
## 事前準備
- [Theme Kit](https://shopify.github.io/themekit/#manual-installation) をインストール
- [Shopify Theme Kit でテーマを開発する](https://qiita.com/t-kurasawa/items/21f887fea399c0d07529)を参考に環境構築を行う

## ショップへのテーマ反映手順
1. `theme` フォルダへ移動
2. `theme get -l` を実行し、live となっているテーマIDを取得
3. `theme configure -p=パスワード -s=ショップ名.myshopify.com -t=テーマID` を実行し、config.yml を作成
4. `theme watch` を実行し、Shopify へ反映
5. `theme open` を実行し、反映を確認

# import_product_sample
## サンプル商品を入稿する手順
1. 商品管理ページに移動
2. インポートボタンを押す
3. `import_product_sample/products_export.csv` のファイルをインポートする
4. 反映を確認する

