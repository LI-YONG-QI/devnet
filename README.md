# DevNet

Base Onchain Summer project. (Discovery track)

# Overview

DevNet is a website for developers to create personal profiles, like Linkedin / Github, but in DevNet, you can also create "learning plans", and "mint NFTs" upon completing plan, the minting price of SBT is set by plan creator.

People can create a learning plan, setting appropriate learning paths according to different goals like a roadmap, to provide guidance for newcomers who are not yet familiar with the technology.

Creators can also use these features to build their own business models. For example, create plans as part of a comprehensive course, and allow NFT holders to access to subsequent course content. In this case, NFTs can serve as a source of revenue for the course.

# Features

## Social Login (Homepage & Profile)

User can login with their social account, like Github, Google, Twitter, etc.

<img width="1509" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/f9c09079-7e96-4f69-bead-93eb48f4dd08">

<img width="1510" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/c816af3a-f40f-4a1f-a233-089d5041d5b6">

<img width="1510" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/58dbb1aa-5a4b-4aa8-8f4a-a16170015963">

## Create plan

User can create learning plan, and set the price of SBT, and the number of SBT.

<img width="1512" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/e1a37a27-3e34-4237-a0bd-c93a0050cdde">

## Start Plan

User can start the plan, and the plan will be shown in the user's profile.

<img width="1502" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/3b003a1b-4c8a-45a2-b1e7-e133b838db6d">

User can mint NFT when finishing the plan, the price of NFT is set by plan creator. And the NFT will shown in the user's profile.

## Explore

User can explore recently created / minted / completed plans.

Note: not finished yet, only display plan contract address by fetched event log

<img width="1512" alt="image" src="https://github.com/LI-YONG-QI/devnet/assets/76777953/c8bc8853-c58a-44e1-8498-9ea82c69db51">

# Tech

## Smart Contract

### PlanRouter

Core contract to implement main plan functions.

- `createPlan()` Create new `Plan` contract and record plan address owned by user
- `active()` Active(start) specific plan contract

### Plan

ERC721 Contract record the information of each plan

The information include totalSupply / period / mintPrice

- `active()` recorder starter and timestamp
- `mint()` mint NFT to starter and pay mintPrice ether
- `withdraw()` withdraw ether from plan creator

## Fleek Functions

In `fleek-fn/getEvents.ts`

Use Fleek Functions to read event(minted / created) from on-chain contracts.

# How to start ?

1. create .env file by .env.example
2. `pnpm install`
3. `pnpm dev`

# How to deploy Fleek Functions ?

If you want to know more details on deploy Fleek Function, please check this [guide](https://github.com/LI-YONG-QI/devnet/tree/main/guides)

1. esbuild bundle `getEvents.ts` with package to `out/out.js`

```bash
pnpm bundle
```

2. create function

```bash
fleek functions create --name <YOUR_FUNCTION_NAME>
```

3. deploy function (--path must be out.js file path)

```bash
fleek functions deploy \
  --name <YOUR_FUNCTION_NAME> \
  --path <out.js file path>
```

4. check function deployment

```bash
fleek function deployments --name <YOUR_FUNCTION_NAME>
```
