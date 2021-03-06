# electron_buildsize

## 開発環境

- windows10
- node.js v14.17.1
- npm v7.19.0
- visual studio code v1.57.1
- typescript
  - javascript は絶対に書かない。
- webpack
  - electron では webview を使用してる。
  - typescript を直接扱えない。
  - import でも問題が起こる。
    - entry point のファイルにすべて記述するならば不要。
  - それらの問題を解決するのに webpack を使う。

## フォルダ構成

- project root
  - package.json
  - index.ts : entry point(typescript) release には含めない。
  - index.js : entry point(javascript) tsc で個別に生成。clear で削除。release に含める。git には含めない。
  - src : release には含めない。
    - index.ts : window script
  - build : clear で削除。release に含める。git には含めない。
    - bundle.js : webpack で生成。
  - index.html : window のソース。release に含める。
  - resource : release に含める。
    - \*.jpg : 画像リソース

## quick start

<https://www.electronjs.org/docs/tutorial/quick-start>

### node.js

- powershell を開く。
- `node -v` check version
- <https://nodejs.org/en/download/>
  - 古いバージョンに上書きインストールしてよい
- npm 自体のアップデート
  - 古いバージョンに上書きインストールした場合、npm は古いまま。
  - `npm update npm`
- npm が古すぎる場合

  > npm WARN npm npm does not support Node.js v14.17.1
  > npm WARN npm You should probably upgrade to a newer version of node as we
  > npm WARN npm can't make any promises that npm will work with this version.
  > npm WARN npm Supported releases of Node.js are the latest release of 6, 8, 9, 10, 11, 12, 13.
  > npm WARN npm You can find the latest version at <https://nodejs.org/>

  - <https://qiita.com/SakuraiYuki/items/cca5365e5cad02d24d83>
    > C:\Users\<ユーザー名>\AppData\Roaming\に移動
    > npm 関連フォルダ削除（安全のため、フォルダ名変更するだけでも可）
    > 削除対象：「npm」フォルダ、「npm-cache」フォルダ
  - npm をアンインストールではなく、npm フォルダを直接削除してから npm のインストール
  - `npm install -g npm`

### create project

- `electron_buildsize` フォルダの作成
- Visual studio Code で `electron_buildsize` フォルダを開く。
  - 以降 Visual Studio Code で作業する。
- package.json の作成
  - `npm init` を使う方法
    - visual studio code でフォルダを開いた状態でターミナルを開く。
    - `npm init` を実行する。
      > package name: (electron_buildsize)
      > version: (1.0.0)
      > description: electron build size
      > entry point: (index.js)
      > test command:
      > git repository:
      > keywords:
      > author:
      > license: (ISC)
      > ...
      > Is this OK? (yes)
      - author は Make する時に必須項目。
  - `package.json` を直接作成する方法
    - コピーしたりエディタで直接作成してもよい。

### electron のインストール

- 既にインストールされているか確認
  - `npm list electron`
- ローカルフォルダにインストール
  - `npm install --save-dev electron`
    - `npm i -D electron` でもよい
- (任意) package.json に開始スクリプトの追加

  - `npm start` コマンドで electron を起動できるようにする

    ```json
    "scripts": {
      "start": "electron ."
    }
    ```

  - この状態で実行してもエラーになる。
    > Error lanching app
    > Unable to find Electron app at (path)
    > Cannot find module (path)\index.js. Please verify that the package.json has a valid "main" entry
    - entry point のファイル(index.js) が存在しないから。
    - 空の index.js の場合はエラー無く起動するが終了しなくなる。

### typescript のインストール

- <https://www.typescriptlang.org/download>
- `npm i -D typescript`
- tsc コマンド
  - `npx tsc`
  - ターミナルから `tsc` では動作しない。
- tsconfig.json の生成
  - `npx tsc --init`
  - tsconfig.json が生成される。これで typescript の挙動を制御する。

### eslint の導入

- lint とは？

  - <https://eslint.org/docs/user-guide/getting-started>
    > ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
    > ESLint は、コードの一貫性を高め、バグを回避することを目的として、ECMAScript / JavaScript コードで見つかったパターンを識別してレポートするためのツールです。

- <https://eslint.org/docs/user-guide/getting-started>

  - install
    > npm install eslint --save-dev
  - setting
    > npx eslint --init
    > √ How would you like to use ESLint? · style  
    > √ What type of modules does your project use? · esm
    > √ Which framework does your project use? · none
    > √ Does your project use TypeScript? · No / Yes
    > √ Where does your code run? · browser
    > √ How would you like to define a style for your project? · guide
    > √ Which style guide do you want to follow? · google  
    > √ What format do you want your config file to be in? · JSON
    > Checking peerDependencies of eslint-config-google@latest
    > The config that you've selected requires the following dependencies:
    > @typescript-eslint/eslint-plugin@latest eslint-config-google@latest eslint@>=5.16.0 @typescript-eslint/parser@latest
    > √ Would you like to install them now with npm? · No / Yes

- visual studio code の拡張機能をインストール
  - ESLint 拡張機能をインストール
  - 再起動する
- tslint は deprecated

### prettier のインストール

- prettier とは？
  - <https://typescript-jp.gitbook.io/deep-dive/intro-2/prettier>
    > コードフォーマットを非常に簡単にします。
- <https://typescript-jp.gitbook.io/deep-dive/intro-2/prettier>
  - install
    > npm install prettier -D
- visual studio code の拡張機能のインストール
  - Prettier - Code formatter 拡張機能のインストール
  - <https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code-ja>
  - 手動でコードフォーマット
    > Format Document コマンドを試してみましょう。このコマンドは、コードの空白、行の折り返し、引用符を一貫したフォーマットに整えます。
    > macOS なら COMMAND + SHIFT + P キーを、 Windows なら CTRL + SHIFT + P キー を押します。
    > コマンドパレットで、format を検索し、Format Document を選択します。
  - 保存時に自動でコードフォーマット
    > Settings メニューを開きます。メニューが開いたら、Editor: Format On Save を検索し、そのオプションにチェック
    - さらに Editor: default Formatter で prettier を指定する必要がある
      - <https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021>
        > VSCode の設定は editor.codeActionsOnSave と editor.defaultFormatter を設定
    - この時、ユーザータブではなく、ワークスペースタブを選択してからチェックすると、プロジェクト単位の設定になる。

### eslint と prettier の競合

- `npm i -D eslint-config-prettier`

  - prettier と競合した時の eslint を無効にするもの
  - `.eslintrc.json` の `"extends"` の最後に追加する

  ```json
  "extends": ["",,, "prettier", "prettier/@typescript-eslint"],
  ```

### gitignore の作成

- <https://github.com/github/gitignore/blob/master/Node.gitignore>
- .gitignore ファイルの作成、コピー
- `*.js` を加える。

### entry point

- index.ts の作成
  - quick start からコピペ
  - 入力補完が効かないのが苦痛。
    - `node_modules/@electron` に型情報がありそうだが
- index.ts, preload.ts をビルドするために package.json の scripts に追加する。

  ```json
  "scripts": {
    "build_electronscript": "tsc index.ts preload.ts",
  ```

  - `npm run build_electronscript` か visual studio code のターミナル->タスクの実行から npm: build_electronscript で実行できる。

### 課題

- メニューバーが表示されてしまう
- タイトルバーに最小化ボタン、最大化ボタンが表示されてしまう。

### パッケージングとビルド

- Electron Forge を使用する

  - `npm i -D @electron-forge/cli`
  - `npx electron-forge import`

    ```text
    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore
    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.
    Thanks for using "electron-forge"!!!
    ```

  - `npm run make`

    ```text
    > electron_buildsize@1.0.0 make
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: squirrel
    ✔ Making for target: squirrel - On platform: win32 - For arch: x64
    ```

    - `package.json` に author が無いもしくは空("") だとエラーが出る

  - `out` フォルダに出力される
    - windows の場合
      - xxx-win32-x64 : exe ファイルのビルド
      - make/squirrel.windows/x64 : squirrel.windows によるインストーラ
        - squirrel.windows について
          - <https://qiita.com/taiki_ma/items/46861cfb44becb043839>
          - <https://github.com/Squirrel/Squirrel.Windows>
          - 実行すると `%LOCALAPPDATA%/<project name>` にインストールされる

### 脆弱性のある node.js モジュールへの対応

- electron-forge/cli のインストールで警告が出る

  ```text
  npm WARN deprecated har-validator@5.1.5: this library is no longer supported
  npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
  npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
  npm WARN deprecated node-pre-gyp@0.11.0: Please upgrade to @mapbox/node-pre-gyp: the non-scoped node-pre-gyp package is deprecated and only the @mapbox scoped package will recieve updates in the future

  added 396 packages, and audited 626 packages in 38s

  67 packages are looking for funding
    run `npm fund` for details

  2 high severity vulnerabilities

  To address all issues, run:
    npm audit fix

  Run `npm audit` for details.
  ```

- `npm audit` で詳細を見る。

  ```text
  # npm audit report

  trim-newlines  <3.0.1 || =4.0.0
  Severity: high
  Regular Expression Denial of Service - https://npmjs.com/advisories/1753
  fix available via `npm audit fix`
  node_modules/trim-newlines
    meow  3.4.0 - 5.0.0
    Depends on vulnerable versions of trim-newlines
    node_modules/meow

  2 high severity vulnerabilities

  To address all issues, run:
    npm audit fix
  ```

  - `2 high severity vulnerabilities` = 2 つの重大度の高い脆弱性

- 原因
  - 深い依存関係にあるパッケージ: @electron-forge/cli -> electron-forge/core -> nugget -> pretty-bytes -> meow -> trim-newlines(このパッケージに脆弱性)
  - `package-lock.json` 内に `"trim-newlines": "^1.0.0"` という記述がいくつかある。
    - `^1.0.0` は 1.0.0 以上で 2.0.0 未満のバージョン指定という意味
      - <https://qiita.com/chihiro/items/5826678bc9287fb57a28>
  - `trim-newlines <3.0.1 || =4.0.0` 3.0.2 | 4.0.1 以上のバージョンに変更しなければならない？
  - 最新版が 4.0.2。
- 対策
  - npm パッケージが修正されるのを待つ。
- どうしてもすぐに対策しなければならない場合

  - <https://numb86-tech.hatenablog.com/entry/2020/05/26/170627>

    > resolutions フィールドである。
    > このフィールドで、バージョンを固定したい依存パッケージの名前とバージョンを指定する。

    - `package.json` に追記する

      ```json
      "resolutions": {
        "trim-newlines": "^4.0.0"
      }
      ```

    - `yarn` コマンドを実行すると脆弱性のあるバージョンが resolutions で指定したバージョンに置き換わる。
      - <https://yarnpkg.com/>
    - `npm ls trim-newlines` バージョンの確認

      ```text
      └─┬ @electron-forge/cli@6.0.0-beta.57
        └─┬ @electron-forge/core@6.0.0-beta.57
          └─┬ nugget@2.0.1
            └─┬ pretty-bytes@1.0.4
              └─┬ meow@3.7.0
                └── trim-newlines@4.0.2 invalid: "^1.0.0" from node_modules/meow

      npm ERR! code ELSPROBLEMS
      npm ERR! invalid: trim-newlines@4.0.2
      ```

      - ただし強制的なので npm 上ではエラーが出る。
      - 実行時にエラーが出るかは不明
        - 今回は特にエラーが起こることもなく「運良く」electron-forge が動作した。

- 失敗した対策
  - `npm audit fix` としても修正されない
  - <https://qiita.com/hibikikudo/items/0af352acac85fce28ec2>
    - 上記記事の修正は同じメジャーバージョン同士での修正（マイナーバージョン以下の修正）
    - 今回は異なるメジャーバージョンに修正するので使えない。
  - <https://qiita.com/riversun/items/7f1679509f38b1ae8adb>
    - `package.json` で直接依存しているパッケージにしか適用できない。
    - 「直接依存しているパッケージが更に深く依存しているパッケージ」には適用できない。

## webpack guid: getting started

- <https://webpack.js.org/guides/getting-started/>
- Basic Setup
  - インストール
    > npm install webpack webpack-cli --save-dev
  - package.json に private: true を追加
- Creating a Bundle
  - ソースは `src` フォルダ
  - distribution コードは `build` フォルダ
  - index.html でバンドルされたファイルを読み込む。
    - この例では `main.js` としている。
  - `npx webpack` webpack によりビルドされる。
- Using a Configuration
  - `webpack.config.js` ファイルにより設定を構成できる。
  - 詳細は <https://webpack.js.org/configuration/>
- NPM Scripts

  - `package.json` の `"scripts":{}` にビルドコマンドを登録する

    ```json
    "scripts": {
      "build": "webpack",
    ```

  - `npm run build` とすると webpack のビルドが実行される。
  - この script 名は electron や typescript などのビルドと混同しないように名前を変える。

## webpack guid: typescript

- このプロジェクトでは typescript を採用している。
- webpack でトランスパイルする必要がある。
- webpack guid の typescript を参考にする
- <https://webpack.js.org/guides/typescript/>
- Basic Setup

  - `npm install --save-dev typescript ts-loader`
  - `webpack.config.js` に typescript の設定を加える

    ```javascript
    module.exports = {
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    ```

    - `entry` : js ではなく ts ファイルを指定する
    - `module` : `rules` を追加する
    - `rules` : .ts | .tsx を ts-loader で読み込む。 node_modules を除外する。
    - `resolve` : require などで省略される拡張子に typescript を加える。

- Loader
  > ts-loader uses tsc, the TypeScript compiler, and relies on your tsconfig.json configuration. Make sure to avoid setting module to "CommonJS", or webpack won't be able to tree-shake your code.
  - ~~tsconfig.json で `CommonJS` に「しない」。~~

## webpack で、開発とリリースの設定を切り替える

- <https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations>

  - module.exports で function を返す

    ```javascript
    module.exports = function (env, argv) {
      return {
        mode: env.production ? "production" : "development",
        devtool: env.production ? "source-map" : "eval",
      };
    };
    ```

  - `webpack` コマンドで mode の指定
    - `npx webpack --mode production`
    - `npx webpack --mode development`

- `package.json` の `scripts` に登録する

## webpack による 2 つのビルド

- <https://www.subarunari.com/entry/electronWebpackConfig>

  > Electron は、メインプロセスとレンダラープロセスという 2 種類のプロセスから構成
  >
  > メインプロセス
  > OS レベルの処理を主に取り扱い、アプリケーションのライフサイクルを管理するプロセスです。デスクトップアプリケーションに不可欠な GUI の作成も担当しています。つまり、このメインプロセスがウィンドウを作成しています。ウィンドウの作成だけでなく、最大化/最小化、リサイズ、閉じるといった各種イベントをハンドリングします。アプリケーションメニューやショートカットの定義、アップデート処理などもメインプロセスで取り扱われています。メインプロセスの役割はウィンドウを作るところまでです。
  >
  > レンダラープロセス
  > メインプロセスによって作られたウィンドウは、Web ページとして作られた UI を持ちます。この Web ページを描画しているプロセスが、レンダラープロセスです。ウィンドウが HTML ファイルをロードして Web ページを表示する際に、レンダラープロセスが作成されます。メインプロセスは 1 つしか存在しませんが、レンダラープロセスは Web ページごとに存在します。1 つのウィンドウの中に複数の Webview がある場合、それぞれ対応するレンダラープロセスが存在することになります。

- main プロセス用とレンダラー用の webpack 設定を書く
- main プロセス用
  - プロジェクトルートフォルダに main.js として出力する。
  - 出力ファイルを `package.json` の main に指定する。
- レンダラープロセス用
  - プロジェクトルートのサブフォルダに出力する
  - 出力ファイルは、レンダリング html ファイルごとに分けるか、ある程度纏めるか。
  - シングルページならば全て 1 つの js に出力する。
- `webpack.config.js` の `module.exports` には配列で複数の設定を出力できる。
- これによって index.ts,preload.ts を個別にビルドしなくてもよくなった。
  - package.json から個別ビルドの script を削除する。
  - webpack を行うとエラーがでる。
    > Module not found: Error: Can't resolve 'path' in
    > Module not found: Error: Can't resolve 'fs'
  - <https://tech-for.com/2020/03/04/fix-an-error-that-ts2307-cannot-find-module-fs-by-installing-types-node-package/>
    - path エラーが消えた。
    - fs エラーは残る。
  - <https://utamaro.hatenablog.jp/entry/2019/11/24/174339>
    - main プロセス用の設定に `target: 'electron-main',` を加える。
    - fs エラーが消えた。

## Electron ウィンドウで webpack を使っていると javascript エラーが出る

```text
Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
```

- index.html

  ```html
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self'"
  />
  <meta
    http-equiv="X-Content-Security-Policy"
    content="default-src 'self'; script-src 'self'"
  />
  ```

- electron の template を参考にする
  - <https://www.electronforge.io/templates/typescript-+-webpack-template>
    > npx create-electron-app my-new-app --template=typescript-webpack
    - このコマンドで現在のフォルダ以下に新たな electron プロジェクトフォルダが生成される。
    - typescript と webpack を使用したプロジェクト。
    - 概ねコレを使用したほうがよい?
      - index.html に `Content-Security-Policy` が指定されていないのは問題。
      - `Content-Security-Policy` を指定すると全く同様の状態になる。
      - devtool: false にすれば発生しないので、template を使用したほうが良い。
- 問題は `Content-Security-Policy`
  - <https://golang.hateblo.jp/entry/typescript-webpack-develop-browser-extension>
    > webpack でトランスパイルしたファイルにソースマップを埋め込むために eval が使われているのでこのエラーが出る。
  - sourcemap を無効にすれば出ない？
  - devtool: <https://webpack.js.org/configuration/devtool/>
    - false : 生成されないので発生しない？ -> 発生しない。
    - eval : 当然 eval が使われるのでダメ
    - inline-xxx : inline で展開するなら eval が使われないので OK?
  - https://golang.hateblo.jp/entry/webpack-devtool-source-map
    > webpack devtool ソースマップ
    > eval が使われるもの
    > (none) devtool の項目を設定しない - (Production)
    > eval - (Development)
    > cheap-eval-source-map - (Development)
    > cheap-module-eval-source-map - (Development)
    > eval-source-map - (Development)
    > ファイル( .js.map )が生成されるのも
    > cheap-source-map - (Production / Special cases)
    > cheap-module-source-map - (Production / Special cases)
    > source-map - (Production)
    > nosources-source-map - (Production)
    > hidden-source-map - (Production)
    > 以下は全部、最後の行にコメントで JSON を base64 にしたものが追記される
    > inline-source-map - (Special cases)
    > inline-cheap-source-map - (Special cases)
    > inline-cheap-module-source-map - (Special cases)
    > ソースマップ無し
    > false

## renderer.ts の使用

- template で生成されたプロジェクトでは index.html にレンダラープロセス用スクリプトを指定していない。
- `renderer.ts` ファイルだけが置かれている。
- `renderer.js` ファイルがあれば自動的にレンダラープロセスで使用される？
  - どのフォルダにあっても良いのか要確認
- `renderer.ts` を使用するようにする
- このプロジェクトでは `renderer.js` は読み込まれない。
  - よくわからないのでナシ。 index.html に `<script>` として読み込ませる。

## entory point script の移動

- template プロジェクトでは entory point の ts ファイルも src フォルダ内に存在する。
- `package.json` の `main` で指定してあればどこにあっても良い
- ts ファイルはすべて `src` フォルダに移動させる。
- トランスパイル後の js ファイルは、メインプロセス用、レンダラープロセス用、preload 用で別れていれば、どこにあってもよい。

## electron-forge の活用

- <https://www.electronforge.io/templates/typescript-+-webpack-template>
- このテンプレートで生成した `package.json` を見ると `scripts` で electron-forge を使用してる。
  > "start": "electron-forge start",
  > "package": "electron-forge package",
  > "make": "electron-forge make",
  > "publish": "electron-forge publish",
  - production と development の指定が出来るならばこれに切り替える。
- `npx electron-forge start`
  - electron を実行する。
- `npx electron-forge package`
  - 単に実行可能な electron を `out` フォルダ以下に生成する。
  - `npx electron-forge make` でインストーラーの生成を除いた挙動
- `npx electron-forge make`
  - `npx electron-forge package` に加えてインストールパッケージを生成する。
- `npx electron-forge publish`
  - make を行い github などにアップロードする？

## electron-forge 実行時には、webpack, tsc などは行われない

- 単にファイルとしてあるものに対して出力が行われる。
- 事前に webpack 等を行わなければならない。
- 解決策
  - electron-forge の plugin `@electron-forge/plugin-webpack` を使えば同時に行われる？
    - <https://www.electronforge.io/config/plugins/webpack>
  - `package.json` で script を組み合わせて webpack の後に electron-forge が実行されるように指定する方法。

## electron の make で実行に不要な開発ファイルまですべて含まれてしまう問題

- 問題: `electron-forge package` を行うと `out/*/resources/app/*` にプロジェクトルートにある開発ファイルが含まれてしまう
- ~~`package.json` の `files: []` に必要なファイルのみ含めて package を行う~~
  - 変化なし
- ~~`package.json` の `build: files: []` に必要なファイルのみ含めて package を行う~~
  - 変化なし
- <https://www.electronforge.io/configuration>
  - `package.json` `config.forge.packageConfig` に electron-packager の設定を書き込む
  - `ignore` によって指定されたものを除外する。
    - 指定したファイルのみ含める allow は存在しない。
    - ほぼすべてのファイルが不要。
  - 必要なファイル
    - `package.json`
    - `index.js` `index.html`
      - これらから使用されるファイル
        - `node_modules` フォルダは不要。必要なものがあれば webpack によりバンドルされる為。
        - ネイティブライブラリなどがある場合は不明。

## electron のフォルダ構成

- <https://www.electron.build/configuration/configuration#configuration>
- electron-builder の設定項目
  - `forge.config.js` の `packagerConfig` に指定する。
  - directories
    - buildResources
    - output
    - app

## electron に出力される package.json の内容を最小限にする

- 必要そうな項目
  - main
- 無関係そうな項目
  - scripts
  - license
  - devDependencies
  - dependencies
- electron-forge の設定は `package.json` に必須ではない
- `forge.config.js` に electron-forge の設定を移動させる
  - `ignore`リストに `forge.config.js` を加える。正常に動作する。
- <https://www.electron.build/tutorials/loading-app-dependencies-manual>
- <https://www.electron.build/tutorials/two-package-structure>

  > Two package.json Structure
  >
  > 1. For development (./package.json)
  >    The package.json resides in the root of your project. Here you declare the dependencies for your development environment and build scripts (devDependencies).
  > 1. For your application (./app/package.json)
  >    The package.json resides in the app directory. Declare your application dependencies (dependencies) here. Only this directory is distributed with the final,packaged application.

  - まったく動作しない。
  - `app/package.json` ファイルを生成しても `out/xxx/resources/app/app/package.json` として出力される
  - `package.json` は `out/xxx/resources/app/package.json` として出力される。

- electron-forge/webpackplugin を使用すると不必要な項目を強制的に除外される。

  - <https://github.com/electron-userland/electron-forge/blob/master/packages/plugin/webpack/src/WebpackPlugin.ts#L209>
  - この辺のコードで除外している。
  - `hook` `packageAfterCopy` の時に出力先の package.json を上書きしている。

- `forge.config.js` で `out/xxx/resources/app/package.json` を `app/package.json` に置き換える処理を行う。
  - 無理
- `electron-forge/plugin-webpack` を使用する

  - `npm i -D @electron-forge/plugin-webpack ts-loader`
  - main process 用の webpack.main.config.js の作成
  - renderer 用の webpack.renderer.config.js の作成
  - preload 用の webpack.preload.config.js の作成
  - webpack.rules.js の作成
  - すべて template を参考に適当に作る。
  - package を行うと生成される。
    - package.json では不要な部分が削除されている。
    - main process 用、 preload 用の js ファイルが生成されなかった。
    - webpack.config.js で module.exports にはオブジェクトしか指定できない。
      - 配列、関数は指定できない。= production, development の切り替えが出来ない。
  - 実行してみると、webpack が裏で動いている。

  ```text
  > electron_buildsize@1.0.0 start

  > electron-forge start

  ✔ Checking your system
  ✔ Locating Application
  ✔ Preparing native dependencies
  ✔ Compiling Main Process Code
  ✔ Launch Dev Servers
  ✔ Compiling Preload Scripts
  ✔ Launching Application

  Webpack Output Available: http://localhost:9000

  ⠹ Compiling Renderer Code
  ⠧ Compiling Renderer Codeasset main_window/index.js 359 KiB [emitted] (name: main_window)
  asset main_window/index.html 774 bytes [emitted]
  runtime modules 25.1 KiB 10 modules
  modules by path ./node_modules/ 304 KiB
  modules by path ./node_modules/webpack-dev-server/client/ 157 KiB 13 modules
  modules by path ./node_modules/webpack/hot/_.js 4.3 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/_.js 81.3 KiB 4 modules
  modules by path ./node_modules/url/ 37.4 KiB 3 modules
  modules by path ./node_modules/querystring/\*.js 4.51 KiB
  ./node_modules/querystring/index.js 127 bytes [built] [code generated]
  ./node_modules/querystring/decode.js 2.34 KiB [built] [code generated]
  ./node_modules/querystring/encode.js 2.04 KiB [built] [code generated]
  ./node_modules/ansi-html/index.js 4.16 KiB [built] [code generated]
  ./node_modules/events/events.js 14.5 KiB [built] [code generated]
  modules by path ./src/ 1.02 KiB
  ./src/renderer.ts 885 bytes [built] [code generated]
  ./src/ sync 160 bytes [built] [code generated]

  WARNING in ./src/renderer.ts 3:24-31
  Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

  ```

  - これなら事前に webpack で変換を終わらせる plugin を使わない方が良いのでは？
  - 気にしない、気にならないなら template 使用でよい。

- `package.json`問題は未解決

## test の導入

- unit test framework 候補
  - mocha
  - jasmine
    - 昔は他の test だと問題があって jasmine を使っていた気がする
  - jest
    - 最近では jest らしいので採用
    - <https://jestjs.io/ja/>
- 統合テスト、E2E テスト
  - spectron
    - <https://github.com/electron-userland/spectron>
      > Easily test your Electron apps using ChromeDriver and WebdriverIO.

## jest の導入

- <https://jestjs.io/ja/docs/getting-started>

  - install
    > npm install --save-dev jest
  - `package.json`

    ```json
    "scripts": {
      "test": "jest"
    }
    ```

  - jest の設定

    > jest --init

    ```text
    √ Would you like to use Jest when running "test" script in "package.json"? ... yes
    √ Would you like to use Typescript for the configuration file? ... yes
    √ Choose the test environment that will be used for testing » jsdom (browser-like)
    √ Do you want Jest to add coverage reports? ... yes
    √ Which provider should be used to instrument code for coverage? » v8
    √ Automatically clear mock calls and instances between every test? ... no
    ```

- テストの確認

  - `test/foo.test.js` を作成
  - 適当にテストを書く
  - test の実行

    ```text
    Error: Jest: Failed to parse the TypeScript config file (path)\electron_buildsize\jest.config.ts
      Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed
    Error: Cannot find module 'ts-node'
    Require stack:
    ```

    - `npm i -D ts-node`
    - テスト成功

    ```text
    jest-haste-map: Haste module naming collision: electron_buildsize
      The following files share their name; please adjust your hasteImpl:
        * <rootDir>\out\electron_buildsize-win32-x64\resources\app\package.json
        * <rootDir>\package.json

    PASS  test/foo.test.js
      √ adds 1 + 2 to equal 3 (3 ms)

    ----------|---------|----------|---------|---------|-------------------
    File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    ----------|---------|----------|---------|---------|-------------------
    All files |       0 |        0 |       0 |       0 |
    ----------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   0 total
    Time:        5.014 s
    Ran all test suites.
    ```

## typscript で test ファイルを書く

- `npm i -D @types/jest`
  - typescript 用の jest 型情報のインストール
- foo.test.ts とする。

  ```text
  FAIL  test/foo2.test.ts
    ● Test suite failed to run

      SyntaxError: (path)\multiplatform_buildsize\electron_buildsize\test\foo2.test.ts: Unexpected token, expected "," (1:14)

      > 1 | function sum(a: number, b: number) {
          |               ^
  ```

  - 型指定で syntax error が出る。

- `ts-jest` の使用

  - `npm i -D ts-jest`
  - `jest.config.ts` に ts-jest の設定を追加

    - <https://qiita.com/mangano-ito/items/99dedf88d972e7e631b7>

    ```typescript
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json",
      },
    },
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    ```

- test script の実行

  ```text
  PASS  test/foo.test.js
  PASS  test/foo2.test.ts
  ----------|---------|----------|---------|---------|-------------------
  File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
  ----------|---------|----------|---------|---------|-------------------
  All files |       0 |        0 |       0 |       0 |
  ----------|---------|----------|---------|---------|-------------------

  Test Suites: 2 passed, 2 total
  Tests:       2 passed, 2 total
  Snapshots:   0 total
  Time:        7.239 s
  Ran all test suites.
  ```

  - 成功

- src ファイルを import する時に相対パスが長くなる

  - <https://qiita.com/mangano-ito/items/99dedf88d972e7e631b7#import-%E3%81%AE%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9%E3%82%92%E6%8C%87%E5%AE%9A>

    > tsconfig.json

    ```json
    {
      "compilerOptions": {
        "baseUrl": "./src/",
        "paths": {
          "#/*": ["*"]
        }
      }
    }
    ```

    > package.json

    ```json
    {
      "jest": {
        "moduleNameMapper": {
          "^#/(.+)": "<rootDir>/src/$1"
        }
      }
    }
    ```

    - これで test.ts 側の import 指定するときにどこからでも `"#/foo.ts"` などと出来る。

## jest で webpack の使用

- 一旦保留
  - 理由:
    - typescript のユニットテストならば webpack を行わなくても可能なはず
- <https://jestjs.io/ja/docs/webpack>
- webpack 設定
  > JavaScript トランスパイラは Jest の transform 設定オプションで管理できます。
- 静的アセットの管理

  - `package.json`

    ```json
    "jest": {
      "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
      }
    }
    ```

  - `__mocks__/styleMock.js`

    ```javascript
    module.exports = {};
    ```

  - `__mocks__/fileMock.js`

    ```javascript
    module.exports = "test-file-stub";
    ```

- CSS モジュールのモック
  - 省略
- ソースファイルを探索できるように Jest を設定する

  - `package.json`

    ```json
    "jest": {
      "moduleFileExtensions": ["js", "jsx"],
      "moduleDirectories": ["node_modules", "bower_components", "shared"],
    ```

    > webpack の modulesDirectories、そして extensions オプションは Jest の moduleDirectories や moduleFileExtensions と直接的な類似性があります。

    ```json
    "jest": {
      "modulePaths": ["/shared/vendor/modules"],
    ```

    > Similarly, webpack's resolve.root option functions like setting the NODE_PATH env variable, which you can set, or make use of the modulePaths option.

## spectron の導入

- <https://github.com/electron-userland/spectron>
- インストール
  > npm install --save-dev spectron
- spectron の使用
  - test コード中で使用する
    > const Application = require('spectron').Application
    - Application が any 型になる
- spectron/Application の import
  - `import { Application } from "spectron";`
    - `"spectron"` が見つからない
    - `tsconfig.json` `"moduleResolution": "node",` を追加
  - これで Application 型が認識される。入力補完も効く。
- electron の実行ファイルへのパスを取得
  - `node_modules/electron/index.js` の export.module に出力されている。
  - typescript からコレを取得する
  - `const electronPath = require("electron/index.js");`
  - import でのやり方がわからない。
- electron の実行

  - `new Application()` で electron のアプリケーションを生成
    - `path`: electronPath (必須)
    - `args`: 読み込むスクリプト？

  ```typescript
  app = new Application({
    path: electronPath,
    // args は、package.json のパスと、main process/preload process/renderer process のスクリプトがあるパスを指定する
    args: [path.join(__dirname, "../"), path.join(__dirname, "../js/")],
  });
  ```

  - `app.start();` で実行

- electron の終了

  - `app.client.closeWindow();` で終了
  - `app.stop();`

    - 特定の条件で例外が出る。

      - 複数の test
      - `afterEach()` で `return app.stop();`
      - 二度目以降の test の afterEach の後に例外

      ```text
      RequestError: read ECONNRESET

       at ClientRequest.<anonymous> (node_modules/webdriver/node_modules/got/dist/source/core/index.js:956:111)
       at ClientRequest.origin.emit (node_modules/webdriver/node_modules/@szmarczak/http-timer/dist/source/index.js:39:20)

       (node:12352) UnhandledPromiseRejectionWarning: RequestError: read ECONNRESET
       (Use `node --trace-warnings ...` to show where the warning was created)
       (node:12352) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
       (node:12352) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
      ```

    - 解決方法は `app.client.closeWindow`

- `app?.client.getWindowCount()` の値
  - `win.webContents.openDevTools();` が実行されている場合は +1 される
- 非同期テスト

  - Promise 型を返す場合

    ```typescript
    test("promise test", () => {
      return app?.client.getWindowCount().then(count=>{
        // ...
      }).catch(e:Error){
        // ...
        Promise.reject(e);
      };
    });
    ```

  - async await を使う場合

    ```typescript
    test("async await", async () => {
      let count = await app?.client.getWindowContent();
    });
    ```

  - done を使う場合

    ```typescript
    test("done", (done) => {
      foo_callback(() => {
        done();
      });
    });
    ```

  - それぞれ混ぜてはいけない。

- `app.client.xxx()` のメソッドを実行すると例外を出す

```text
TypeError: waitUntilWindowLoaded Cannot read property 'isLoading' of undefined

  58 |     // nodeIntegration: true の場合は動作する？
  59 |     // https://qiita.com/nomuyoshi/items/9091abd9dc3b05c85f44
> 60 |     return app?.client.waitUntilWindowLoaded();
     |                        ^
  61 |     // return app?.client.waitUntilWindowLoaded().catch((e: Error) => {
  62 |     //   console.log(e.message);
  63 |     //   expect(e.message).toMatch(

  at Browser.<anonymous> (node_modules/spectron/lib/application.js:261:33)
  at Timer._tick (node_modules/webdriverio/build/utils/Timer.js:58:29)
  at Timer._start (node_modules/webdriverio/build/utils/Timer.js:30:18)
  at new Timer (node_modules/webdriverio/build/utils/Timer.js:23:14)
  at Browser.waitUntil (node_modules/webdriverio/build/commands/browser/waitUntil.js:18:17)
  at Browser.wrapCommandFn (node_modules/@wdio/utils/build/shim.js:63:38)
  at Browser.<anonymous> (node_modules/spectron/lib/application.js:260:8)
  at Browser.waitUntilWindowLoaded (node_modules/@wdio/utils/build/shim.js:63:38)
  at Browser.next [as waitUntilWindowLoaded] (node_modules/@wdio/utils/build/monad.js:95:33)
  at Object.<anonymous> (test/spectron.test.ts:60:24)
```

- <https://github.com/electron-userland/spectron#node-integration>

  > The Electron helpers provided by Spectron require accessing the core Electron APIs in the renderer processes of your application. So, either your Electron application has nodeIntegration set to true or you'll need to expose a require window global to Spectron so it can access the core Electron APIs.

  - google 翻訳

    > Spectron が提供する Electron ヘルパーでは、アプリケーションのレンダラープロセスでコア ElectronAPI にアクセスする必要があります。 したがって、Electron アプリケーションで nodeIntegration が true に設定されているか、コアの Electron API にアクセスできるように、require ウィンドウを Spectron にグローバルに公開する必要があります。

## electronAPI を spectron test で使用する方法

- nodeIntegration を true にする方法

  - main process の ts ファイルに `webPreferences.nodeIntegration` を true にする

    ```typescript
    const win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
    ```

    - これでも正しく動作しない。失敗。

- require window を spectron に公開する方法 (注: 正しく動作しない)

  - preload に window.electronRequire を指定する

  ```typescript
  // preload.ts
  if (process.env.NODE_ENV === "test") {
    window.electronRequire = require;
  }
  ```

  - spectron の Application で requireName を指定する

  ```typescript
  Application({
    requireName: "electronRequire",
  });
  ```

  - テスト時に環境変数 NODE_ENV=test を指定する

  ```json
  // package.json
  "scripts":{
    "test": "NODE_ENV=test jest",
  }
  ```

  - windows と linux,mac では環境変数の指定が異なる
  - cross-env パッケージを使用する

    - `npm i -D cross-env`
    - `"test": "cross-env NODE_ENV=test jest",`

  - テストを実行する
    - 問題が全く修正されない。失敗。

## spectron で一部のメソッドを使うと TypeError: xxxx Cannot read property 'xxxx' of undefined (未解決)

- test.ts ファイルで app?.client.waitUntilWindowLoaded(); を動作させる方法がわからない。

  - <https://kokufu.blogspot.com/2019/10/electron-spectron.html>
    - nodeIntegration だと動作すると言っているが、動作しない。
  - <https://github.com/electron-userland/spectron/issues/174>
  - <https://github.com/electron-userland/spectron/issues/844>
    - 公式 github 上でも動作しないと主張している
    - 昔から直ったり動作しなかったりしている？

- app.client.xxx() の一部のメソッドだけが正しく動作しない可能性
  - app.client.execute() や app.client.isElementDisplayed() は動作する。
  - electron or spectron の使用方法が間違っているのか、electron or spectron の実装側が間違っているのか、両方なのかよくわからない。
- 現状の回避策として、require window を spectron に公開しないで(nodeIntegration:false, electronRequire などを無効)実行出来るテストを中心に行う。

## webpack で typescript 構文エラー

- `function repText(selector: any, text: any) {` の `:any` 部分でエラー
- typescript として扱われていない
- `npm i -D ts-loader`
- webpack.config.js に ts を ts-loader で処理するように修正

  ```javascript
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  ```

- electron の実行でエラー

  ```text
  App threw an error during load
  Error: Cannot find module 'electron'
  ```

  - `webpack.config.js` で electron モジュールを使用する process に `target: "electron-main",` を追加する
    - renderer process では、使用できない。

## production にデバッグ用コードを出力しない

- <https://blog.hinaloe.net/2017/07/31/webpack-statc-analysis-bundle/>
- webpack で terser-webpack-plugin を使う

  - <https://webpack.js.org/plugins/terser-webpack-plugin/>
  - `npm i -D terser-webpack-plugin`
  - `webpack.config.js`

    - `terser` の設定

      ```javascript
      const TerserPlugin = require("terser-webpack-plugin");

      module.exports = {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              format: {
                comments: false,
              },
            }),
          ],
        },
      };
      ```

    - ソースマップの設定 `devtool: "source-map"`
      > Works only with source-map, inline-source-map, hidden-source-map and nosources-source-map values for the devtool option.
      - source-map
      - inline-source-map
      - hidden-source-map
      - nosources-source-map

  - development の時のみコード化される部分

    ```typescript
    if (process.env.NODE_ENV !== "production") {
      // ... この部分は development の時のみコード化される
    }
    ```

## spectron で任意のページ (html) を表示させる

- spectron で production には無いテスト用の html を表示させる
- 特定の機能だけ確認したい場合には テスト用の html ファイルを表示させたほうが効率が良い。
