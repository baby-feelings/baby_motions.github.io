# Baby Motions

うつぶせ寝を検知し、赤ちゃんのもしもに備える Web アプリ「Baby Motions」の紹介サイトです。
AI がスマホカメラで赤ちゃんのうつぶせ寝を検知し、SIDS（乳幼児突然死症候群）のリスクに備えることを目的としています。

- **公開URL**: https://baby-feelings.github.io/baby_motions.github.io/

## 技術スタック

- [Jekyll](https://jekyllrb.com/)（[GitHub Pages](https://pages.github.com/) 標準環境）
- Ruby / Bundler

## セットアップ

```bash
# 依存関係のインストール
bundle install

# ローカルサーバーの起動（http://localhost:4000/baby_motions.github.io/ ）
bundle exec jekyll serve
```

## ディレクトリ構成

```
.
├── _config.yml       # Jekyllサイト設定
├── _includes/        # 共通パーツ（header, footer など）
├── _layouts/         # ページレイアウト
├── assets/           # CSS / JS / 画像
├── index.html        # トップページ
├── contact.md        # お問い合わせページ
├── privacy.md        # プライバシーポリシー
└── terms.md          # 利用規約
```

## デプロイ

`main` ブランチへの merge をもって GitHub Pages に自動デプロイされます。

## 開発ルール

開発方針・ブランチ運用・コミットメッセージ規約などの詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

## 依存関係の管理

- [Dependabot](.github/dependabot.yml) が `Gemfile` の依存関係を週次でチェックします。
- このリポジトリには [code-review-graph](https://github.com/tirth8205/code-review-graph) を導入しています。セットアップ手順は [CLAUDE.md](CLAUDE.md) を参照してください。
