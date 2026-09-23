---
name: code-review-graph-setup
description: Set up and use code-review-graph MCP tools for this repo — install, build, watch, the Windows CONNECT_TIMEOUT fix, and which graph tool to use for which task
---

## セットアップ

**code-review-graph (https://github.com/tirth8205/code-review-graph) は導入済みです。**

新しい開発者・新しい端末でこのリポジトリを開いた場合は、リポジトリのルートで以下を実行してください
（`.mcp.json` は環境依存の絶対パスを含むため `.gitignore` 対象で、各自の環境で個別に生成する必要があります）。

```bash
# リポジトリごとに1回、MCPサーバー設定を生成
code-review-graph install --platform claude-code -y

# グラフDBをビルド
code-review-graph build

# 変更を監視してグラフを自動更新（開発中はバックグラウンドで実行しておく）
code-review-graph watch
```

## Windowsでの接続タイムアウト対策

**Windows: デフォルト設定（`uvx`経由）だとMCP接続が`CONNECT_TIMEOUT`で失敗することがあります。**
その場合は `.mcp.json` の `command` をインストール済みの `code-review-graph.exe` の絶対パスに
直接書き換えてください（`python -c "import shutil; print(shutil.which('code-review-graph'))"` で場所を確認できます）。

```json
{
  "mcpServers": {
    "code-review-graph": {
      "command": "C:\\path\\to\\code-review-graph.exe",
      "args": ["serve", "--repo", "C:\\path\\to\\repo"],
      "cwd": "C:\\path\\to\\repo",
      "type": "stdio",
      "env": { "PYTHONUTF8": "1" }
    }
  }
}
```

設定変更後はアプリ/セッションの再起動が必要です（`.mcp.json`はセッション開始時にしか読み込まれません）。

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
