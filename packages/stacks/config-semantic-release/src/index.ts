import { ConfigFunction } from "@nmsys/stack-config";

interface Branch {
  name: string;
  prerelease: boolean;
}

interface ChangelogPluginOption {
  changelogFile: string;
  changelogTitle: string;
}

interface GitPluginOption {
  assets: string[];
  message: string;
}

type ChangelogPlugin = ["@semantic-release/changelog", ChangelogPluginOption];
type GitPlugin = ["@semantic-release/git", GitPluginOption];

type Plugin = GitPlugin | ChangelogPlugin;

export interface SemanticConfig {
  extends: string | string[];
  branch: string | string[] | Branch;
  plugins: (string | Plugin)[];
}

const semantic: ConfigFunction<void, SemanticConfig> = (_root) => {
  return {
    extends: ["semantic-release-monorepo"],
    branch: "master",
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      [
        "@semantic-release/changelog",
        {
          changelogFile: "CHANGELOG.md",
          changelogTitle: "Release notes",
        },
      ],
      "@semantic-release/npm",
      [
        "@semantic-release/git",
        {
          assets: ["**/CHANGELOG.md", "**/docs", "**/package.json", "**/yarn.lock"],
          message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        },
      ],
      "@semantic-release/github",
    ],
  };
};

export default semantic;
