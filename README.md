# express-template
Node.jsのWebアプリケーションフレームワークExpressの雛形

## 環境構築手順

1. Node.jsインストール  
  https://nodejs.org/en/

2. gulpインストール  
  フロントエンドのタスクランナーとして利用するため下記コマンドを実行。  


    sudo npm install -g gulp

3. node-devインストール  
  サーバサイドの自動再起動で利用するため下記コマンドを実行。  


    sudo npm install -g node-dev

4. node-inspectorインストール  
  サーバサイドのデバッグ環境として利用するため下記コマンドを実行。  


    sudo npm install -g node-inspector

5. express-template内の各種パッケージインストール  
  express-templateフォルダ直下のpackage.jsonに定義しているパッケージをインストールするため下記コマンドを実行。  


    cd /hogehoge/express-template
    npm install

6. express-templateの実行  
  下記コマンドを実行しブラウザが起動したら環境構築完了。  


    npm run dev  # 開発用コマンド  
    npm run prod # 本番用コマンド

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
    │       ├── images
    │       ├── scripts
    │       └── styles
    ├── routes
    │   └── index.js
    └── views
        ├── index.jade
        └── layout.jade


## 参考
- Express

  http://expressjs.com/
- Jade

  http://jade-lang.com/

- Sass

  http://sass-lang.com/

- Babel

  https://babeljs.io/
