#! deno i; nu fix.nu; deno run --unstable-sloppy-imports -A src/index.ts

let $orig = "node_modules/.deno/@intuweb3+sdk@0.0.433/node_modules/@intuweb3/sdk/utils/json-imports.js";
let $new = open $orig | str replace --all '.json";' '.json" with { type: "json" }; // (changed by fix.nu)'

$new | save -f $orig