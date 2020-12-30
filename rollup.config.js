import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import svelteReadme from "svelte-readme";
import pkg from "./package.json";

const DEV = process.env.ROLLUP_WATCH;
const BUNDLE = process.env.BUNDLE === "true";

export default () => {
  if (!BUNDLE) {
    return svelteReadme({
      svelte: { dev: DEV, immutable: true },
      minify: !DEV,
      style: `
        /**
         * CSS for a GitHub Primer button
         * https://primer.style/css/components/buttons
         **/
        .code-fence button {
          font-family: inherit;
          text-transform: none;
          position: relative;
          display: block;
          padding: 5px 16px;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          border: 1px solid;
          border-radius: 6px;
          appearance: none;
          color: #24292e;
          background-color: #fafbfc;
          border-color: rgba(27,31,35,0.15);
          box-shadow: 0 1px 0 rgba(27,31,35,0.04), inset 0 1px 0 rgba(255,255,255,0.25);
          transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        }

        .code-fence button {
          margin-bottom: 12px;
        }
      `
    });
  }

  return ["es", "umd"].map((format) => {
    const UMD = format === "umd";

    return {
      input: pkg.svelte,
      output: {
        format,
        file: UMD ? pkg.main : pkg.module,
        name: UMD ? pkg.name : undefined,
        exports: "named",
      },
      plugins: [svelte(), resolve()],
    };
  });
};