## General programming guide

[`salt-sdk`](https://npmjs.com/package/salt-sdk) is a publically available `npm`
package that you can use today!

### salt/salt.ts

However, it is rather low level. [`salt.ts`](./salt/salt.ts) provides
a higher-level API for using SALT's software interactively. **This is likely the most
interesting part of this repo**, the rest is example code using the exported
higher-level function `sendTransaction`.

This file should be really helpful for readers wondering how to use SALT.

### salt/strategies

Every subfolder in the `/strategies` folder contains an example of how to use SALT with another protocol.
The integration is straightforward, it only consists in passing the needed inputs to `sendTransaction` which takes care of the rest

### config.ts

Reads in process.env including `process.env.PRIVATE_KEY` and exports the ethersjs networks and wallet

### index.ts

When run, starts a TUI.
The main entry point
