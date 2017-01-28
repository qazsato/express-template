# express-template
Node.jsのWebアプリケーションフレームワークExpressの雛形

## About


## Setup

1. Gitリポジトリの取得

        git clone https://github.com/qazsato/express-template.git

1. Node.jsインストール

    [Node.js](https://nodejs.org/ja/)をインストールします。

2. Visual Studio Codeインストール

    1. [VSCode](https://code.visualstudio.com/)をインストールします。  
    2. `Cmd + o`でプロジェクトを開きます。
    3. `Cmd + p`でエクスプローラーを開きます。
    4. `ext install @recommended:workspace`を入力します。
    5. 必要な拡張機能が表示されるので各々インストールします。
        - ESLint 
        - stylelint
        - EditorConfig

## Build & Launch

1. node_modulesのインストール
    1. `Cmd + Shift + p`でコマンドパレットを開きます。
    2. `task`と入力し、`Tasks: Run Task`を選択します。
    3. `install`を選択します。
2. プロジェクトのビルド
    1. `Cmd + Shift + p`でコマンドパレットを開きます。
    2. `task`と入力し、`Tasks: Run Build Task`を選択します。
3. プロジェクトの起動
    1. `Cmd + Shift + d`でデバッグを開きます。
    2. 左上にある再生ボタンを選択します。
    3. [http://localhost:3000](http://localhost:3000)で画面が表示されれば起動成功です。

## Directory

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
