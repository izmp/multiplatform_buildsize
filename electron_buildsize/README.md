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
    - vendor.js : webpack で生成。
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
