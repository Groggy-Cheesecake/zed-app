### Step 1: Branch

Always better to create local branches to work on a specific task/feature. These should also be created directly off of the `master` branch.
Before creating a branch or pushing a branch, to keep local branches up-to-date with that of origin, always run `git pull -r` to avoid unnecessary merge commits

```shell
git pull -r
git checkout -b feature -t master
```

### Step 2: Code

To keep the style of the Javascript code consistent we have a basic linting configured.
To check your contributed code for errors and also to automatically fix them:

 ```shell
 npm run lint:fix
 ```

* Use the pre-configured `eslint` for JavaScript
* Avoid trailing whitespace & un-necessary white lines
* Indentation is 1 tab = 2 spaces for all files

### Step 3: Commit

1. Ensure your code changes adhere to our styling and linting standards. We've configured pre-commit hooks to use `prettier` for style linting.
2. List all your changes as a list if needed else simply give a brief description on what the changes are.
3. All lines at 100 columns.
4. [Use Smart Commits](https://confluence.atlassian.com/bitbucket/use-smart-commits-298979931.html)
5. [Squashing](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) and [Merging](https://git-scm.com/docs/git-merge) your commits to make history neater is always welcomed, but squashing can be handled during the merge process.

### Step 4: Rebase

As a best practice, once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to ensure your changes are placed at the
top. Plus merge conflicts can be resolved

```shell
git pull -r
git rebase master
```

### Step 5: PRs

Please ensure that your pull request follows all of the guidelines to include:

* Title is descriptive and generally focused on what the PR addresses 
(If your PR is a work in progress, please `Create a Draft PR`. Click `Ready for review` on the PR page to push it for review)
* Description explains what the PR achieves/addresses
* The PR passes all CI checks, to include `coveralls` and `Travis`
