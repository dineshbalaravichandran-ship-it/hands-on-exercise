# Git Hands-On Lab — Full Solutions (GitHub version)

> Wherever the original lab says **GitLab**, use **GitHub** instead — the commands are identical. Replace `<your-username>` and `<repo-name>` with your actual GitHub username and repository name throughout.

---

## Lab 1 — Git Setup, Editor Config, First Commit

**Objective:** Configure Git, set a default editor, initialize a repo, create/track/commit a file, and push to GitHub.

### Step 1: Configure Git

```bash
# Check Git is installed
git --version

# Set your identity (global = applies to every repo on this machine)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Verify
git config --list
# or check a single value
git config user.name
git config user.email
```

### Step 2: Set a default editor

On GitHub-hosted / VS Code setups, VS Code is the modern equivalent of the notepad++ step:

```bash
git config --global core.editor "code --wait"

# Verify
git config -e
# or
git config --global -e
```

If you specifically want Notepad++ (Windows only):

```bash
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

### Step 3: Create the repo and first file

```bash
# 1. Create and enter project folder
mkdir GitDemo
cd GitDemo

# 2. Initialize Git repository
git init

# Verify hidden .git folder exists
ls -la

# 3. Create a file with content
echo "Welcome to my first Git repository" > welcome.txt

# 4. Confirm file exists
ls -la

# 5. Verify content
cat welcome.txt

# 6. Check status (should show welcome.txt as untracked)
git status

# 7. Stage the file
git add welcome.txt

# 8. Commit with a multi-line message (opens your default editor)
git commit
# In the editor, type e.g.:
#   Add welcome.txt
#
#   Initial commit adding welcome message file to the repo.
# Save and close the editor to complete the commit.

# 9. Confirm working directory is clean
git status
```

### Step 4: Connect to GitHub and push

1. On GitHub, create a new **empty** repository named `GitDemo` (don't initialize with a README — you already have local history).
2. Link and push:

```bash
git remote add origin https://github.com/<your-username>/GitDemo.git
git branch -M main
git push -u origin main

# If the remote has any commits already (e.g. a README), pull first:
git pull origin main --allow-unrelated-histories
```

---

## Lab 2 — `.gitignore`

**Objective:** Ignore `.log` files and a `log` folder so they never get committed.

```bash
cd GitDemo   # your existing repo from Lab 1

# 1. Create a .log file
echo "sample log entry" > debug.log

# 2. Create a log folder with a file in it
mkdir log
echo "another log entry" > log/app.log

# 3. Check status BEFORE ignoring — both should show as untracked
git status

# 4. Create/edit .gitignore
cat >> .gitignore << 'EOF'
*.log
log/
EOF

# 5. Verify .gitignore content
cat .gitignore

# 6. Check status again — debug.log and log/ should now be gone from
#    the "untracked files" list (only .gitignore itself shows up)
git status

# 7. Stage and commit the .gitignore file itself
git add .gitignore
git commit -m "Add .gitignore to exclude log files and log folder"

# 8. Final verification
git status
```

**Expected result:** `git status` shows a clean working tree (aside from `.gitignore` now being tracked) — `debug.log` and the `log/` folder never appear as things to commit.

---

## Lab 3 — Branching and Merging

**Objective:** Create a branch, commit changes on it, merge back to `main`, and clean up.

### Branching

```bash
cd GitDemo

# 1. Create a new branch
git branch GitNewBranch

# 2. List all local and remote branches (the "*" marks current branch)
git branch -a

# 3. Switch to the new branch
git checkout GitNewBranch
# (modern equivalent: git switch GitNewBranch)

# Add a file with content
echo "This content was added on GitNewBranch" > branchfile.txt

# 4. Commit the changes
git add branchfile.txt
git commit -m "Add branchfile.txt on GitNewBranch"

# 5. Check status
git status
```

### Merging

```bash
# 1. Switch back to main
git checkout main

# 2. See differences between main and the branch (CLI diff)
git diff main GitNewBranch

# 3. Visual diff tool (if P4Merge is installed and configured)
git config --global diff.tool p4merge
git config --global difftool.p4merge.cmd 'p4merge "$LOCAL" "$REMOTE"'
git difftool main GitNewBranch

# 4. Merge the branch into main
git merge GitNewBranch

# 5. View graphical commit history
git log --oneline --graph --decorate

# 6. Delete the branch now that it's merged
git branch -d GitNewBranch

# Confirm it's gone
git status
git branch -a
```

Push the merged result and branch deletion to GitHub:

```bash
git push origin main
```

---

## Lab 4 — Merge Conflict Resolution

**Objective:** Deliberately create a conflict between `main` and a branch, then resolve it.

```bash
cd GitDemo

# 1. Verify main is clean
git status

# 2. Create a branch and add hello.xml
git checkout -b GitWork
cat > hello.xml << 'EOF'
<message>Hello from GitWork branch</message>
EOF
git add hello.xml
git status   # new file staged

# 3. Update the content
cat > hello.xml << 'EOF'
<message>Hello from GitWork branch - updated</message>
EOF
git status   # shows modified

# 4. Commit the change
git add hello.xml
git commit -m "Add and update hello.xml on GitWork branch"

# 5. Switch to main
git checkout main

# 6. Add hello.xml on main with DIFFERENT content
cat > hello.xml << 'EOF'
<message>Hello from main branch</message>
EOF

# 7. Commit on main
git add hello.xml
git commit -m "Add hello.xml on main with different content"

# 8. Observe divergent history
git log --oneline --graph --decorate --all

# 9. Check differences before merging
git diff main GitWork -- hello.xml

# 10. Visual diff (optional, needs P4Merge configured as in Lab 3)
git difftool main GitWork -- hello.xml

# 11. Attempt the merge — this WILL conflict
git merge GitWork
```

At this point Git reports a conflict and marks it inside `hello.xml`:

```
<<<<<<< HEAD
<message>Hello from main branch</message>
=======
<message>Hello from GitWork branch - updated</message>
>>>>>>> GitWork
```

```bash
# 12. See the conflict markers / status
git status

# 13. Resolve with a 3-way merge tool
git config --global merge.tool p4merge
git mergetool
# — or manually edit hello.xml, remove the <<<<<<<, =======, >>>>>>> markers,
#   and keep the final content you want, e.g.:
#   <message>Hello from main branch, merged with GitWork updates</message>

# 14. Mark resolved and commit
git add hello.xml
git commit -m "Resolve merge conflict between main and GitWork on hello.xml"

# 15. Check status; ignore mergetool backup files (e.g. *.orig)
git status
echo "*.orig" >> .gitignore

# 16. Commit the .gitignore update
git add .gitignore
git commit -m "Ignore merge tool backup files"

# 17. List all branches
git branch -a

# 18. Delete the now-merged branch
git branch -d GitWork

# 19. Observe final history
git log --oneline --graph --decorate
```

---

## Lab 5 — Cleanup and Push to Remote

**Objective:** Confirm a clean state, sync with remote, and push pending work.

```bash
cd GitDemo

# 1. Verify main is clean
git status

# 2. List all available branches
git branch -a

# 3. Pull the latest from remote main (in case others pushed changes)
git pull origin main

# 4. Push all pending local commits (from Labs 3 & 4) to remote
git push origin main

# 5. Verify on GitHub: open the repo in your browser (or)
git log origin/main --oneline -5
```

Your local `main` and `origin/main` should now match, and the GitHub web UI should show `welcome.txt`, `.gitignore`, and `hello.xml` with full merge/conflict history in the commits graph.

---

## Quick command reference

| Purpose | Command |
|---|---|
| Init repo | `git init` |
| Stage file | `git add <file>` |
| Commit | `git commit -m "message"` |
| Status | `git status` |
| Create branch | `git branch <name>` |
| Switch branch | `git checkout <name>` (or `git switch <name>`) |
| Create + switch | `git checkout -b <name>` |
| List branches | `git branch -a` |
| Merge | `git merge <branch>` |
| Delete branch | `git branch -d <name>` |
| Diff | `git diff <branch1> <branch2>` |
| History (graph) | `git log --oneline --graph --decorate --all` |
| Add remote | `git remote add origin <url>` |
| Push | `git push origin <branch>` |
| Pull | `git pull origin <branch>` |
