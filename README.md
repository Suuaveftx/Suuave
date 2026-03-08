This is how to get started with project.

## Set Up

1.  Clone this repo
2.  Create `.env` file in the root of the project
3.  Authenticate with development token
    In terminal run this one and Restart the terminal. so you dont need to authenticate each session

```bash
setx NPM_TOKEN "ghp_xxxxx"

```

Or run per session:

```bash
$env:NPM_TOKEN="ghp_xxxxx"

```

## Creating a working branch

Branch out from `development`

```bash
git checkout -b `new-branch`
```

## Install dependencies

Run

```bash
yarn dev
```

Run the development server:

```bash
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
