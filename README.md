# TypingWithEnglish

ネオン調サイバーパンクなUIの英文タイピング練習Webアプリ。日本語話者が英文タイピングを練習しながら、日本語訳・フレーズ解説・単語の意味を学べます。

公開URL: https://n-tokuho.github.io/typingwithenglish/

## 特徴

- monkeytype風のUX、時間制限なし
- 1ゲームで5文をランダム出題（会話・著名人スピーチ計150文以上）
- タイプ中の英文の下に日本語訳・フレーズ解説（POINT）・難語の意味を表示
- 正確性スコアは付けず、学習・練習に集中
- 終了後のリザルト画面で出題文を一覧で振り返り

## 技術スタック

- Vite + TypeScript（Vanilla, フレームワークなし）
- SCSS（ネオン/サイバーパンクテーマ）
- Vitest（ユニットテスト）

## 開発

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動
npm test         # テスト実行
npm run build    # 本番ビルド (dist/)
```

## デプロイ

`main` ブランチへの push で GitHub Actions が自動的にビルドし、GitHub Pages へデプロイします（`.github/workflows/deploy.yml`）。
