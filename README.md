# Baby Motions

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)

うつぶせ寝を検知し、赤ちゃんのもしもに備える Web アプリ「Baby Motions」の紹介サイトです。
AI がスマホカメラで赤ちゃんのうつぶせ寝を検知し、SIDS（乳幼児突然死症候群）のリスクに備えることを目的としています。

- **公開URL**: https://baby-feelings.github.io/baby_motions.github.io/

## 技術スタック

- [Jekyll](https://jekyllrb.com/)（[GitHub Pages](https://pages.github.com/) 標準環境、`github-pages` gem v232）
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
├── terms.md          # 利用規約
├── Gemfile(.lock)    # 依存ライブラリ
├── .github/          # Dependabot 設定
├── .semgrepignore    # Semgrep の誤検知除外（Liquidテンプレート）
├── CLAUDE.md         # 開発方針（Claude Code 向け）
└── .claude/skills/   # Claude Code 用スキル（詳細手順）
```

## デプロイ

GitHub Pages が `main` ブランチ（ルート）から自動でビルド・公開します。
`main` へのマージがそのまま本番反映になるため、変更は必ず Pull Request 経由で行ってください。

## 開発の進め方

1. `main` を最新にして、`<prefix>/<short-description>` 形式のブランチを作成
2. 変更をコミット（`feat:` `fix:` `docs:` `refactor:` `test:` `chore:`）
3. Pull Request を作成し、確認後に `main` へマージ
4. `main` を pull

詳細な開発方針は [CLAUDE.md](CLAUDE.md) を参照してください。

## 依存関係の管理

- [Dependabot](.github/dependabot.yml) が `Gemfile` の依存関係を週次でチェックします。
- `github-pages` gem が依存ライブラリのバージョンを固定しているため、
  更新は `Gemfile.lock` 内で制約に収まる範囲に限られます（1ライブラリ = 1PR）。

## Claude Code スキル

`.claude/skills/` に、必要なときだけ読み込まれる手順書があります。

| スキル | 用途 |
|--------|------|
| `code-review-graph-setup` | [code-review-graph](https://github.com/tirth8205/code-review-graph) のセットアップと使い方 |
| `security-check` | 開発前の脅威情報（サイバー攻撃情報API）の確認 |
| `explore-codebase` / `debug-issue` / `review-changes` / `refactor-safely` | グラフを使った探索・調査・レビュー・リファクタリング |

## ローカル専用ファイル（コミットしない）

以下は `.gitignore` 対象です。`git add .` は使わず、ファイルを指定してステージしてください。

- `.mcp.json`（環境依存の絶対パスを含む。`code-review-graph install --platform claude-code -y` で各自生成）
- `.code-review-graph/`（グラフDB）
- `cyberattack-info-api.env` / `cyberattack-info-api.json`（APIキー・取得データ）


## ライセンス

[GNU Affero General Public License v3.0（AGPL-3.0）](LICENSE)

AGPL-3.0 は、コードを改変してネットワーク経由で提供する場合（サーバー型サービスとしての利用を含む）も、改変後のソースコードを利用者に公開する義務を課す強めのコピーレフトライセンスです。無断でコードをコピーして非公開の競合サービスとして運営することを防ぐ目的で選択しています。個人利用・学習目的の閲覧・フォークは自由ですが、本コードを基にしたサービスを公開する場合はソースコードの公開が必要です。商用利用や別ライセンスでの利用を希望する場合は個別にご相談ください。
