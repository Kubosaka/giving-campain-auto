## 注意
- 即席で作ったので、バグやエラーがでる可能性があります。
- 拡張機能は使わない時はOFFにしておいた方がよさです


# 説明

inputInfo.js は個人情報の自動入力です。
これらを自分もモノに変更してください

```
const LAST_NAME = "山田";
const FIRST_NAME = "太郎";
const KANA_LAST_NAME = "やまだ";
const KANA_FIRST_NAME = "たろう";
const GENDER = "男性";
const BIRTH_YEAR = "2001";
const BIRTH_MONTH = "9";
const BIRTH_DAY = "7";
const EMAIL = "test@example.com";
const TEL = "00000000000";
const GROUP_RELATION1 = "その他";
```

message.js は最後のメッセージを入力します

```
const MESSAGE = "技大祭実行委員会です。\n一緒に頑張りましょう!!";
```

をいい感じにしましょう

ここまでできれば chrome の拡張機能に登録します。

# 拡張機能の登録方法

1. chromeの拡張機能管理画面に行ってください 
`chrome://extensions/`

2. パッケージ化されていない拡張機能を読み込むを選択

<img width="754" alt="スクリーンショット 2024-10-16 0 44 06" src="https://github.com/user-attachments/assets/b99fc5ed-1974-46f4-ad2f-6d891041d858">

4. cloneしたフォルダをインポート（ここまででinputInfo.jsとmessage.jsの変数は自分のモノに変更しておいてください)
```
.
├── README.md
├── background.js
├── inputInfo.js
├── manifest.json
└── message.js
```

# 使い方
giving campaignの情報入力時に右クリック
`NUTFES-Giving-Campaign `> `[GIVING CAMPAIGN] 情報入力`を選択

<img width="1030" alt="スクリーンショット 2024-10-16 1 34 08" src="https://github.com/user-attachments/assets/eed9d0fc-5a79-47ee-8635-a96d18518da5">


メッセージは
`NUTFES-Giving-Campaign `> `[GIVING CAMPAIGN] メッセージ入力`を選択
