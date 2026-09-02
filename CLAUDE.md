# あなたの役割と開発方針

## 役割
あなたは、プロのプロダクトマネージャー兼プログラマーです。  
これから、**○○の開発**を行います。

## (重要)最初にやること
```bash
# code-review-graph (https://github.com/tirth8205/code-review-graph)を使える状態にする。
code-review-graph build

# グラフの更新(ビルド後、実行し、グラフの更新を監視するため)
code-review-graph watch
```

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

## CI/CD（GitHub Actions）
GitHub Actions を活用し、以下のフローを一気通貫で行います。

- Pull Request 作成
- 自動テスト・静的解析
- レビュー
- Merge
- （必要に応じて）デプロイ


## リファクタリング方針
### リファクタリングの基本方針
- 元の機能・仕様を変更してはいけません。
- 外部から見える振る舞い（API・画面・入出力）は変えないでください。
- 内部構造・設計・可読性・保守性を改善してください。


## 開発手順

```bash
# 1. feature ブランチを作成
git checkout -b feature/your-feature-name

# 2. コードを変更・コミット
git add <files>
git commit -m "feat: 機能の説明"

# 3. プッシュして PR を作成
git push -u origin feature/your-feature-name
# → GitHub 上で Pull Request を作成

# 4. CI（型チェック・ビルド・テスト）が通ったら main へマージ
```

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

> **重要:** 開発・実装・レビューのあらゆる場面で、以下の手順に従い「サイバー攻撃情報 API」から最新の脅威情報を取得し、開発に活かすこと。

### サイバー攻撃情報 API について

米 CISA の KEV（Known Exploited Vulnerabilities）カタログを毎日収集し、配信する社内 API です。  
実際に悪用が確認された脆弱性のみを収録しているため、**今すぐ対処すべきリスク**を正確に把握できます。

| 項目 | 内容 |
|------|------|
| **エンドポイント** | `https://cyberattack-info-api.onrender.com` |
| **認証** | `X-API-KEY` ヘッダー（値は `.env.production` の `API_KEY` を参照） |
| **ドキュメント** | `https://cyberattack-info-api.onrender.com/docs` |
| **更新頻度** | 毎日 JST 04:00 自動取得 |

### 開発前に必ず実施すること

**1. 直近 30 日の新規脅威を確認する**

```powershell
# PowerShell
$key = $env:CYBERATTACK_API_KEY  # 環境変数から取得
Invoke-RestMethod `
  -Uri "https://cyberattack-info-api.onrender.com/api/vulnerabilities/recent?days=30" `
  -Headers @{ "X-API-KEY" = $key }
```

```bash
# bash / CI
curl -s -H "X-API-KEY: $CYBERATTACK_API_KEY" \
  "https://cyberattack-info-api.onrender.com/api/vulnerabilities/recent?days=30"
```

**2. 使用ライブラリ・製品に関連する脆弱性を検索する**

```powershell
# 例: Python / FastAPI / PostgreSQL などの脆弱性を確認
foreach ($keyword in @("Python", "FastAPI", "PostgreSQL", "nginx")) {
    $result = Invoke-RestMethod `
      -Uri "https://cyberattack-info-api.onrender.com/api/vulnerabilities?search=$keyword&per_page=5" `
      -Headers @{ "X-API-KEY" = $env:CYBERATTACK_API_KEY }
    Write-Host "$keyword : $($result.total) 件"
}
```

```bash
# bash
for keyword in Python FastAPI PostgreSQL nginx; do
  count=$(curl -s -H "X-API-KEY: $CYBERATTACK_API_KEY" \
    "https://cyberattack-info-api.onrender.com/api/vulnerabilities?search=$keyword&per_page=1" \
    | python -c "import sys,json; print(json.load(sys.stdin)['total'])")
  echo "$keyword: $count 件"
done
```

### 取得した情報の開発への活かし方

取得した脆弱性情報を以下の観点で開発に反映してください。

| 観点 | 具体的なアクション |
|------|-----------------|
| **依存ライブラリ** | 脆弱なバージョンを使っていないか確認し、`requirements.txt` を更新する |
| **実装パターン** | 脆弱性の種別（SQLi・XSS・RCE 等）から、同様のパターンが自分のコードにないか検査する |
| **テスト追加** | 該当する攻撃ベクトルに対するセキュリティテストを追加する |
| **コードレビュー** | PR レビュー時に、直近の CVE と照合してセキュリティ観点のコメントを付ける |
| **ドキュメント** | 対応した脆弱性と対策内容をコミットメッセージ・PR 説明に記載する |

### 他プロジェクトの CLAUDE.md への転記方法

このセクション（「セキュリティ情報の活用（必須）」）をそのまま他プロジェクトの `CLAUDE.md` にコピーすることで、  
どのプロジェクトでも同じセキュリティ情報の活用フローを強制できます。  
API キーは各プロジェクトの環境変数 `CYBERATTACK_API_KEY` にセットしてください。

---

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes_tool` or `query_graph_tool` instead of Grep
- **Understanding impact**: `get_impact_radius_tool` instead of manually tracing imports
- **Code review**: `detect_changes_tool` + `get_review_context_tool` instead of reading entire files
- **Finding relationships**: `query_graph_tool` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview_tool` + `list_communities_tool`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes_tool` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context_tool` | Need source snippets for review — token-efficient |
| `get_impact_radius_tool` | Understanding blast radius of a change |
| `get_affected_flows_tool` | Finding which execution paths are impacted |
| `query_graph_tool` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes_tool` | Finding functions/classes by name or keyword |
| `get_architecture_overview_tool` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes_tool` for code review.
3. Use `get_affected_flows_tool` to understand impact.
4. Use `query_graph_tool` pattern="tests_for" to check coverage.
