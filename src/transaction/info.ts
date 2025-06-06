import { ethers } from "ethers";
import { askForInput } from "../helpers";

/** Information required to complete a transaction */
export type TransactionInfoConstructor =
	| TransactionInfo
	| {
			vaultAddress?: string;
			recipientAddress?: string;
			amount?: string | Number;
			gasEstimate?: GasEstimateConstructor;
			data?: string;
			skipConfirmation?: boolean | undefined;
			logging?: (...things: any[]) => void | undefined;
	  };

type InternalConstructor = {
	vaultAddress: string;
	recipientAddress: string;
	amount: string;
	skipConfirmation: boolean;
	gasEstimate: GasEstimate;
	data: string;
	log: (...things: any[]) => void | undefined;
	key: Symbol;
};
const key = Symbol("Transaction Info private constructor key");

export class TransactionInfo {
	saltPublicAddress: string;
	recipientAddress: string;
	amount: string;
	skipConfirmation: boolean;
	gasEstimate: GasEstimate;
	log: (...things: any[]) => void | undefined;
	data: string;

	/** @private */
	private constructor(info: InternalConstructor) {
		if (info.key !== key) {
			throw new Error(
				"Don't manually construct `new TransactionInfo({ ... })`, use `await Transaction.new({ ... })`",
			);
		}
		this.saltPublicAddress = info.vaultAddress;
		this.recipientAddress = info.recipientAddress;
		this.amount = info.amount;
		this.skipConfirmation = info.skipConfirmation;
		this.gasEstimate = info.gasEstimate;
		this.log = info.log;
		this.data = info.data;
	}

	static async new(info: TransactionInfoConstructor): Promise<TransactionInfo> {
		if (info instanceof TransactionInfo) {
			return info;
		}
		const self = { key } as any as InternalConstructor;

		if (typeof info !== "object") {
			throw new TypeError(
				`Expected info to be of type object, not ${typeof info}`,
			);
		}

		// logging defaults to console.info
		self.log =
			info.logging ??
			((...things: any[]) => {
				console.info(...things);
			});

		self.gasEstimate = new GasEstimate(info.gasEstimate);

		self.vaultAddress =
			info.vaultAddress ||
			(await askForInput(
				`Please enter the account address from where you wish to execute the transfer: `,
			));
		if (!ethers.utils.isAddress(self.vaultAddress)) {
			throw new Error(
				"You need a valid account address to propose a transaction",
			);
		}

		self.recipientAddress =
			info.recipientAddress ||
			(await askForInput(`Please enter the recipient's address: `));
		if (!ethers.utils.isAddress(self.recipientAddress)) {
			throw new Error(
				"You need a valid recipient address to propose a transaction",
			);
		}

		if (typeof info.amount === "number" && info.amount <= 0) {
			throw new RangeError(
				"You need a positive amount to propose a transaction",
			);
		}
		if (typeof info.amount === "number") {
			self.amount = String(info.amount);
		} else if (typeof info.amount === "string") {
			self.amount = info.amount;
		} else {
			self.amount = await askForInput(`Please enter the amount to transfer: `);
		}

		self.skipConfirmation = info.skipConfirmation === true;

		self.data = info.data ?? "";

		return new TransactionInfo(self);
	}
}

export type GasEstimateConstructor =
	| GasEstimate
	| ((initial: number) => number)
	| undefined;

/** See [GasEstimate.estimate] */
export class GasEstimate {
	handler: (initial: number) => number;

	constructor(input: GasEstimateConstructor) {
		if (input instanceof GasEstimate) {
			this.handler = input.handler;
		} else if (typeof input === "function") {
			this.handler = input;
		} else if (typeof input === "number") {
			this.handler = (initial) => initial * input;
		} else if (input === undefined) {
			this.handler = (initial) => initial;
		} else {
			throw new Error(
				`Invalid input type ${typeof input}, expected function or number`,
			);
		}
	}

	/** Takes as input an initial estimate and uses the result */
	estimate(initial: number): number {
		return this.handler(initial);
	}
}
