# express-template
Node.jsのWebアプリケーションフレームワークExpressの雛形

## 環境構築手順

1. Node.jsインストール  
  https://nodejs.org/en/

2. express-template内の各種パッケージインストール  
  express-templateフォルダ直下のpackage.jsonに定義しているパッケージをインストールするため下記コマンドを実行。  

    npm install

3. express-templateの実行  
  下記コマンドを実行しブラウザが起動したら環境構築完了。  


    npm run dev  # 開発用コマンド  
    npm run prd # 本番用コマンド

## ディレクトリ構成

    .
    ├── app.js
    ├── bin
    │   └── www
    ├── config
    │   ├── default.json
    │   ├── development.json
    │   └── production.json
    ├── package.json
    ├── gulpfile.js
    ├── public
    │   ├── dist
    │   └── src
    │       ├── components
    │       ├── images
    │       ├── scripts
    │       └── styles
    ├── routes
    │   └── index.js
    └── views
        ├── index.jade
        └── layout.jade
