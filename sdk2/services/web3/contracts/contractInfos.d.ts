export default function getContractsDetails(chainId: number): {
    VaultFactory: {
        address: string;
        birthBlock: number;
    };
    MultiCall: {
        address: string;
        birthBlock: number;
    };
};
