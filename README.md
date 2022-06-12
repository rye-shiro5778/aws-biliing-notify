# aws-biliing-notify
週次でAWSの請求をLINE通知してくれるLambda用スクリプト

## 環境変数
```
cp .env.copy .env
envにLINEのアクセストークンと送信先のUSERIDをのせる
(lambdaで動かす場合は環境変数を使えば良い)
```

## Lambda向けにzip化
esbuildを使ってlambda用node.jsにビルド
```
npm run build
npm run zip
```