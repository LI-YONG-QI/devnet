# How to deploy Fleek Function with package and typescript ?

Official guide: https://fleek.xyz/docs/cli/functions/

In guide example, the main function use Javascript and without import any package

So, if you want to deploy Typescript function and use third-party packages, you need to resolve two problems:

1. type of function parameter
2. import package in function

# Type of function parameter

![image](https://github.com/LI-YONG-QI/devnet/assets/76777953/8759ac50-2f12-4cc3-b085-98b2b39596f7)


Need download `index.d.ts` file (red circle), and put it in your code folder

And use `Fleek` namespace to declare type

Example:

```typescript
export const main = async (
  params: Fleek.HttpRequest
): Promise<Fleek.HttpResponse> => {};
```

# Import packages

Normal function like this:

```typescript
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const main = async (
  params: Fleek.HttpRequest
): Promise<Fleek.HttpResponse> => {
  const block = await client.getBlockNumber();
  return {
    code: 200,
    body: block,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
```

When executing this function with `ts-node`, it works. However, when you deploy to Fleek and call deployed API URL, you will get error because Fleek doesn't recognize what is `viem` package.

The uploaded files only include the file containing the main function, without the source code of viem.

To solve this problem, we need to **bundle** the main program with the packages. Here, we will use `esbuild`.

Install esbuild

```bash
npm install --save-exact --save-dev esbuild
```

```bash
./node_modules/.bin/esbuild --version
```

Bundle

```bash
./node_modules/.bin/esbuild ./fleek-fn/getEvents.ts --bundle --format=esm --outfile=./fleek-fn/out/out.js
```

- ./fleek-fn/getEvents.ts: the path you want to bundle (please replace it)
- --bundle: bundle the file
- --format=esm: output format, please note that format should be set to _esm_, because that official export format specified is ESModule, not CommonJS.
- --outfile=./fleek-fn/out/out.js: output path (please replace it)

Finally, when deploying, you need to set the path to the outfile path.
