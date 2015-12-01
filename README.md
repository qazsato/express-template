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
    │       ├── components
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

## TODO
- [x] NodeのJSをES6に書き換え
- [ ] npm scriptsを他にも用意
- [ ] スプライト画像のフォルダ構成
- [ ] sourcemapsが正しく参照できない問題解消
- [ ] テンプレートエンジンを決める(jadeとejs)
- [ ] core.scss的なもの用意する
- [ ] browserifyの読み込みどうする?絶対パス?
- [ ] travis ci使う?
- [ ] herokuにデプロイする?
- [ ] 画像にフィンガープリントつける?
- [ ] angular/react使う?mongo使う?MEAN?
- [ ] linter用意する?
- [ ] テスト環境用意する?karma?
- [ ] strongmodeにする?
