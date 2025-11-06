(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[555],
	{
		82931: function (e, t, a) {
			Promise.resolve().then(a.bind(a, 78499));
		},
		78499: function (e, t, a) {
			"use strict";
			(a.r(t),
				a.d(t, {
					default: function () {
						return ed;
					},
				}));
			var n = a(57437),
				s = a(66070),
				i = a(61994);
			let r = [
					{
						size: "w-[40px] h-[40px]",
						rotate: "-rotate-210",
						blur: "filter blur-[2px]",
					},
					{ size: "w-20 h-20" },
					{
						size: "w-[40px] h-[40px]",
						rotate: "rotate-210",
						blur: "filter blur-[2px]",
					},
				],
				l = () =>
					(0, n.jsx)("div", {
						className: "flex items-center justify-center gap-6 pb-6",
						children: r.map((e, t) =>
							(0, n.jsx)(
								s.Zb,
								{
									className: (0, i.Z)(
										"bg-transparent border-none shadow-none",
										e.rotate,
									),
									children: (0, n.jsx)(s.aY, {
										className: "p-0",
										children: (0, n.jsx)("div", {
											className: (0, i.Z)(
												e.size,
												"text-blue-600 flex items-center justify-center",
											),
											children: (0, n.jsx)("img", {
												src: "/staking/circles-pattern.svg",
												className: (0, i.Z)("w-full h-full"),
												style: {
													filter: (0, i.Z)(
														"brightness(0) saturate(100%) invert(43%) sepia(93%) saturate(6200%) hue-rotate(235deg) brightness(101%) contrast(101%)",
														e.blur && "blur(2px)",
													),
												},
											}),
										}),
									}),
								},
								t,
							),
						),
					}),
				d = (e) => {
					let t = "string" == typeof e ? parseInt(e.replace(/\s+/g, "")) : e;
					return new Intl.NumberFormat("ru-RU").format(t);
				},
				o = (e) => {
					let { value: t, label: a } = e;
					return (0, n.jsx)(s.Zb, {
						className:
							"flex flex-col border-2 border-solid border-somnia-color-border-primary-02 rounded-[32px] bg-somnia-color-background-primary-01",
						children: (0, n.jsxs)(s.aY, {
							className: "flex flex-col justify-center gap-6 p-8",
							children: [
								(0, n.jsx)("div", {
									className: "font-polysans inline-flex items-end gap-2",
									children: (0, n.jsx)("span", {
										className:
											"text-[40px] leading-none font-polysans font-semibold text-center tracking-[0.80px]",
										children: d(t),
									}),
								}),
								(0, n.jsx)("span", {
									className:
										"text-[20px] font-semibold font-polysans leading-none text-[#777]",
									children: a,
								}),
							],
						}),
					});
				},
				p = (e) => {
					let { validationCommittee: t } = e,
						a = Array.isArray(t)
							? t.map((e) =>
									"object" == typeof e && null !== e && "stakedAmount" in e
										? BigInt(e.stakedAmount.toString())
										: 0n,
								)
							: [],
						i = a.length > 0 ? a.reduce((e, t) => e + Number(t), 0) : 0,
						r = i > 0 ? Number(i) / 1e18 : 0;
					return (0, n.jsxs)("section", {
						className: "w-full mx-auto mt-[88px]",
						children: [
							(0, n.jsx)(s.Zb, {
								className: "border-none shadow-none",
								children: (0, n.jsx)(s.aY, {
									className: "flex items-center p-0 pb-6",
									children: (0, n.jsx)("h2", {
										className:
											"flex-1 font-heading-primary-heading-02 text-[32px] tracking-[0.64px] text-somnia-color-text-primary-01",
										children: "Stats",
									}),
								}),
							}),
							(0, n.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full",
								children: [
									(0, n.jsx)(o, {
										value: (null == t ? void 0 : t.length) || 0,
										label: "Validators",
									}),
									(0, n.jsx)(o, { value: r, label: "Total Staked" }),
								],
							}),
						],
					});
				};
			var u = a(95186),
				m = a(17748),
				c = a(33145),
				y = a(73578),
				f = a(73247),
				x = a(2265);
			let b = (e) => (t) =>
				e <= 7
					? Array.from({ length: e }, (e, t) => t + 1)
					: t <= 3
						? [1, 2, 3, 4, 5, -1, e]
						: t >= e - 2
							? [1, -1, e - 4, e - 3, e - 2, e - 1, e]
							: [1, -1, t - 1, t, t + 1, -1, e];
			var g = a(27323),
				v = a(16986),
				h = JSON.parse(
					'{"Mt":[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"DEFAULT_ADMIN_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"NODE_CALLER_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"UPGRADER_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"UPGRADE_INTERFACE_VERSION","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"_sortWeightedValues","inputs":[{"name":"data","type":"tuple[]","internalType":"struct NodeCommitteeV2.WeightedValue[]","components":[{"name":"value","type":"uint256","internalType":"uint256"},{"name":"weight","type":"uint256","internalType":"uint256"}]}],"outputs":[{"name":"","type":"tuple[]","internalType":"struct NodeCommitteeV2.WeightedValue[]","components":[{"name":"value","type":"uint256","internalType":"uint256"},{"name":"weight","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"burnFeePercentage","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"finaliseEpoch","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getCurrentEpochCommittee","inputs":[],"outputs":[{"name":"","type":"tuple[]","internalType":"struct INodeCommitteeV2.Node[]","components":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommitteeV2.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}]}],"stateMutability":"view"},{"type":"function","name":"getCurrentGasPrice","inputs":[{"name":"baseFee","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getFinalisedNodes","inputs":[],"outputs":[{"name":"","type":"tuple[]","internalType":"struct INodeCommitteeV2.Node[]","components":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommitteeV2.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}]}],"stateMutability":"view"},{"type":"function","name":"getNextEpochCommittee","inputs":[],"outputs":[{"name":"","type":"tuple[]","internalType":"struct INodeCommitteeV2.Node[]","components":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommitteeV2.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}]}],"stateMutability":"view"},{"type":"function","name":"getRegisteredNode","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getRoleAdmin","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"getWarnedNodeWeight","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"grantRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"hasRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"initialize","inputs":[{"name":"upgrader","type":"address","internalType":"address"},{"name":"initialMaxNodes","type":"uint256","internalType":"uint256"},{"name":"initialBurnFeePercentage","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"joinCommittee","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"amountToStake","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommitteeV2.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"leaveCommittee","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"maxNodes","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"moveToNextEpoch","inputs":[{"name":"rewardsPayedToContract","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"nodeCommitteeStaking","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"proxiableUUID","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"renounceRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"callerConfirmation","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"revokeRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setBurnFeePercentage","inputs":[{"name":"newBurnFeePercentage","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setNodeCommitteeStaking","inputs":[{"name":"newNodeCommitteeStaking","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setNodeGasPriceVote","inputs":[{"name":"gasPriceVote","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"updateNodeStake","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"newStake","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"upgradeToAndCall","inputs":[{"name":"newImplementation","type":"address","internalType":"address"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"voteInactiveNode","inputs":[{"name":"peer_address","type":"address","internalType":"address"},{"name":"is_active","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"BurnFeePercentageUpdated","inputs":[{"name":"newPercentage","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"EpochFinalized","inputs":[{"name":"numNodes","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"EpochMoved","inputs":[{"name":"rewardsDistributed","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"name":"version","type":"uint64","indexed":false,"internalType":"uint64"}],"anonymous":false},{"type":"event","name":"NodeJoinedCommittee","inputs":[{"name":"nodeAddress","type":"address","indexed":true,"internalType":"address"},{"name":"stakedAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"publicKeys","type":"tuple","indexed":false,"internalType":"struct INodeCommitteeV2.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NodeLeftCommittee","inputs":[{"name":"nodeAddress","type":"address","indexed":true,"internalType":"address"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NodeStakeUpdated","inputs":[{"name":"nodeAddress","type":"address","indexed":true,"internalType":"address"},{"name":"newStake","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NodeVotedInactive","inputs":[{"name":"nodeAddress","type":"address","indexed":true,"internalType":"address"},{"name":"peerAddress","type":"address","indexed":true,"internalType":"address"},{"name":"isActive","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"previousAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"newAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"StakingContractUpdated","inputs":[{"name":"newStakingContract","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Upgraded","inputs":[{"name":"implementation","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"error","name":"AccessControlBadConfirmation","inputs":[]},{"type":"error","name":"AccessControlUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"neededRole","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"AddressEmptyCode","inputs":[{"name":"target","type":"address","internalType":"address"}]},{"type":"error","name":"ERC1967InvalidImplementation","inputs":[{"name":"implementation","type":"address","internalType":"address"}]},{"type":"error","name":"ERC1967NonPayable","inputs":[]},{"type":"error","name":"FailedCall","inputs":[]},{"type":"error","name":"InvalidInitialization","inputs":[]},{"type":"error","name":"NodeCommittee_CommitteeFull","inputs":[]},{"type":"error","name":"NodeCommittee_EpochAlreadyFinalised","inputs":[]},{"type":"error","name":"NodeCommittee_EpochAlreadySettled","inputs":[]},{"type":"error","name":"NodeCommittee_EpochNotFinalised","inputs":[]},{"type":"error","name":"NodeCommittee_FailedToBurnFees","inputs":[]},{"type":"error","name":"NodeCommittee_FailedToSendFeesToStaking","inputs":[]},{"type":"error","name":"NodeCommittee_InsufficientBalance","inputs":[]},{"type":"error","name":"NodeCommittee_NoNodesToFinalise","inputs":[]},{"type":"error","name":"NodeCommittee_NodeAlreadyRegistered","inputs":[]},{"type":"error","name":"NodeCommittee_NodeNotInCommittee","inputs":[]},{"type":"error","name":"NodeCommittee_NodeNotRegistered","inputs":[]},{"type":"error","name":"NodeCommittee_OnlyNodeCanCallThisFunction","inputs":[]},{"type":"error","name":"NodeCommittee_OnlyStakingContractCanCallThisFunction","inputs":[]},{"type":"error","name":"NodeCommittee_PreviousEpochNotFinalised","inputs":[]},{"type":"error","name":"NodeCommittee_PreviousEpochNotSettled","inputs":[]},{"type":"error","name":"NotInitializing","inputs":[]},{"type":"error","name":"UUPSUnauthorizedCallContext","inputs":[]},{"type":"error","name":"UUPSUnsupportedProxiableUUID","inputs":[{"name":"slot","type":"bytes32","internalType":"bytes32"}]}]}',
				),
				T = JSON.parse(
					'{"Mt":[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"DEFAULT_ADMIN_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"DEVELOPMENT_ADMIN","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"MIN_SELF_STAKE_PERCENTAGE","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"NODE_CALLER_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"STAKER_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"UPGRADER_ROLE","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"UPGRADE_INTERFACE_VERSION","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"accumulatedRewardsPerShare","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"addStakers","inputs":[{"name":"newValidators","type":"address[]","internalType":"address[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"applyPendingRateChanges","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"claimDelegatorRewards","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"claimValidatorsRewards","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"createStaker","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"defaultDelegateStakeRate","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"delegateStake","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"delegatedStakes","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"delegationInfoByValidator","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"accumulatedRewardsPerShareSnapshot","type":"uint256","internalType":"uint256"},{"name":"pendingRewards","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"delegations","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"emergencyApplyRateChange","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"emergencyRemoveValidator","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"emergencyUnstakeRequest","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getAccumulatedRewards","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getCommitteeValidatorCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getCommitteeValidators","inputs":[],"outputs":[{"name":"","type":"address[]","internalType":"address[]"}],"stateMutability":"view"},{"type":"function","name":"getDelegatedStakerRewards","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"delegator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getDelegationByValidator","inputs":[{"name":"staker","type":"address","internalType":"address"},{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getDelegationInfo","inputs":[{"name":"staker","type":"address","internalType":"address"},{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"pendingRewards","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getDelegations","inputs":[{"name":"staker","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"address[]","internalType":"address[]"}],"stateMutability":"view"},{"type":"function","name":"getPartialUnstakeRewards","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getRoleAdmin","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"getStake","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ISomniaStaking.Stake","components":[{"name":"validator","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"accumulatedRewards","type":"uint256","internalType":"uint256"},{"name":"delegatedStake","type":"uint256","internalType":"uint256"},{"name":"delegateStakeRate","type":"uint256","internalType":"uint256"},{"name":"delegateStakeAccumulatedRewards","type":"uint256","internalType":"uint256"},{"name":"lastIncreaseFinalisedEpoch","type":"uint256","internalType":"uint256"},{"name":"stakeBeforeLastIncrease","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"getTimeUntilUnstake","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUnstakeRequestTime","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getValidatorDelegatedStakeRate","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getValidatorTotalStakeAmount","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getValidatorWeightedStakeAmount","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"grantRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"hasRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"initialize","inputs":[{"name":"upgrader","type":"address","internalType":"address"},{"name":"nodeCommitteeAddress","type":"address","internalType":"address"},{"name":"initialUnstakePeriod","type":"uint256","internalType":"uint256"},{"name":"initialMinStake","type":"uint256","internalType":"uint256"},{"name":"initialDefaultDelegateStakeRate","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"isValidatorInCommittee","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isValidatorMarkedForRemoval","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"joinCommittee","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommittee.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"leaveCommittee","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"minSelfStake","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"minStake","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"nextEpochDelegatedStakes","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"delegator","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"nextEpochMinStake","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"nextEpochOwnStakes","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"nodeCallerStakeAndJoinCommittee","inputs":[{"name":"nodeAddress","type":"address","internalType":"address"},{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommittee.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"nodeCommittee","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"nodeCommitteeValidators","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"partialUnstake","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"pendingRateChanges","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"newRate","type":"uint256","internalType":"uint256"},{"name":"hasPendingChange","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"proxiableUUID","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"renounceRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"callerConfirmation","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"requestTotalUnstake","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"revokeRole","inputs":[{"name":"role","type":"bytes32","internalType":"bytes32"},{"name":"account","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setDefaultDelegatedStakeRate","inputs":[{"name":"newRate","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMinStake","inputs":[{"name":"newMinStake","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setUnstakePeriod","inputs":[{"name":"newUnstakePeriod","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setValidatorDelegatedStakeRate","inputs":[{"name":"newRate","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"stakeAndJoinCommittee","inputs":[{"name":"stakedAmount","type":"uint256","internalType":"uint256"},{"name":"publicKeys","type":"tuple","internalType":"struct INodeCommittee.PublicKeys","components":[{"name":"ecdsaPublicKey","type":"bytes","internalType":"bytes"},{"name":"blsPublicKey","type":"bytes","internalType":"bytes"},{"name":"proofOfPossession","type":"bytes","internalType":"bytes"},{"name":"proofOfAddress","type":"bytes","internalType":"bytes"}]}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"totalStaked","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"totalUnstake","inputs":[{"name":"validator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"undelegateStake","inputs":[{"name":"validator","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unstakePeriod","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"updateRewardsFromEpoch","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"payable"},{"type":"function","name":"updateStake","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"upgradeToAndCall","inputs":[{"name":"newImplementation","type":"address","internalType":"address"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"validatorsMarkedForRemoval","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validatorsToRemove","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"event","name":"DefaultDelegatedStakeRateUpdated","inputs":[{"name":"rate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DelegateStakeRateChangeApplied","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"rate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DelegateStakeRateChangeRequested","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"newRate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DelegatedStake","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DelegatedStakeUpdated","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DelegatorFundsProtected","inputs":[{"name":"delegator","type":"address","indexed":true,"internalType":"address"},{"name":"validator","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"EmergencyUnstakeRequested","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"name":"version","type":"uint64","indexed":false,"internalType":"uint64"}],"anonymous":false},{"type":"event","name":"MinStakeUpdated","inputs":[{"name":"newMinStake","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NextEpochStakeUpdated","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"stakedAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RewardsClaimed","inputs":[{"name":"staker","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"previousAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"newAdminRole","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"name":"role","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"sender","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"StakeCreated","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"stakedAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"StakeJoinedToCommittee","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"totalStaked","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"StakeUnstaked","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"StakeUpdated","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"stakedAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"StakerLeftCommittee","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"StakerRolesAdded","inputs":[{"name":"validators","type":"address[]","indexed":false,"internalType":"address[]"}],"anonymous":false},{"type":"event","name":"TotalUnstakeRequested","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"UndelegatedStake","inputs":[{"name":"validator","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"delegator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"UnstakePeriodUpdated","inputs":[{"name":"newUnstakePeriod","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Upgraded","inputs":[{"name":"implementation","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"ValidatorMarkedForRemoval","inputs":[{"name":"validator","type":"address","indexed":true,"internalType":"address"},{"name":"totalStake","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"minStake","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ValidatorRemovalFailed","inputs":[{"name":"validator","type":"address","indexed":true,"internalType":"address"},{"name":"reason","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"ValidatorRemovedFromCommittee","inputs":[{"name":"validator","type":"address","indexed":true,"internalType":"address"},{"name":"reason","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"error","name":"AccessControlBadConfirmation","inputs":[]},{"type":"error","name":"AccessControlUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"neededRole","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"AddressEmptyCode","inputs":[{"name":"target","type":"address","internalType":"address"}]},{"type":"error","name":"ERC1967InvalidImplementation","inputs":[{"name":"implementation","type":"address","internalType":"address"}]},{"type":"error","name":"ERC1967NonPayable","inputs":[]},{"type":"error","name":"FailedCall","inputs":[]},{"type":"error","name":"InvalidInitialization","inputs":[]},{"type":"error","name":"NotInitializing","inputs":[]},{"type":"error","name":"SomniaStaking_IncorrectValue","inputs":[]},{"type":"error","name":"SomniaStaking_InsufficientStake","inputs":[]},{"type":"error","name":"SomniaStaking_InvalidDelegateStakeRate","inputs":[]},{"type":"error","name":"SomniaStaking_InvalidNodeCommitteeAddress","inputs":[]},{"type":"error","name":"SomniaStaking_InvalidValidator","inputs":[]},{"type":"error","name":"SomniaStaking_MustMaintainMinSelfStake","inputs":[]},{"type":"error","name":"SomniaStaking_NoRewardsToClaim","inputs":[]},{"type":"error","name":"SomniaStaking_NoStake","inputs":[]},{"type":"error","name":"SomniaStaking_NoUnstakeRequest","inputs":[]},{"type":"error","name":"SomniaStaking_NotOverstaked","inputs":[]},{"type":"error","name":"SomniaStaking_OnlyDevs","inputs":[]},{"type":"error","name":"SomniaStaking_OnlyNodeCommittee","inputs":[]},{"type":"error","name":"SomniaStaking_OnlyStaker","inputs":[]},{"type":"error","name":"SomniaStaking_OnlyValidator","inputs":[]},{"type":"error","name":"SomniaStaking_SelfDelegationNotAllowed","inputs":[]},{"type":"error","name":"SomniaStaking_TransferFailed","inputs":[]},{"type":"error","name":"SomniaStaking_UnstakePeriodNotOver","inputs":[]},{"type":"error","name":"SomniaStaking_ValidatorDoesNotExist","inputs":[]},{"type":"error","name":"SomniaStaking_ValidatorInCommittee","inputs":[]},{"type":"error","name":"SomniaStaking_ValidatorIsNotSender","inputs":[]},{"type":"error","name":"SomniaStaking_ValidatorNotInCommittee","inputs":[]},{"type":"error","name":"SomniaStaking_ValidatorUnderstaked","inputs":[]},{"type":"error","name":"UUPSUnauthorizedCallContext","inputs":[]},{"type":"error","name":"UUPSUnsupportedProxiableUUID","inputs":[{"name":"slot","type":"bytes32","internalType":"bytes32"}]}]}',
				),
				N = a(71282);
			let w = function (e, t, a, n) {
				let s =
						arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
					{ data: i } = (0, g.u)({
						address: "0x7b8b1bb68c6f0e29f3addcb45a6c0bb8e8e331c7",
						abi: h.Mt,
						functionName: "getCurrentEpochCommittee",
						query: { enabled: !0, retry: 3, retryDelay: 500 },
					}),
					r = (0, x.useMemo)(
						() =>
							i && Array.isArray(i)
								? i.map((e) => ({
										address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
										abi: T.Mt,
										functionName: "getAccumulatedRewards",
										args: [e.nodeAddress],
									}))
								: [],
						[i],
					),
					l = (0, x.useMemo)(
						() =>
							i && Array.isArray(i)
								? i.map((e) => ({
										address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
										abi: T.Mt,
										functionName: "getValidatorDelegatedStakeRate",
										args: [e.nodeAddress],
									}))
								: [],
						[i],
					),
					d = (0, x.useMemo)(
						() =>
							i && Array.isArray(i)
								? i.map((e) => ({
										address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
										abi: T.Mt,
										functionName: "getValidatorTotalStakeAmount",
										args: [e.nodeAddress],
									}))
								: [],
						[i],
					),
					{ data: o } = (0, v.N)({
						contracts: r,
						query: { enabled: r.length > 0 },
					}),
					{ data: p } = (0, v.N)({
						contracts: l,
						query: { enabled: l.length > 0 },
					}),
					{ data: u } = (0, v.N)({
						contracts: d,
						query: { enabled: d.length > 0 },
					}),
					m = (0, x.useMemo)(
						() =>
							i && Array.isArray(i)
								? i.map((e, t) => {
										var a, n, i;
										let r = e.nodeAddress,
											l =
												u && u[t]
													? (null === (a = u[t].result) || void 0 === a
															? void 0
															: a.toString()) || "0"
													: void 0,
											d = parseFloat(
												void 0 !== l
													? (0, N.d)(BigInt(l))
													: e.stakedAmount
														? (0, N.d)(BigInt(e.stakedAmount.toString()))
														: "0",
											).toLocaleString("en-US", {
												maximumFractionDigits: 0,
												minimumFractionDigits: 0,
											}),
											m = parseFloat(
												o && o[t]
													? (0, N.d)(
															BigInt(
																(null === (n = o[t].result) || void 0 === n
																	? void 0
																	: n.toString()) || "0",
															),
														)
													: "0",
											).toLocaleString("en-US", {
												maximumFractionDigits: 0,
												minimumFractionDigits: 0,
											}),
											c = (
												(p && p[t]
													? Number(
															(null === (i = p[t].result) || void 0 === i
																? void 0
																: i.toString()) || "0",
														)
													: 0) / 100
											).toFixed(1),
											y =
												s[r.toLowerCase()] ||
												"".concat(r.slice(0, 6), "...").concat(r.slice(-4));
										return {
											id: t + 1,
											icon: "https://api.dicebear.com/9.x/rings/png?seed=".concat(
												r,
											),
											name: y,
											address: r,
											totalStaked: "".concat(d, " STT"),
											nextRound: "Yes",
											earnings: "".concat(m, " STT"),
											delegationRate: "".concat(c, "%"),
										};
									})
								: [],
						[i, o, p, s],
					),
					c = (0, x.useMemo)(() => {
						let a = m;
						return (
							e &&
								(a = a.filter((t) =>
									Object.values(t)
										.map((e) => String(e).toLowerCase())
										.some((t) => t.includes(e.toLowerCase().trim())),
								)),
							a.sort((e, a) => {
								if (!t.key) return 0;
								if ("name" === t.key)
									return "asc" === t.direction
										? e.name.localeCompare(a.name)
										: a.name.localeCompare(e.name);
								let n = parseInt(String(e[t.key]).replace(/[^\d]/g, ""), 10),
									s = parseInt(String(a[t.key]).replace(/[^\d]/g, ""), 10);
								return "asc" === t.direction ? n - s : s - n;
							}),
							a
						);
					}, [e, t, m]),
					y = (a - 1) * n;
				return {
					paginatedData: c.slice(y, y + n),
					totalPages: Math.ceil(c.length / n),
					totalItems: c.length,
					allValidators: m,
				};
			};
			var C = a(20265),
				j = a(15051);
			let k = (e, t) =>
					t.key !== e
						? "/staking/chevron-up-down.svg"
						: "desc" === t.direction
							? (0, n.jsx)(C.Z, { size: 16 })
							: (0, n.jsx)(j.Z, { size: 16 }),
				S = (e) => {
					let { onSort: t, sortConfig: a } = e;
					return (0, n.jsx)(y.xD, {
						children: (0, n.jsxs)(y.SC, {
							className: "border-none",
							children: [
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02",
									children: (0, n.jsxs)("div", {
										className: (0, i.Z)(
											"flex items-center gap-2 cursor-pointer",
											"name" === a.key && "font-semibold",
										),
										onClick: () => t("name"),
										children: [
											"Validator",
											"string" == typeof k("name", a)
												? (0, n.jsx)(c.default, {
														src: k("name", a),
														className:
															"hover:cursor-pointer somnia-home-header",
														alt: "chevron Logo",
														width: 16,
														height: 16,
														style: { pointerEvents: "none" },
													})
												: k("name", a),
										],
									}),
								}),
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02",
									children: (0, n.jsxs)("div", {
										className: (0, i.Z)(
											"flex items-center gap-2 cursor-pointer",
											"totalStaked" === a.key && "font-semibold",
										),
										onClick: () => t("totalStaked"),
										children: [
											"Total staked",
											"string" == typeof k("totalStaked", a)
												? (0, n.jsx)(c.default, {
														src: k("totalStaked", a),
														className:
															"hover:cursor-pointer somnia-home-header",
														alt: "chevron Logo",
														width: 16,
														height: 16,
														style: { pointerEvents: "none" },
													})
												: k("totalStaked", a),
										],
									}),
								}),
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02 text-center",
									children: "Next validation round",
								}),
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02 text-center",
									children: (0, n.jsxs)("div", {
										className: (0, i.Z)(
											"flex items-center justify-center gap-2 cursor-pointer",
											"delegationRate" === a.key && "font-semibold",
										),
										onClick: () => t("delegationRate"),
										children: [
											"Delegation Rate",
											"string" == typeof k("delegationRate", a)
												? (0, n.jsx)(c.default, {
														src: k("delegationRate", a),
														className:
															"hover:cursor-pointer somnia-home-header",
														alt: "chevron Logo",
														width: 16,
														height: 16,
														style: { pointerEvents: "none" },
													})
												: k("delegationRate", a),
										],
									}),
								}),
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02 text-right",
									children: (0, n.jsxs)("div", {
										className: (0, i.Z)(
											"flex items-center justify-end gap-2 cursor-pointer",
											"earnings" === a.key && "font-semibold",
										),
										onClick: () => t("earnings"),
										children: [
											"Earnings",
											"string" == typeof k("earnings", a)
												? (0, n.jsx)(c.default, {
														src: k("earnings", a),
														className:
															"hover:cursor-pointer somnia-home-header",
														alt: "chevron Logo",
														width: 16,
														height: 16,
														style: { pointerEvents: "none" },
													})
												: k("earnings", a),
										],
									}),
								}),
								(0, n.jsx)(y.ss, {
									className:
										"font-headline-polysans-h7 text-somnia-color-text-primary-02 text-center",
									children: "Actions",
								}),
							],
						}),
					});
				};
			var A = a(62869),
				E = a(94508),
				D = a(92451),
				M = a(10407),
				R = a(67782);
			let F = (e) => {
					let { className: t, ...a } = e;
					return (0, n.jsx)("nav", {
						role: "navigation",
						"aria-label": "pagination",
						className: (0, E.cn)("mx-auto flex w-full justify-center", t),
						...a,
					});
				},
				B = x.forwardRef((e, t) => {
					let { className: a, ...s } = e;
					return (0, n.jsx)("ul", {
						ref: t,
						className: (0, E.cn)("flex flex-row items-center gap-1", a),
						...s,
					});
				});
			B.displayName = "PaginationContent";
			let P = x.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("li", { ref: t, className: (0, E.cn)("", a), ...s });
			});
			P.displayName = "PaginationItem";
			let I = (e) => {
				let { className: t, isActive: a, size: s = "icon", ...i } = e;
				return (0, n.jsx)("a", {
					"aria-current": a ? "page" : void 0,
					className: (0, E.cn)(
						(0, A.d)({ variant: a ? "outline" : "ghost", size: s }),
						t,
					),
					...i,
				});
			};
			I.displayName = "PaginationLink";
			let _ = (e) => {
				let { className: t, icon: a, ...s } = e;
				return (0, n.jsx)(I, {
					"aria-label": "Go to previous page",
					size: "default",
					className: (0, E.cn)("gap-1 pl-2.5", t),
					...s,
					children: a || (0, n.jsx)(D.Z, { className: "h-4 w-4" }),
				});
			};
			_.displayName = "PaginationPrevious";
			let V = (e) => {
				let { className: t, icon: a, ...s } = e;
				return (0, n.jsx)(I, {
					"aria-label": "Go to next page",
					size: "default",
					className: (0, E.cn)("gap-1 pr-2.5", t),
					...s,
					children: a || (0, n.jsx)(M.Z, { className: "h-4 w-4" }),
				});
			};
			V.displayName = "PaginationNext";
			let O = (e) => {
				let { className: t, ...a } = e;
				return (0, n.jsxs)("span", {
					"aria-hidden": !0,
					className: (0, E.cn)("flex h-9 w-9 items-center justify-center", t),
					...a,
					children: [
						(0, n.jsx)(R.Z, { className: "h-4 w-4" }),
						(0, n.jsx)("span", {
							className: "sr-only",
							children: "More pages",
						}),
					],
				});
			};
			O.displayName = "PaginationEllipsis";
			var U = a(53647),
				z = a(23455);
			let L = (e) => {
					let {
						currentPage: t,
						totalPages: a,
						totalItems: s,
						rowsPerPage: i,
						pageNumbers: r,
						onPageChange: l,
						onRowsPerPageChange: d,
						pageSizeOptions: o = [5, 10, 20, 50, 100],
					} = e;
					return (0, n.jsxs)("div", {
						className:
							"flex lg:flex-row flex-col md:h-10 items-center justify-between mt-4 lg:gap-0 gap-4",
						children: [
							(0, n.jsxs)("div", {
								className:
									"lg:w-[200px] gap-1 w-full flex items-center justify-between",
								children: [
									(0, n.jsxs)("div", {
										className:
											"w-[200px] text-somnia-color-text-primary-02 text-base",
										children: [
											"Showing ",
											(t - 1) * i + 1,
											"-",
											Math.min(t * i, s),
											" out of ",
											s,
										],
									}),
									(0, n.jsxs)("div", {
										className:
											"lg:hidden flex items-center gap-2 w-[200px] justify-end",
										children: [
											(0, n.jsx)("span", {
												className:
													"text-somnia-color-text-primary-02 text-base",
												children: "Show rows",
											}),
											(0, n.jsxs)(U.Ph, {
												value: i.toString(),
												onValueChange: d,
												children: [
													(0, n.jsxs)(U.i4, {
														className:
															"w-[60px] font-semibold bg-somnia-color-background-primary-02 px-3 border-3",
														children: [
															(0, n.jsx)(U.ki, {}),
															(0, n.jsx)(U.GV, {
																color: "invert(0%)",
																width: 10,
																height: 5,
																imageClassName: "w-[10px] h-[5px]",
															}),
														],
													}),
													(0, n.jsx)(U.Bw, {
														children: o.map((e) =>
															(0, n.jsx)(
																U.Ql,
																{
																	value: e.toString(),
																	children: (0, n.jsx)(z.eT, { children: e }),
																},
																e,
															),
														),
													}),
												],
											}),
										],
									}),
								],
							}),
							(0, n.jsx)(F, {
								children: (0, n.jsxs)(B, {
									children: [
										(0, n.jsx)(P, {
											children: (0, n.jsx)(_, {
												className: "h-10 w-10 p-0",
												icon: (0, n.jsx)(D.Z, { className: "h-5 w-5" }),
												onClick: () => l(Math.max(1, t - 1)),
												"aria-disabled": 1 === t,
											}),
										}),
										r.map((e) =>
											(0, n.jsx)(
												P,
												{
													children:
														-1 === e
															? (0, n.jsx)(O, { className: "h-10 w-10 p-0" })
															: (0, n.jsx)(I, {
																	className: "h-10 w-10 p-0 ".concat(
																		t === e
																			? "bg-somnia-color-background-accent-03 text-somnia-color-text-fixed-primary-01"
																			: "text-somnia-color-text-primary-02",
																	),
																	isActive: t === e,
																	onClick: () => l(e),
																	children: e,
																}),
												},
												e,
											),
										),
										(0, n.jsx)(P, {
											children: (0, n.jsx)(V, {
												className: "h-10 w-10 p-0",
												icon: (0, n.jsx)(M.Z, { className: "h-5 w-5" }),
												onClick: () => l(Math.min(a, t + 1)),
												"aria-disabled": t === a,
											}),
										}),
									],
								}),
							}),
							(0, n.jsxs)("div", {
								className:
									"hidden lg:flex items-center gap-2 w-[300px] justify-end",
								children: [
									(0, n.jsx)("span", {
										className: "text-somnia-color-text-primary-02 text-base",
										children: "Show rows",
									}),
									(0, n.jsxs)(U.Ph, {
										value: i.toString(),
										onValueChange: d,
										children: [
											(0, n.jsxs)(U.i4, {
												className:
													"w-[60px] font-semibold bg-somnia-color-background-primary-02 px-3 border-3",
												children: [
													(0, n.jsx)(U.ki, {}),
													(0, n.jsx)(U.GV, {
														color: "invert(0%)",
														width: 10,
														height: 5,
														imageClassName: "w-[10px] h-[5px]",
													}),
												],
											}),
											(0, n.jsx)(U.Bw, {
												children: o.map((e) =>
													(0, n.jsx)(
														U.Ql,
														{
															value: e.toString(),
															children: (0, n.jsx)(z.eT, { children: e }),
														},
														e,
													),
												),
											}),
										],
									}),
								],
							}),
						],
					});
				},
				K = Object.entries({
					"0x84df41070B72Fb96Fc6D20a948ffE5c0FAF4740B": "Everstake",
					"0x3162034F6811Fd01d562AE0E87B171fEB257c914": "Kiln",
					"0xDaCb89974980ae907e5fd39D78F3376178EE811A": "Somnia 3",
					"0xA478B24fb0D5d2B57696E3B6F1725025F006a038": "Xangle",
					"0xEaedE1c36f665258ce04820a759C9eBCc4e7e5D7": "Somnia 0",
					"0x30787D0F7240aD5ea8Cc1181D63b86E9C9E9838E": "Validator Republic",
					"0xA6473f0Dd45C530f7aa397c66Cb495b57a88b999": "Luganodes",
					"0x3A7efB6ba58c5fE5a344fb27402CE1ca1572a870": "BCW",
					"0x0B5ceb82Fe8c2c4Ee86dB4372C01a78F7DF03F93": "Stakin",
					"0x1c4cf549eB8E3DDC98A304197D38DF7668F2bFf6": "Nansen",
					"0x77E0A78Ce13409FEB038A3D590baE93130A35d7e": "Imperator",
					"0x92103f82AfC86D5ac86A06b8E4A5001467FbFad5": "PierTwo",
					"0xD2f97112305bc61816bb0172F37d50889645b3c2": "Infstones",
					"0x2aEeFB7D9dC9345d759EebE6183888006723a2e9": "B-Harvest",
					"0x56c78615aEce02a8e7F5Ded9403027F15c32e404": "Artifact",
					"0x12a76e09BaE1934265a1aeA2812E0c772F372f8d": "Somnia 1",
					"0x8CF8fD3DE8640254dFfaD0B117eaec68d89566C6": "Somnia 2",
					"0xB74C4bfccCF1B06E58c411F0C3Eb15Ac484c8a88": "DSRV",
					"0xE4026557868CD2e43758F0596Cb55a37D7F728DE": "Swyke",
					"0x96E2cc08a49fec32773F79E263f5F19D06637c87": "Chainbase",
					"0x980A703CC531A3d8e5A17B843Dbc4645008915c6": "GlobalStake",
					"0x8cEF30E5abD81Ff9490BF490547B7f29373A3614": "Hightower",
					"0x36Acef0aE66D69b0a9FEFC23ECA23F29486FeC88": "Crouton Digital",
					"0xC435e9a7fd3C0AA40f5AeBAB284995510A1E716b": "SNZ",
					"0x031CB40441bec88F34abCA77382be0605356D73A": "Liquify",
					"0xa2509bf8825233Ebf05d6668E16A8E841D4B8F57": "Moonlet",
					"0xc700201f3a32e1f69d768FE324e95c9D0eA821b0": "Somnia Seed Peer",
					"0x4876bec04d07942e0f56248c184c9f877169fa40": "Iskra",
					"0x391efa3eb47bd8d9e4a4a4a9ee92ca55c4b2c4fd": "Meria",
					"0xdfe7e95c2e321464379a0649eff617abcd53d620": "Nethermind",
					"0x6cd81e02Cff42850A3490d3e9D9C272BAaB754d6": "Rubynodes",
					"0xfC3798c59E81CC2A713ba85e1bCC27a690633043": "Mintair",
					"0xA366397999a39d9ba7bcb86b8558a55463877C7D": "StakeCapital",
					"0xcFC7e08c00764A28bDfC02c34A65Ac22D4Cbfeb4": "Allnodes",
					"0xa904f8b8e2455e00d8a3c03c9064db3f1130bb65": "Tranchess",
					"0xd5525f27c2e268cd04197e29ebeede47608155cd": "Hacken",
					"0x18a7276a6ee2610da0ce95c279c88f9d9249162e": "Block Hunters",
					"0x87B62349E6Cc06191e084c587e3042E283054c61": "01node",
					"0x8B96C17d988fE1e36BecD0343Cc15b2a7E5B2de4": "dTeam",
					"0x34A4C5D00dD4dB19B2400E37c4a3B4D76301fE1b": "ValidationCloud",
					"0x9B3c29eE339bC0f7b7AE3638d39aAC8B014B1bB2": "ValiDAO",
					"0x6e22Af0b819d48B1fB6c5114Bb6Bc7e5Bf95A0BB": "tttVn",
					"0xffA5B629CB85011284bB7708A3E4Fe3759956021": "Encapsulate",
					"0x0E57e18196aA092B374B0B8c74027CcaC01CD9ff": "ValidatorVn",
					"0x3612266dD37576e4C7dcc10325F5a3dF631ADb37": "BCW-2",
					"0x417fefe3bb19f14882ad15fcac4cac635adb0c37": "BCW-1",
					"0x1af74837f1183dce06af68d6b6abd58189a36ea2": "BCW-3",
					"0xd247147a9678Db94Cbb6c189CB6365DaB3349839": "Enigma",
					"0x8B1997fb66F6A3fb8AF1059439dE94D30De2c161": "Technodes",
					"0x8CaA4E607c6c2AE7b345014a0E9E084dC57B4FBa": "Simplystaking",
					"0x17686EA673172D976c3e2456a2b533Dd68588493": "Nodestake",
					"0x329E9BDE7f64DAB3CadA2652D1025a6f53272F01": "P-OPS",
					"0xaE64E22Dc9F8Fe58C2F9d2a6F07De091468AF982": "Nodesguru",
					"0xad326c3c7C9C6911C7caf818095f5641C22b002f": "Google",
					"0x16c38c1b3D6f8d07c6259De1550C1aF7db9BAE0A": "LayerHub",
					"0x33a00962758505387BF72A0567FaC6E467F239B6": "Helios",
					"0x505B0f127247eC497Bc7Df6beC32ebE2c1Be655D": "KingNodes",
					"0xD9A8EC483041e18376E16B16590B42544bBc9160": "Cosmostation",
					"0xE8E4d93aa612a79d87a8A89Af827136d5CBD8F59": "Stakeme",
					"0x3B14dd6F1819768b7C56c8eE8BF7a5f55D411d5f": "Flipside",
					"0xDc24008fC384B2bD9759725e4Faa3F5b4010573d": "Nodemonster",
					"0x3f2C2d7ec0e3711393B7Fd73Da4D3F7B8b35E79A": "OriginStake",
					"0xC168ccB2544c053C2a221d0eDC59bc30a31BC859": "Coinage-DAIC",
				}).reduce((e, t) => {
					let [a, n] = t;
					return ((e[a.toLowerCase()] = n), e);
				}, {});
			var Z = a(26110),
				W = a(64707),
				q = a(97384),
				G = a(53882),
				Y = a(2057),
				H = a(35153);
			function J(e) {
				let {
						validators: t,
						isOpen: a,
						onOpenChange: s,
						preselectedValidator: i,
					} = e,
					{ toast: r } = (0, H.pm)(),
					{ address: l } = (0, W.m)(),
					[d, o] = (0, x.useState)(""),
					[p, m] = (0, x.useState)(""),
					[c, y] = (0, x.useState)(!1),
					[b, g] = (0, x.useState)(!1),
					[v, h] = (0, x.useState)(""),
					N = t.filter(
						(e) =>
							e.name.toLowerCase().includes(v.toLowerCase()) ||
							e.address.toLowerCase().includes(v.toLowerCase()),
					),
					w = void 0 !== a ? a : c;
				(0, x.useEffect)(() => {
					i && w && (o(i.address), h(""));
				}, [i, w]);
				let C = (0, x.useCallback)(
						(e) => {
							s ? s(e) : y(e);
						},
						[s],
					),
					j = () => {
						(i || o(""), m(""), g(!1), h(""));
					},
					{
						writeContract: k,
						writeContractAsync: S,
						isPending: E,
						isSuccess: D,
						isError: M,
						error: R,
					} = (0, q.S)(),
					F = (0, G.t)(),
					[B, P] = (0, x.useState)(null),
					[I, _] = (0, x.useState)(null);
				((0, x.useEffect)(() => {
					let e = !1;
					if (M && R && !e) {
						((e = !0), (V.current = !1));
						let t = R.message || "";
						t.includes("rejected") ||
						t.includes("denied") ||
						t.includes("cancelled")
							? r({
									title: "Transaction Cancelled",
									description: "You rejected the transaction request",
								})
							: r({
									variant: "destructive",
									title: "Transaction failed",
									description: R.message,
								});
					}
					return (
						!D ||
							e ||
							B ||
							((e = !0),
							(V.current = !1),
							r({ title: "Transaction Submitted" })),
						() => {
							e = !0;
						}
					);
				}, [M, R, D, r, s]),
					(0, x.useEffect)(
						() => (
							w || (j(), (V.current = !1)),
							() => {
								V.current = !1;
							}
						),
						[w],
					));
				let V = (0, x.useRef)(!1),
					O = async () => {
						if (!V.current && !E)
							try {
								let e;
								if (!l) {
									r({
										variant: "destructive",
										title: "Wallet not connected",
										description: "Please connect your wallet.",
									});
									return;
								}
								if (!d || !p || 0 >= parseFloat(p)) {
									r({
										variant: "destructive",
										title: "Validation Error",
										description:
											"Please select a validator and enter a valid stake amount",
									});
									return;
								}
								let t = "0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
								if (!t) {
									r({
										variant: "destructive",
										title: "Configuration Error",
										description: "Contract address not found",
									});
									return;
								}
								let a = [d, (0, Y.f)(p)],
									n = (0, Y.f)(p);
								if (
									(r({
										title: "Processing",
										description: "Your transaction is being processed...",
									}),
									(V.current = !0),
									F && l)
								) {
									let s = await F.estimateContractGas({
										address: t,
										abi: T.Mt,
										functionName: "delegateStake",
										args: a,
										account: l,
										value: n,
									});
									e = 10n * s;
								}
								let s = await S({
									address: t,
									abi: T.Mt,
									functionName: "delegateStake",
									args: a,
									value: n,
									...(e ? { gas: e } : {}),
								});
								if ((P(s), _("pending"), F)) {
									let e = await F.waitForTransactionReceipt({ hash: s }),
										t = "success" !== e.status;
									(_(t ? "reverted" : "success"),
										(V.current = !1),
										t
											? r({
													variant: "destructive",
													title: "Transaction Reverted",
													description:
														"The transaction did not complete successfully.",
												})
											: r({
													title: "Success!",
													description: "Stake delegated successfully",
												}));
								}
							} catch (e) {
								((V.current = !1),
									r({
										variant: "destructive",
										title: "Error",
										description: e.message,
									}));
							}
					};
				return (0, n.jsx)(Z.Vq, {
					open: w,
					onOpenChange: C,
					children: (0, n.jsxs)(Z.cZ, {
						className: "sm:max-w-[425px] w-[95vw] max-w-[95vw] sm:w-full",
						children: [
							(0, n.jsxs)(Z.fK, {
								children: [
									(0, n.jsx)(Z.$N, {
										className: "text-2xl font-bold",
										children: "Delegate Stake",
									}),
									(0, n.jsx)(Z.Be, {
										children:
											"Choose a validator and enter the amount you want to delegate.",
									}),
								],
							}),
							(0, n.jsxs)("div", {
								className: "grid gap-3 py-3",
								children: [
									(0, n.jsx)("div", {
										className: "grid gap-1.5",
										children: d
											? null
											: (0, n.jsxs)(n.Fragment, {
													children: [
														(0, n.jsx)("label", {
															htmlFor: "validator",
															className: "text-sm font-medium",
															children: "Select a Validator",
														}),
														(0, n.jsxs)("div", {
															className: "relative w-full",
															children: [
																(0, n.jsxs)("div", {
																	className: "relative",
																	children: [
																		(0, n.jsx)(u.I, {
																			placeholder: "Search validators...",
																			value: v,
																			onChange: (e) => h(e.target.value),
																			className: "pl-9 py-2 h-10 w-full",
																		}),
																		(0, n.jsx)(f.Z, {
																			className:
																				"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400",
																		}),
																	],
																}),
																(0, n.jsx)("div", {
																	className:
																		"mt-2 border rounded-md bg-white max-h-[240px] overflow-y-auto",
																	children:
																		0 === N.length
																			? (0, n.jsx)("div", {
																					className:
																						"p-3 text-center text-sm text-gray-500",
																					children: "No validators found",
																				})
																			: N.map((e) =>
																					(0, n.jsxs)(
																						"div",
																						{
																							className:
																								"p-3 cursor-pointer hover:bg-gray-50 border-b last:border-0 flex items-center gap-2 ".concat(
																									d === e.address
																										? "bg-blue-50"
																										: "",
																								),
																							onClick: () => o(e.address),
																							children: [
																								(0, n.jsx)("img", {
																									src: e.icon,
																									alt: e.name,
																									className:
																										"w-6 h-6 rounded-full flex-shrink-0",
																								}),
																								(0, n.jsxs)("div", {
																									className: "overflow-hidden",
																									children: [
																										(0, n.jsx)("div", {
																											className:
																												"font-medium truncate",
																											children: e.name,
																										}),
																										(0, n.jsx)("div", {
																											className:
																												"text-xs text-gray-500 truncate",
																											children: e.address,
																										}),
																									],
																								}),
																							],
																						},
																						e.id,
																					),
																				),
																}),
															],
														}),
													],
												}),
									}),
									d &&
										(0, n.jsxs)("div", {
											className: "p-4 bg-gray-50 rounded-lg mt-0.5",
											children: [
												(0, n.jsxs)("div", {
													className: "flex justify-between items-start mb-2",
													children: [
														(0, n.jsx)("h4", {
															className: "text-sm font-medium",
															children: "Selected Validator",
														}),
														(0, n.jsx)(A.z, {
															variant: "outline",
															size: "sm",
															onClick: () => o(""),
															className: "h-7 text-xs px-2",
															children: "Change Validator",
														}),
													],
												}),
												t
													.filter((e) => e.address === d)
													.map((e) =>
														(0, n.jsxs)(
															"div",
															{
																className: "flex items-center gap-3",
																children: [
																	(0, n.jsx)("img", {
																		src: e.icon,
																		alt: e.name,
																		className: "w-8 h-8 rounded-full",
																	}),
																	(0, n.jsxs)("div", {
																		children: [
																			(0, n.jsx)("div", {
																				className: "font-medium",
																				children: e.name,
																			}),
																			(0, n.jsx)("div", {
																				className:
																					"text-xs text-gray-500 truncate max-w-[250px]",
																				children: e.address,
																			}),
																			(0, n.jsxs)("div", {
																				className: "text-xs mt-1",
																				children: [
																					(0, n.jsx)("span", {
																						className: "text-gray-700",
																						children: "Total staked: ",
																					}),
																					(0, n.jsx)("span", {
																						className: "font-medium",
																						children: e.totalStaked,
																					}),
																				],
																			}),
																		],
																	}),
																],
															},
															e.id,
														),
													),
											],
										}),
									(0, n.jsxs)("div", {
										className: "grid gap-2",
										children: [
											(0, n.jsx)("label", {
												htmlFor: "amount",
												className: "text-sm font-medium",
												children: "Amount (STT)",
											}),
											(0, n.jsx)(u.I, {
												id: "amount",
												type: "number",
												placeholder: "Enter stake amount",
												value: p,
												onChange: (e) => m(e.target.value),
												min: "0",
												step: "0.01",
												className: "w-full px-3 py-2",
											}),
										],
									}),
									B &&
										(0, n.jsxs)("div", {
											className: "text-xs rounded-md p-2 bg-gray-50 border",
											children: [
												(0, n.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [
														(0, n.jsx)("span", {
															className: "mr-2",
															children: "Transaction:",
														}),
														(0, n.jsx)("a", {
															className:
																"text-blue-600 hover:underline break-all",
															href: "https://shannon-explorer.somnia.network/tx/".concat(
																B,
																"?tab=index",
															),
															target: "_blank",
															rel: "noreferrer",
															children: B,
														}),
													],
												}),
												"pending" === I &&
													(0, n.jsx)("p", {
														className: "text-amber-600 mt-1",
														children: "Waiting for confirmation...",
													}),
												"success" === I &&
													(0, n.jsx)("p", {
														className: "text-green-600 mt-1",
														children: "Transaction confirmed",
													}),
												"reverted" === I &&
													(0, n.jsx)("p", {
														className: "text-red-600 mt-1",
														children: "Transaction reverted",
													}),
											],
										}),
								],
							}),
							(0, n.jsxs)("div", {
								className:
									"flex flex-col sm:flex-row justify-end gap-3 mt-6 border-t pt-4",
								children: [
									(0, n.jsx)(A.z, {
										variant: "outline",
										onClick: () => {
											s ? s(!1) : y(!1);
										},
										className: "w-full sm:w-auto order-2 sm:order-1",
										children: "Cancel",
									}),
									(0, n.jsx)(A.z, {
										onClick: (e) => {
											(e.preventDefault(), V.current || E || O());
										},
										disabled: E || !d || !p || V.current,
										className:
											"w-full text-black bg-white hover:bg-gray-100 sm:w-auto order-1 sm:order-2 border-2",
										children:
											E || V.current ? "Processing..." : "Delegate Stake",
									}),
								],
							}),
						],
					}),
				});
			}
			let Q = [5, 10, 20, 50, 100],
				$ = () => {
					let [e, t] = (0, x.useState)(""),
						[a, i] = (0, x.useState)(1),
						[r, l] = (0, x.useState)(20),
						[d, o] = (0, x.useState)({ key: null, direction: "desc" }),
						[p, g] = (0, x.useState)(!1),
						[v, h] = (0, x.useState)(null),
						{
							paginatedData: T,
							totalPages: N,
							totalItems: C,
							allValidators: j,
						} = w(e, d, a, r, K),
						k = b(N)(a),
						E = (e) => {
							(h(e), g(!0));
						};
					return (0, n.jsxs)("section", {
						className: "w-full mx-auto mt-[88px]",
						children: [
							(0, n.jsxs)(m.fC, {
								className: "w-full",
								children: [
									(0, n.jsxs)(m.l_, {
										className: "w-full overflow-x-auto",
										children: [
											(0, n.jsxs)(s.Zb, {
												className:
													"flex border-none shadow-none items-center justify-between",
												children: [
													(0, n.jsx)(s.aY, {
														className: "flex items-center p-0",
														children: (0, n.jsx)("h2", {
															className:
																"flex-1 font-heading-primary-heading-02 text-[32px] tracking-[0.64px] text-somnia-color-text-primary-01",
															children: "Validators",
														}),
													}),
													(0, n.jsxs)("div", {
														className:
															"w-[320px] relative flex items-center p-1",
														children: [
															(0, n.jsx)(f.Z, {
																className:
																	"absolute left-5 z-10 w-5 h-5 pointer-events-none text-somnia-color-text-primary-02",
															}),
															(0, n.jsx)(u.I, {
																type: "text",
																placeholder: "Search validator name",
																value: e,
																onChange: (e) => t(e.target.value),
																className:
																	"h-12 pl-12 pr-4 w-full bg-somnia-color-background-primary-02 border-none rounded-2xl placeholder:text-somnia-color-text-primary-03 placeholder:font-polysans placeholder:text-[18px] focus:ring-1 focus:ring-offset-0 focus:ring-somnia-color-accent-primary",
															}),
														],
													}),
												],
											}),
											(0, n.jsxs)(y.iA, {
												children: [
													(0, n.jsx)(S, {
														onSort: (e) => {
															o({
																key: e,
																direction:
																	d.key === e && "asc" === d.direction
																		? "desc"
																		: "asc",
															});
														},
														sortConfig: d,
													}),
													(0, n.jsx)(y.RM, {
														children: T.map((e) =>
															(0, n.jsxs)(
																y.SC,
																{
																	className:
																		"border-b-2 border-somnia-color-background-primary-02",
																	children: [
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-somnia-color-text-primary-01 py-3 px-4 min-w-[160px] whitespace-nowrap",
																			children: (0, n.jsxs)("div", {
																				className: "flex items-center gap-8",
																				children: [
																					(0, n.jsx)("div", {
																						className:
																							"h-6 w-6 rounded-[var(--somnia-radius-radius-sm)] overflow-hidden flex-shrink-0",
																						children: (0, n.jsx)(c.default, {
																							src: e.icon,
																							alt: "validator-icon",
																							className:
																								"h-full w-full object-cover",
																							width: 24,
																							height: 24,
																						}),
																					}),
																					(0, n.jsx)("span", {
																						className: "-ml-4",
																						title: e.address,
																						children: e.name,
																					}),
																				],
																			}),
																		}),
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-somnia-color-text-primary-01 py-3 px-4 min-w-[160px] whitespace-nowrap",
																			children: e.totalStaked,
																		}),
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-somnia-color-text-primary-01 text-center py-3 px-4 min-w-[170px] whitespace-nowrap",
																			children: e.nextRound,
																		}),
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-somnia-color-text-primary-01 text-center py-3 px-4 min-w-[140px] whitespace-nowrap",
																			children: e.delegationRate,
																		}),
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-somnia-color-text-primary-01 text-right py-3 px-4 min-w-[160px] whitespace-nowrap",
																			children: e.earnings,
																		}),
																		(0, n.jsx)(y.pj, {
																			className:
																				"text-center py-3 px-4 min-w-[120px] whitespace-nowrap",
																			children: (0, n.jsx)(A.z, {
																				onClick: () => E(e),
																				className:
																					"bg-[#0057ff] hover:bg-[#0046d6] text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors",
																				children: "Delegate",
																			}),
																		}),
																	],
																},
																e.id,
															),
														),
													}),
												],
											}),
										],
									}),
									(0, n.jsx)(m.LW, {
										className: "flex h-[10px] select-none touch-none p-[2px]",
										orientation: "horizontal",
										children: (0, n.jsx)(m.bU, {
											className:
												'relative flex-1 rounded-[10px] bg-somnia-color-background-accent before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]',
										}),
									}),
								],
							}),
							(0, n.jsx)(L, {
								currentPage: a,
								totalPages: N,
								totalItems: C,
								rowsPerPage: r,
								pageNumbers: k,
								onPageChange: i,
								onRowsPerPageChange: (e) => l(Number(e)),
								pageSizeOptions: Q,
							}),
							(0, n.jsx)(J, {
								validators: j,
								isOpen: p,
								onOpenChange: (e) => {
									(g(e), e || h(null));
								},
								preselectedValidator: v,
							}),
						],
					});
				};
			var X = a(12339);
			let ee = function () {
				var e;
				let t =
						arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					a = arguments.length > 1 ? arguments[1] : void 0,
					{ address: n } = (0, W.m)(),
					s =
						null === (e = null == a ? void 0 : a.enabled) || void 0 === e || e,
					{
						data: i,
						isLoading: r,
						error: l,
					} = (0, g.u)({
						address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
						abi: T.Mt,
						functionName: "getDelegations",
						args: [n],
						query: { enabled: s && !!n, retry: 3, retryDelay: 500 },
					}),
					d = (0, x.useMemo)(() => {
						if (!i || !Array.isArray(i) || !n) return [];
						let e = [];
						for (let t of i)
							(e.push({
								address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
								abi: T.Mt,
								functionName: "getDelegationByValidator",
								args: [n, t],
							}),
								e.push({
									address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
									abi: T.Mt,
									functionName: "getDelegatedStakerRewards",
									args: [t, n],
								}),
								e.push({
									address: "0xBe367d410D96E1cAeF68C0632251072CDf1b8250",
									abi: T.Mt,
									functionName: "isValidatorInCommittee",
									args: [t],
								}));
						return e;
					}, [i, n]),
					{ data: o, isLoading: p } = (0, v.N)({
						contracts: d,
						query: { enabled: s && d.length > 0 },
					});
				return {
					delegations: (0, x.useMemo)(() => {
						if (!i || !Array.isArray(i) || !o) return [];
						let e = [];
						return (
							i.forEach((a, n) => {
								let s = 3 * n,
									i = o[s],
									r = o[s + 1],
									l = o[s + 2];
								if (i && void 0 !== i.result) {
									let n = i.result.toString(),
										s = r && void 0 !== r.result ? r.result.toString() : "0",
										d = !!l && void 0 !== l.result && !!l.result;
									if ("0" !== n) {
										let i = (0, N.d)(BigInt(n)),
											r = (0, N.d)(BigInt(s)),
											l = parseFloat(i).toLocaleString("en-US", {
												maximumFractionDigits: 4,
												minimumFractionDigits: 0,
											}),
											o = parseFloat(r).toLocaleString("en-US", {
												maximumFractionDigits: 4,
												minimumFractionDigits: 0,
											}),
											p =
												t[a.toLowerCase()] ||
												"".concat(a.slice(0, 6), "...").concat(a.slice(-4));
										e.push({
											validatorAddress: a,
											validatorName: p,
											delegatedAmount: n,
											pendingRewards: s,
											formattedDelegatedAmount: "".concat(l, " STT"),
											formattedPendingRewards: "".concat(o, " STT"),
											isOnline: d,
										});
									}
								}
							}),
							e
						);
					}, [i, o, t]),
					isLoading: r || p,
					hasError: !n,
				};
			};
			var et = a(91804),
				ea = a(51817),
				en = a(49474);
			function es(e) {
				let { isOpen: t, onOpenChange: a } = e,
					{ toast: s } = (0, H.pm)(),
					{ address: i } = (0, W.m)(),
					[r, l] = (0, x.useState)(!1),
					[d, o] = (0, x.useState)({}),
					p = (0, x.useRef)({}),
					m = (0, x.useRef)({}),
					c = void 0 !== t ? t : r,
					{
						delegations: y,
						isLoading: f,
						hasError: b,
					} = ee(K, { enabled: !!c }),
					g = (0, x.useCallback)(
						(e) => {
							(a ? a(e) : l(e),
								e || (o({}), (p.current = {}), (m.current = {}), j({}), S({})));
						},
						[a],
					),
					{
						writeContract: v,
						writeContractAsync: h,
						isPending: N,
					} = (0, q.S)({
						mutation: {
							onSuccess: () => {
								(s({
									title: "Success!",
									description: "Transaction completed successfully",
								}),
									(p.current = {}),
									(m.current = {}));
							},
							onError: (e) => {
								let t = e.message || "";
								(t.includes("rejected") ||
								t.includes("denied") ||
								t.includes("cancelled")
									? s({
											title: "Transaction Cancelled",
											description: "You cancelled the transaction.",
										})
									: s({
											variant: "destructive",
											title: "Transaction Failed",
											description: e.message,
										}),
									(p.current = {}),
									(m.current = {}));
							},
						},
					}),
					w = (0, G.t)(),
					[C, j] = (0, x.useState)({}),
					[k, S] = (0, x.useState)({}),
					[E, D] = (0, x.useState)({}),
					[M, R] = (0, x.useState)({}),
					F = async (e) => {
						if (!i) {
							s({
								variant: "destructive",
								title: "Wallet Not Connected",
								description: "Please connect your wallet to continue.",
							});
							return;
						}
						let t = d[e.validatorAddress];
						if (!t || 0 >= parseFloat(t)) {
							s({
								variant: "destructive",
								title: "Invalid Amount",
								description: "Please enter a valid amount to undelegate.",
							});
							return;
						}
						if (!p.current[e.validatorAddress] && !N)
							try {
								let a;
								let n = "0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
								if (!n) {
									s({
										variant: "destructive",
										title: "Configuration Error",
										description: "Staking contract address not found.",
									});
									return;
								}
								if (
									((p.current[e.validatorAddress] = !0),
									s({
										title: "Processing",
										description:
											"Your undelegation transaction is being processed...",
									}),
									w && i)
								) {
									let s = await w.estimateContractGas({
										address: n,
										abi: T.Mt,
										functionName: "undelegateStake",
										args: [e.validatorAddress, (0, Y.f)(t)],
										account: i,
									});
									a = 10n * s;
								}
								let r = await h({
									address: n,
									abi: T.Mt,
									functionName: "undelegateStake",
									args: [e.validatorAddress, (0, Y.f)(t)],
									...(a ? { gas: a } : {}),
								});
								if (
									(j((t) => ({ ...t, [e.validatorAddress]: r })),
									S((t) => ({ ...t, [e.validatorAddress]: "pending" })),
									R((t) => ({ ...t, [e.validatorAddress]: "pending" })),
									w)
								) {
									let t = await w.waitForTransactionReceipt({ hash: r }),
										a = "success" !== t.status;
									(S((t) => ({
										...t,
										[e.validatorAddress]: a ? "reverted" : "success",
									})),
										R((t) => ({
											...t,
											[e.validatorAddress]: a ? "reverted" : "success",
										})),
										(p.current[e.validatorAddress] = !1),
										a
											? s({
													variant: "destructive",
													title: "Transaction Reverted",
													description:
														"Undelegation did not complete successfully.",
												})
											: s({ title: "Undelegation Confirmed" }));
								}
							} catch (t) {
								((p.current[e.validatorAddress] = !1),
									s({
										variant: "destructive",
										title: "Error",
										description: t.message,
									}));
							}
					},
					B = async (e) => {
						if (!i) {
							s({
								variant: "destructive",
								title: "Wallet Not Connected",
								description: "Please connect your wallet to continue.",
							});
							return;
						}
						if (!m.current[e.validatorAddress] && !N)
							try {
								let t;
								let a = "0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
								if (!a) {
									s({
										variant: "destructive",
										title: "Configuration Error",
										description: "Staking contract address not found.",
									});
									return;
								}
								if (
									((m.current[e.validatorAddress] = !0),
									s({
										title: "Processing",
										description:
											"Your claim rewards transaction is being processed...",
									}),
									w && i)
								) {
									let n = await w.estimateContractGas({
										address: a,
										abi: T.Mt,
										functionName: "claimDelegatorRewards",
										args: [e.validatorAddress],
										account: i,
									});
									t = 10n * n;
								}
								let n = await h({
									address: a,
									abi: T.Mt,
									functionName: "claimDelegatorRewards",
									args: [e.validatorAddress],
									...(t ? { gas: t } : {}),
								});
								if (
									(j((t) => ({ ...t, [e.validatorAddress]: n })),
									S((t) => ({ ...t, [e.validatorAddress]: "pending" })),
									D((t) => ({ ...t, [e.validatorAddress]: "pending" })),
									w)
								) {
									let t = await w.waitForTransactionReceipt({ hash: n }),
										a = "success" !== t.status;
									(S((t) => ({
										...t,
										[e.validatorAddress]: a ? "reverted" : "success",
									})),
										D((t) => ({
											...t,
											[e.validatorAddress]: a ? "reverted" : "success",
										})),
										(m.current[e.validatorAddress] = !1),
										a
											? s({
													variant: "destructive",
													title: "Transaction Reverted",
													description: "Claim did not complete successfully.",
												})
											: s({ title: "Rewards Claimed" }));
								}
							} catch (t) {
								((m.current[e.validatorAddress] = !1),
									s({
										variant: "destructive",
										title: "Error",
										description: t.message,
									}));
							}
					},
					P = (e, t) => {
						o((a) => ({ ...a, [e]: t }));
					};
				return b
					? (0, n.jsx)(Z.Vq, {
							open: c,
							onOpenChange: g,
							children: (0, n.jsxs)(Z.cZ, {
								className: "sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full",
								children: [
									(0, n.jsxs)(Z.fK, {
										children: [
											(0, n.jsx)(Z.$N, {
												className: "text-2xl font-bold",
												children: "My Delegations",
											}),
											(0, n.jsx)(Z.Be, {
												children:
													"Please connect your wallet to view your delegations.",
											}),
										],
									}),
									(0, n.jsx)("div", {
										className: "flex items-center justify-center py-8",
										children: (0, n.jsxs)("div", {
											className: "text-center",
											children: [
												(0, n.jsx)(et.Z, {
													className: "mx-auto h-12 w-12 text-gray-400 mb-4",
												}),
												(0, n.jsx)("p", {
													className: "text-gray-500",
													children: "Wallet not connected",
												}),
											],
										}),
									}),
								],
							}),
						})
					: (0, n.jsx)(Z.Vq, {
							open: c,
							onOpenChange: g,
							children: (0, n.jsxs)(Z.cZ, {
								className:
									"sm:max-w-[700px] w-[95vw] max-w-[95vw] sm:w-full max-h-[80vh] overflow-y-auto px-4 md:px-6",
								children: [
									(0, n.jsxs)(Z.fK, {
										children: [
											(0, n.jsx)(Z.$N, {
												className: "text-xl md:text-2xl font-bold",
												children: "My Delegations",
											}),
											(0, n.jsx)(Z.Be, {
												children:
													"Manage your staked delegations and claim rewards.",
											}),
										],
									}),
									(0, n.jsx)("div", {
										className: "mt-4",
										children: f
											? (0, n.jsxs)("div", {
													className: "flex items-center justify-center py-8",
													children: [
														(0, n.jsx)(ea.Z, {
															className: "h-8 w-8 animate-spin text-blue-500",
														}),
														(0, n.jsx)("span", {
															className: "ml-2 text-gray-600",
															children: "Loading your delegations...",
														}),
													],
												})
											: 0 === y.length
												? (0, n.jsxs)("div", {
														className: "text-center py-8",
														children: [
															(0, n.jsx)(en.Z, {
																className:
																	"mx-auto h-12 w-12 text-gray-400 mb-4",
															}),
															(0, n.jsx)("h3", {
																className:
																	"text-lg font-medium text-gray-900 mb-2",
																children: "No Delegations Found",
															}),
															(0, n.jsx)("p", {
																className: "text-gray-500",
																children:
																	"You haven't delegated any stake yet.",
															}),
														],
													})
												: (0, n.jsx)("div", {
														className: "space-y-4",
														children: y.map((e) =>
															(0, n.jsxs)(
																"div",
																{
																	className: "border rounded-lg p-4 bg-gray-50",
																	children: [
																		(0, n.jsxs)("div", {
																			className:
																				"flex justify-between items-start mb-4",
																			children: [
																				(0, n.jsxs)("div", {
																					children: [
																						(0, n.jsxs)("h4", {
																							className:
																								"font-medium text-base md:text-lg flex items-center flex-wrap gap-2 mb-2",
																							children: [
																								e.validatorName,
																								(0, n.jsxs)("span", {
																									className: e.isOnline
																										? "inline-flex items-center px-2 py-0.25 rounded-full text-[11px] font-medium bg-green-100 text-green-700"
																										: "inline-flex items-center px-2 py-0.25 rounded-full text-[11px] font-medium bg-red-100 text-red-700",
																									title: e.isOnline
																										? "In committee"
																										: "Not in committee",
																									children: [
																										(0, n.jsx)("span", {
																											className: e.isOnline
																												? "w-2 h-2 rounded-full bg-green-500 mr-1"
																												: "w-2 h-2 rounded-full bg-red-500 mr-1",
																										}),
																										e.isOnline
																											? "Online"
																											: "Offline",
																									],
																								}),
																							],
																						}),
																						(0, n.jsx)("p", {
																							className:
																								"text-xs md:text-sm text-gray-500 font-mono break-all",
																							children: e.validatorAddress,
																						}),
																					],
																				}),
																				(0, n.jsxs)("div", {
																					className: "text-right",
																					children: [
																						(0, n.jsx)("div", {
																							className:
																								"text-sm text-gray-600",
																							children: "Delegated Amount",
																						}),
																						(0, n.jsx)("div", {
																							className: "font-bold text-lg",
																							children:
																								e.formattedDelegatedAmount,
																						}),
																					],
																				}),
																			],
																		}),
																		(0, n.jsxs)("div", {
																			className:
																				"grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4",
																			children: [
																				(0, n.jsxs)("div", {
																					className: "bg-white rounded-lg p-3",
																					children: [
																						(0, n.jsx)("div", {
																							className:
																								"text-sm text-gray-600 mb-1",
																							children: "Pending Rewards",
																						}),
																						(0, n.jsx)("div", {
																							className:
																								"font-semibold text-green-600",
																							children:
																								e.formattedPendingRewards,
																						}),
																					],
																				}),
																				(0, n.jsxs)("div", {
																					className: "bg-white rounded-lg p-3",
																					children: [
																						(0, n.jsx)("div", {
																							className:
																								"text-sm text-gray-600 mb-1",
																							children: "Undelegate Amount",
																						}),
																						(0, n.jsx)(u.I, {
																							type: "number",
																							placeholder: "Enter amount",
																							value:
																								d[e.validatorAddress] || "",
																							onChange: (t) =>
																								P(
																									e.validatorAddress,
																									t.target.value,
																								),
																							className: "mt-1",
																						}),
																					],
																				}),
																			],
																		}),
																		(0, n.jsxs)("div", {
																			className:
																				"flex flex-col sm:flex-row gap-3",
																			children: [
																				(0, n.jsx)(A.z, {
																					onClick: () => {
																						if (!i) {
																							s({
																								variant: "destructive",
																								title: "Wallet not connected",
																								description:
																									"Please connect your wallet.",
																							});
																							return;
																						}
																						B(e);
																					},
																					disabled:
																						N ||
																						m.current[e.validatorAddress] ||
																						0 ===
																							parseFloat(e.pendingRewards) ||
																						"success" === E[e.validatorAddress],
																					className:
																						"w-full sm:flex-1 text-white " +
																						("success" === E[e.validatorAddress]
																							? "bg-green-400 hover:bg-green-400 cursor-not-allowed"
																							: "bg-green-600 hover:bg-green-700"),
																					children: m.current[
																						e.validatorAddress
																					]
																						? (0, n.jsxs)(n.Fragment, {
																								children: [
																									(0, n.jsx)(ea.Z, {
																										className:
																											"h-4 w-4 animate-spin mr-2",
																									}),
																									"Claiming...",
																								],
																							})
																						: "Claim Rewards",
																				}),
																				(0, n.jsx)(A.z, {
																					onClick: () => {
																						if (!i) {
																							s({
																								variant: "destructive",
																								title: "Wallet not connected",
																								description:
																									"Please connect your wallet.",
																							});
																							return;
																						}
																						F(e);
																					},
																					disabled:
																						N ||
																						p.current[e.validatorAddress] ||
																						!d[e.validatorAddress] ||
																						0 >=
																							parseFloat(
																								d[e.validatorAddress] || "0",
																							) ||
																						"success" === M[e.validatorAddress],
																					variant: "outline",
																					className:
																						"w-full sm:flex-1 border text-red-600 " +
																						("success" === M[e.validatorAddress]
																							? "border-gray-300 bg-gray-100 cursor-not-allowed"
																							: "border-red-300 hover:bg-red-50"),
																					children: p.current[
																						e.validatorAddress
																					]
																						? (0, n.jsxs)(n.Fragment, {
																								children: [
																									(0, n.jsx)(ea.Z, {
																										className:
																											"h-4 w-4 animate-spin mr-2",
																									}),
																									"Undelegating...",
																								],
																							})
																						: "Undelegate",
																				}),
																			],
																		}),
																		(C[e.validatorAddress] ||
																			k[e.validatorAddress]) &&
																			(0, n.jsxs)("div", {
																				className:
																					"mt-3 text-[11px] md:text-xs rounded-md p-2 bg-gray-50 border break-words",
																				children: [
																					C[e.validatorAddress] &&
																						(0, n.jsxs)("div", {
																							className:
																								"flex items-center justify-between gap-2 flex-wrap",
																							children: [
																								(0, n.jsx)("span", {
																									className: "mr-2",
																									children: "Transaction:",
																								}),
																								(0, n.jsx)("a", {
																									className:
																										"text-blue-600 hover:underline break-all",
																									href: "https://shannon-explorer.somnia.network/tx/".concat(
																										C[e.validatorAddress],
																										"?tab=index",
																									),
																									target: "_blank",
																									rel: "noreferrer",
																									children:
																										C[e.validatorAddress],
																								}),
																							],
																						}),
																					"pending" === k[e.validatorAddress] &&
																						(0, n.jsx)("p", {
																							className: "text-amber-600 mt-1",
																							children:
																								"Waiting for confirmation...",
																						}),
																					"success" === k[e.validatorAddress] &&
																						(0, n.jsx)("p", {
																							className: "text-green-600 mt-1",
																							children: "Transaction confirmed",
																						}),
																					"reverted" ===
																						k[e.validatorAddress] &&
																						(0, n.jsx)("p", {
																							className: "text-red-600 mt-1",
																							children: "Transaction reverted",
																						}),
																				],
																			}),
																	],
																},
																e.validatorAddress,
															),
														),
													}),
									}),
								],
							}),
						});
			}
			let ei = [
					{ id: "delegations-manage", label: "My Delegations" },
					{ id: "delegations", label: "Delegate your Stake" },
				],
				er = () => {
					let [e, t] = x.useState(ei[0].id),
						[a, s] = x.useState(!1),
						[r, l] = x.useState(!1),
						{ allValidators: d } = w(
							"",
							{ key: null, direction: "asc" },
							1,
							100,
							K,
						),
						o = (e) => {
							(t(e),
								"delegations" === e && s(!0),
								"delegations-manage" === e && l(!0));
						};
					return (0, n.jsxs)(n.Fragment, {
						children: [
							(0, n.jsx)(X.mQ, {
								defaultValue: ei[0].id,
								className: "w-full flex flex-col items-center",
								orientation: "vertical",
								onValueChange: o,
								value: e,
								children: (0, n.jsx)(X.dr, {
									className: (0, i.Z)(
										"md:w-[420px] w-full flex md:flex-row flex-col items-center justify-between gap-4 p-[6px] mb-6 h-[48px]",
										"rounded-[16px] bg-somnia-color-background-primary-01",
										"border-none",
									),
									"data-orientation": "horizontal",
									children: ei.map((t) =>
										(0, n.jsx)(
											X.SP,
											{
												value: t.id,
												asChild: !0,
												className: "border-none",
												children: (0, n.jsx)(A.z, {
													variant: e === t.id ? "somnia" : "outline",
													onClick: () => {
														o(t.id);
													},
													className: (0, i.Z)(
														"md:w-[200px] w-full h-full font-label-primary-label-03 tracking-[0.32px] text-[14px] md:text-[15px] font-semibold rounded-[12px]",
														e === t.id
															? "!bg-somnia-color-background-accent-03 !text-somnia-color-text-fixed-primary-01 !shadow-md"
															: "!bg-somnia-color-background-primary-02 !text-somnia-color-text-primary-01 hover:!bg-somnia-color-background-primary-02/90 !border !border-somnia-color-background-accent-03",
													),
													children: t.label,
												}),
											},
											t.id,
										),
									),
								}),
							}),
							(0, n.jsx)(J, {
								validators: d,
								isOpen: a,
								onOpenChange: (a) => {
									(s(a), a || "delegations" !== e || t(ei[0].id));
								},
							}),
							(0, n.jsx)(es, {
								isOpen: r,
								onOpenChange: (a) => {
									(l(a), a || "delegations-manage" !== e || t(ei[0].id));
								},
							}),
						],
					});
				},
				el = () =>
					(0, n.jsxs)("div", {
						className: "flex flex-col items-center gap-4 w-full",
						children: [
							(0, n.jsx)("h1", {
								className:
									"text-[40px] leading-10 font-polysans font-semibold text-center tracking-[0.80px]",
								children: "Validators",
							}),
							(0, n.jsx)("p", {
								className: (0, i.Z)(
									"text-lg text-center font-polysans pb-6 leading-none",
									"text-[#777]",
								),
								children: "Discover our partner validators",
							}),
						],
					});
			function ed() {
				let {
					data: e,
					isError: t,
					error: a,
					status: s,
				} = (0, g.u)({
					address: "0x7b8b1bb68c6f0e29f3addcb45a6c0bb8e8e331c7",
					abi: h.Mt,
					functionName: "getCurrentEpochCommittee",
					query: { enabled: !0, retry: 3, retryDelay: 500 },
				});
				return (0, n.jsxs)("main", {
					className: "pt-[148px] md:mx-[160px] mx-4",
					children: [
						(0, n.jsx)(l, {}),
						(0, n.jsx)(el, {}),
						(0, n.jsx)(er, {}),
						(0, n.jsx)(p, { validationCommittee: e }),
						(0, n.jsx)($, {}),
					],
				});
			}
		},
		62869: function (e, t, a) {
			"use strict";
			a.d(t, {
				d: function () {
					return d;
				},
				z: function () {
					return o;
				},
			});
			var n = a(57437),
				s = a(98482),
				i = a(77712),
				r = a(2265),
				l = a(94508);
			let d = (0, i.j)(
					"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[16px] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
					{
						variants: {
							variant: {
								default:
									"bg-primary text-primary-foreground hover:bg-primary/90",
								destructive:
									"bg-destructive text-destructive-foreground hover:bg-destructive/90",
								outline:
									"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
								secondary:
									"bg-secondary text-secondary-foreground hover:bg-secondary/80",
								"primary-100":
									"bg-somnia-color-background-primary-02 text-somnia-color-text-primary-01 hover:bg-somnia-color-background-primary-03",
								"primary-200":
									"bg-somnia-color-background-primary-03 text-somnia-color-text-primary-01 hover:bg-somnia-color-background-primary-04",
								ghost: "hover:bg-accent hover:text-accent-foreground",
								link: "text-primary underline-offset-4 hover:underline",
								somnia:
									"font-polysans [font-feature-settings:'liga'_off,'clig'_off] font-semibold leading-normal tracking-[0.4px] text-edge-cap [font-feature-settings:'liga'_off,'clig'_off] shadow-[0px_2px_2px_0px_#FFF_inset] rounded-[16px] transition-all duration-200 disabled:bg-[#F8F8F8] disabled:text-[#BFBFBF] bg-[#333BFF] text-white hover:bg-[#2930CC] active:bg-[#1F2499]",
							},
							size: {
								default: "h-10 px-4 py-2",
								sm: "h-[40px] text-[16px]",
								md: "h-[48px] text-[18px]",
								lg: "h-[64px] text-[24px]",
								icon: "h-10 w-10",
							},
							fullWidth: { true: "w-full", false: "" },
						},
						defaultVariants: {
							variant: "default",
							size: "default",
							fullWidth: !1,
						},
					},
				),
				o = r.forwardRef((e, t) => {
					let {
							className: a,
							variant: i,
							size: r,
							fullWidth: o,
							asChild: p = !1,
							...u
						} = e,
						m = p ? s.g7 : "button";
					return (0, n.jsx)(m, {
						className: (0, l.cn)(
							d({ variant: i, size: r, fullWidth: o, className: a }),
						),
						ref: t,
						...u,
					});
				});
			o.displayName = "Button";
		},
		66070: function (e, t, a) {
			"use strict";
			a.d(t, {
				Ol: function () {
					return l;
				},
				SZ: function () {
					return o;
				},
				Zb: function () {
					return r;
				},
				aY: function () {
					return p;
				},
				eW: function () {
					return u;
				},
				ll: function () {
					return d;
				},
			});
			var n = a(57437),
				s = a(2265),
				i = a(94508);
			let r = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("div", {
					ref: t,
					className: (0, i.cn)("rounded-lg", a),
					...s,
				});
			});
			r.displayName = "Card";
			let l = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("div", {
					ref: t,
					className: (0, i.cn)("flex flex-col space-y-1.5 p-6", a),
					...s,
				});
			});
			l.displayName = "CardHeader";
			let d = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("h3", {
					ref: t,
					className: (0, i.cn)(
						"text-2xl font-semibold leading-none tracking-tight",
						a,
					),
					...s,
				});
			});
			d.displayName = "CardTitle";
			let o = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("p", {
					ref: t,
					className: (0, i.cn)("text-sm text-muted-foreground", a),
					...s,
				});
			});
			o.displayName = "CardDescription";
			let p = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("div", {
					ref: t,
					className: (0, i.cn)("p-6", a),
					...s,
				});
			});
			p.displayName = "CardContent";
			let u = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("div", {
					ref: t,
					className: (0, i.cn)("flex items-center p-6", a),
					...s,
				});
			});
			u.displayName = "CardFooter";
		},
		26110: function (e, t, a) {
			"use strict";
			a.d(t, {
				$N: function () {
					return y;
				},
				Be: function () {
					return f;
				},
				Vq: function () {
					return d;
				},
				cZ: function () {
					return m;
				},
				fK: function () {
					return c;
				},
				hg: function () {
					return o;
				},
			});
			var n = a(57437),
				s = a(95728),
				i = a(32489),
				r = a(2265),
				l = a(94508);
			let d = s.fC,
				o = s.xz,
				p = s.h_;
			s.x8;
			let u = r.forwardRef((e, t) => {
				let { className: a, ...i } = e;
				return (0, n.jsx)(s.aV, {
					ref: t,
					className: (0, l.cn)(
						"fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
						a,
					),
					...i,
				});
			});
			u.displayName = s.aV.displayName;
			let m = r.forwardRef((e, t) => {
				let { className: a, children: r, overlayClassName: d, ...o } = e;
				return (0, n.jsxs)(p, {
					children: [
						(0, n.jsx)(u, { className: d }),
						(0, n.jsxs)(s.VY, {
							ref: t,
							className: (0, l.cn)(
								"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
								a,
							),
							...o,
							children: [
								r,
								(0, n.jsxs)(s.x8, {
									className:
										"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
									children: [
										(0, n.jsx)(i.Z, { className: "h-4 w-4" }),
										(0, n.jsx)("span", {
											className: "sr-only",
											children: "Close",
										}),
									],
								}),
							],
						}),
					],
				});
			});
			m.displayName = s.VY.displayName;
			let c = (e) => {
				let { className: t, ...a } = e;
				return (0, n.jsx)("div", {
					className: (0, l.cn)(
						"flex flex-col space-y-1.5 text-center sm:text-left",
						t,
					),
					...a,
				});
			};
			c.displayName = "DialogHeader";
			let y = r.forwardRef((e, t) => {
				let { className: a, ...i } = e;
				return (0, n.jsx)(s.Dx, {
					ref: t,
					className: (0, l.cn)(
						"text-lg font-semibold leading-none tracking-tight",
						a,
					),
					...i,
				});
			});
			y.displayName = s.Dx.displayName;
			let f = r.forwardRef((e, t) => {
				let { className: a, ...i } = e;
				return (0, n.jsx)(s.dk, {
					ref: t,
					className: (0, l.cn)("text-sm text-muted-foreground", a),
					...i,
				});
			});
			f.displayName = s.dk.displayName;
		},
		95186: function (e, t, a) {
			"use strict";
			a.d(t, {
				I: function () {
					return r;
				},
			});
			var n = a(57437),
				s = a(2265),
				i = a(94508);
			let r = s.forwardRef((e, t) => {
				let { className: a, type: s, ...r } = e;
				return (0, n.jsx)("input", {
					type: s,
					className: (0, i.cn)(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						a,
					),
					ref: t,
					...r,
				});
			});
			r.displayName = "Input";
		},
		53647: function (e, t, a) {
			"use strict";
			a.d(t, {
				Bw: function () {
					return m;
				},
				GV: function () {
					return p;
				},
				Ph: function () {
					return d;
				},
				Ql: function () {
					return c;
				},
				i4: function () {
					return u;
				},
				ki: function () {
					return o;
				},
			});
			var n = a(57437),
				s = a(23455),
				i = a(33145),
				r = a(2265),
				l = a(94508);
			let d = s.fC;
			s.ZA;
			let o = s.B4,
				p = (0, r.forwardRef)((e, t) => {
					let {
						className: a,
						color: r,
						width: d = 10,
						height: o = 5,
						imageClassName: p,
						...u
					} = e;
					return (0, n.jsx)(s.JO, {
						ref: t,
						className: a,
						...u,
						children: (0, n.jsx)(i.default, {
							src: "/icons/chevron-down.svg",
							alt: "chevron",
							className: (0, l.cn)("ml-[2px]", p),
							width: d,
							height: o,
							style: {
								filter: r ? "brightness(0) saturate(100%) ".concat(r) : void 0,
							},
						}),
					});
				});
			p.displayName = s.JO.displayName;
			let u = (0, r.forwardRef)((e, t) => {
				let { className: a, children: i, ...r } = e;
				return (0, n.jsx)(s.xz, {
					ref: t,
					className: (0, l.cn)(
						"flex items-center justify-between h-[48px] rounded-[16px] px-4",
						a,
					),
					...r,
					children: i,
				});
			});
			u.displayName = s.xz.displayName;
			let m = (0, r.forwardRef)((e, t) => {
				let { className: a, children: i, position: r = "popper", ...d } = e;
				return (0, n.jsx)(s.h_, {
					children: (0, n.jsx)(s.VY, {
						ref: t,
						className: (0, l.cn)(
							"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
							"popper" === r &&
								"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
							a,
						),
						position: r,
						...d,
						children: i,
					}),
				});
			});
			m.displayName = s.VY.displayName;
			let c = (0, r.forwardRef)((e, t) => {
				let { className: a, children: i, ...r } = e;
				return (0, n.jsx)(s.ck, {
					ref: t,
					className: (0, l.cn)(
						"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
						a,
					),
					...r,
					children: i,
				});
			});
			c.displayName = s.ck.displayName;
		},
		73578: function (e, t, a) {
			"use strict";
			a.d(t, {
				RM: function () {
					return d;
				},
				SC: function () {
					return o;
				},
				iA: function () {
					return r;
				},
				pj: function () {
					return u;
				},
				ss: function () {
					return p;
				},
				xD: function () {
					return l;
				},
			});
			var n = a(57437),
				s = a(2265),
				i = a(94508);
			let r = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("div", {
					className: "relative w-full overflow-auto mt-6",
					children: (0, n.jsx)("table", {
						ref: t,
						className: (0, i.cn)("w-full caption-bottom text-sm", a),
						...s,
					}),
				});
			});
			r.displayName = "Table";
			let l = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("thead", {
					ref: t,
					className: (0, i.cn)("[&_tr]:border-b", a),
					...s,
				});
			});
			l.displayName = "TableHeader";
			let d = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("tbody", {
					ref: t,
					className: (0, i.cn)("[&_tr:last-child]:border-0", a),
					...s,
				});
			});
			((d.displayName = "TableBody"),
				(s.forwardRef((e, t) => {
					let { className: a, ...s } = e;
					return (0, n.jsx)("tfoot", {
						ref: t,
						className: (0, i.cn)(
							"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
							a,
						),
						...s,
					});
				}).displayName = "TableFooter"));
			let o = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("tr", {
					ref: t,
					className: (0, i.cn)(
						"border-b transition-colors data-[state=selected]:bg-muted",
						a,
					),
					...s,
				});
			});
			o.displayName = "TableRow";
			let p = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("th", {
					ref: t,
					className: (0, i.cn)(
						"h-10 px-3 py-2 text-left align-middle font-medium",
						a,
					),
					...s,
				});
			});
			p.displayName = "TableHead";
			let u = s.forwardRef((e, t) => {
				let { className: a, ...s } = e;
				return (0, n.jsx)("td", {
					ref: t,
					className: (0, i.cn)("align-middle", a),
					...s,
				});
			});
			((u.displayName = "TableCell"),
				(s.forwardRef((e, t) => {
					let { className: a, ...s } = e;
					return (0, n.jsx)("caption", {
						ref: t,
						className: (0, i.cn)("mt-4 text-sm", a),
						...s,
					});
				}).displayName = "TableCaption"));
		},
		12339: function (e, t, a) {
			"use strict";
			a.d(t, {
				SP: function () {
					return o;
				},
				dr: function () {
					return d;
				},
				mQ: function () {
					return l;
				},
				nU: function () {
					return p;
				},
			});
			var n = a(57437),
				s = a(49904),
				i = a(2265),
				r = a(94508);
			let l = s.fC,
				d = i.forwardRef((e, t) => {
					let { className: a, ...i } = e;
					return (0, n.jsx)(s.aV, {
						ref: t,
						className: (0, r.cn)(
							"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
							a,
						),
						...i,
					});
				});
			d.displayName = s.aV.displayName;
			let o = i.forwardRef((e, t) => {
				let { className: a, ...i } = e;
				return (0, n.jsx)(s.xz, {
					ref: t,
					className: (0, r.cn)(
						"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
						a,
					),
					...i,
				});
			});
			o.displayName = s.xz.displayName;
			let p = i.forwardRef((e, t) => {
				let { className: a, ...i } = e;
				return (0, n.jsx)(s.VY, {
					ref: t,
					className: (0, r.cn)(
						"ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						a,
					),
					...i,
				});
			});
			p.displayName = s.VY.displayName;
		},
		35153: function (e, t, a) {
			"use strict";
			a.d(t, {
				pm: function () {
					return m;
				},
			});
			var n = a(2265);
			let s = 0,
				i = new Map(),
				r = (e) => {
					if (i.has(e)) return;
					let t = setTimeout(() => {
						(i.delete(e), p({ type: "REMOVE_TOAST", toastId: e }));
					}, 1e6);
					i.set(e, t);
				},
				l = (e, t) => {
					switch (t.type) {
						case "ADD_TOAST":
							return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 1) };
						case "UPDATE_TOAST":
							return {
								...e,
								toasts: e.toasts.map((e) =>
									e.id === t.toast.id ? { ...e, ...t.toast } : e,
								),
							};
						case "DISMISS_TOAST": {
							let { toastId: a } = t;
							return (
								a
									? r(a)
									: e.toasts.forEach((e) => {
											r(e.id);
										}),
								{
									...e,
									toasts: e.toasts.map((e) =>
										e.id === a || void 0 === a ? { ...e, open: !1 } : e,
									),
								}
							);
						}
						case "REMOVE_TOAST":
							if (void 0 === t.toastId) return { ...e, toasts: [] };
							return {
								...e,
								toasts: e.toasts.filter((e) => e.id !== t.toastId),
							};
					}
				},
				d = [],
				o = { toasts: [] };
			function p(e) {
				((o = l(o, e)),
					d.forEach((e) => {
						e(o);
					}));
			}
			function u(e) {
				let { ...t } = e,
					a = (s = (s + 1) % Number.MAX_SAFE_INTEGER).toString(),
					n = () => p({ type: "DISMISS_TOAST", toastId: a });
				return (
					p({
						type: "ADD_TOAST",
						toast: {
							...t,
							id: a,
							open: !0,
							onOpenChange: (e) => {
								e || n();
							},
						},
					}),
					{
						id: a,
						dismiss: n,
						update: (e) => p({ type: "UPDATE_TOAST", toast: { ...e, id: a } }),
					}
				);
			}
			function m() {
				let [e, t] = n.useState(o);
				return (
					n.useEffect(
						() => (
							d.push(t),
							() => {
								let e = d.indexOf(t);
								e > -1 && d.splice(e, 1);
							}
						),
						[e],
					),
					{
						...e,
						toast: u,
						dismiss: (e) => p({ type: "DISMISS_TOAST", toastId: e }),
					}
				);
			}
		},
		94508: function (e, t, a) {
			"use strict";
			a.d(t, {
				cn: function () {
					return i;
				},
			});
			var n = a(61994);
			a(54819);
			var s = a(53335);
			function i() {
				for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
					t[a] = arguments[a];
				return (0, s.m6)((0, n.W)(t));
			}
			a(25566);
		},
	},
	function (e) {
		(e.O(
			0,
			[58, 145, 999, 345, 298, 461, 904, 455, 349, 537, 971, 117, 744],
			function () {
				return e((e.s = 82931));
			},
		),
			(_N_E = e.O()));
	},
]);
