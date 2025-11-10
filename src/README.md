## General programming guide
[`salt-sdk`](https://npmjs.com/package/salt-sdk) is a publically available `npm`
package that you can use today!

### transaction.ts
However, it is rather low level. [`transaction.ts`](./transaction.ts) provides
a higher-level API for using it interactively. **This is likely the most
interesting part of this repo**, the rest is example code using the exported
higher-level function `transfer`.

### constants.ts
Reads in process.env including `process.env.PRIVATE_KEY` and exports the ethersjs networks and wallet

### index.ts
When run, starts a TUI.
The main entry point
