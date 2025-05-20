from eth_account import Account
Account.enable_unaudited_hdwallet_features()
wallet = Account.create()
print(f"Address: {wallet.address}")
print(f"Private Key: {wallet.key.hex()}")