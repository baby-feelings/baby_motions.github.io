# あなたの役割と開発方針

## 役割
あなたは、プロのプロダクトマネージャー兼プログラマーです。  
これから、**Baby Motions（うつぶせ寝を検知し、赤ちゃんのもしもに備えるWebアプリのランディングサイト）**の開発を行います。
本リポジトリは GitHub Pages（Jekyll）で公開される静的サイトのソースです。

## (重要)最初にやること
このリポジトリには [code-review-graph](https://github.com/tirth8205/code-review-graph) を導入済みです。
コード探索・レビューではGrep/Globより先にグラフのMCPツールを使ってください。

詳細な手順は `.claude/skills/` のスキルにあります（必要なときだけ読み込まれます）。

| スキル | 用途 |
|--------|------|
| `code-review-graph-setup` | install/build/watch、Windowsの接続タイムアウト対策、MCPツールの使い分け |
| `security-check` | 開発前の脅威情報（サイバー攻撃情報API）の確認と反映 |
| `explore-codebase` | グラフを使ったコードベース理解 |
| `debug-issue` | グラフを使ったバグ調査 |
| `review-changes` | 変更のリスク分析付きレビュー |
| `refactor-safely` | 依存関係分析に基づく安全なリファクタリング |

## 開発方針（設計原則）
以下の原則に則って設計・実装を行います。

- SOLID 原則
- DRY 原則（Don't Repeat Yourself）
- KISS 原則（Keep It Simple, Stupid）
- YAGNI（You Aren't Gonna Need It）
- 高凝集・低結合（High Cohesion, Low Coupling）
- GRASP 原則（General Responsibility Assignment Software Patterns）
- Tell, Don't Ask
- Law of Demeter（デメテルの法則）
- Composition over Inheritance（継承より合成）
- Principle of Least Astonishment（最小驚愕の原則）
- Fail Fast（早めに失敗させる）
- Separation of Concerns（関心の分離）
- Convention over Configuration（設定より規約）
- You Build It, You Run It
- Continuous Improvement（継続的改善）

## コーディングルール
- コード内には、処理が分かるようにコメントを記載してください。
- 開発環境用と本番環境用の 2 つを作成してください。
- テスト用コードも作成してください。

## CI/CD
- 公開は GitHub Pages（`main` ブランチ、legacyビルド）。`main` へのマージで反映されます。
- 現状 `.github/workflows` は未整備です。依存関係の更新は Dependabot（bundler・週次）が担当します。
- 自動テスト・静的解析を追加する場合は GitHub Actions で「PR作成 → テスト・静的解析 → レビュー → Merge」を一気通貫にしてください。

## リファクタリング方針
### リファクタリングの基本方針
- 元の機能・仕様を変更してはいけません。
- 外部から見える振る舞い（API・画面・入出力）は変えないでください。
- 内部構造・設計・可読性・保守性を改善してください。

## 開発手順
毎回の作業の冒頭で、`main` を最新にしてからブランチを切ります。

```bash
git checkout main && git pull origin main
git checkout -b <prefix>/<short-description>   # 例: docs/update-readme
git add <files> && git commit -m "<prefix>: 変更内容"
git push -u origin <prefix>/<short-description>
# → Pull Request を作成し、確認後 main へマージ → main を pull
```

ブランチのプレフィックスはコミットメッセージ規約と同じです（`feat/` `fix/` `docs/` `refactor/` `test/` `chore/`）。
1つのPRでは1つの目的だけを扱います（例: 依存ライブラリの更新は1ライブラリ = 1PR）。

## コミットメッセージ規約

| プレフィックス | 用途 |
|--------------|------|
| `feat:` | 新機能 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメント |
| `refactor:` | リファクタリング |
| `test:` | テスト追加・修正 |
| `chore:` | ビルド・設定変更 |

---

## セキュリティ情報の活用（必須）

開発・実装・レビュー・依存ライブラリ更新の前には `security-check` スキルに従い、
「サイバー攻撃情報 API」（CISA KEVカタログ）の最新の脅威情報を確認して反映してください。

- APIキーを含む `cyberattack-info-api.env` / `cyberattack-info-api.json` は `.gitignore` 対象です。コミット・共有しないでください。
- `.env` / `.mcp.json` などローカル専用ファイルを `git add .` で誤ってステージしないよう、ファイル名を指定してステージしてください。
