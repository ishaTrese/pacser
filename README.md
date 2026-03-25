# PACSER
**Gamified Civil Service Exam Reviewer**

A web app that helps students prepare for the Civil Service Exam through gamified lessons, quizzes, and leaderboards. Built as a capstone project.

---

## How to Run This on Your Computer (Windows)

Follow these steps carefully. You only need to do the installation steps **once**.

---

### Step 1 — Install Node.js

Node.js is a tool that lets your computer run this project.

1. Go to https://nodejs.org
2. Click the big **LTS** download button (the one that says "Recommended for most users")
3. Open the downloaded file and click **Next** through all the steps to install it
4. When it's done, restart your computer

To check if it installed correctly:
1. Press the **Windows key**, type `cmd`, and open **Command Prompt**
2. Type this and press Enter:
   ```
   node -v
   ```
3. You should see a version number like `v22.x.x` — that means it worked

---

### Step 2 — Install Git

Git is a tool that lets you download the project from GitHub.

1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Click **Next** through all the steps — the default settings are fine
4. When done, close and reopen Command Prompt

To check if it installed:
```
git --version
```
You should see something like `git version 2.x.x`

---

### Step 3 — Download the Project

1. Open **Command Prompt**
2. Navigate to where you want to save the project. For example, to save it on your Desktop:
   ```
   cd Desktop
   ```
3. Download the project by typing:
   ```
   git clone https://github.com/ishaTrese/pacser.git
   ```
4. Go into the project folder:
   ```
   cd pacser
   ```

---

### Step 4 — Install Project Dependencies

Still in Command Prompt inside the `pacser` folder, type:
```
npm install
```

This downloads all the libraries the project needs. It may take a minute. Wait until it finishes.

---

### Step 5 — Set Up the Environment File

The project needs a secret file to connect to the database. Ask the project owner for the `.env` file and place it inside the `pacser` folder.

The file should be named exactly `.env` and look like this:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

---

### Step 6 — Run the App

Type this in Command Prompt:
```
npm run dev
```

You should see something like:
```
  VITE v6.x.x  ready in x ms

  ➜  Local:   http://localhost:5173/
```

Open your browser and go to:
```
http://localhost:5173
```

The app should now be running! 🎉

---

### Stopping the App

To stop the app, click inside the Command Prompt window and press:
```
Ctrl + C
```

### Starting It Again Next Time

You don't need to repeat all the steps above. Next time, just:

1. Open Command Prompt
2. Navigate to the project folder:
   ```
   cd Desktop\pacser
   ```
3. Run:
   ```
   npm run dev
   ```

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend / DB / Auth | Supabase |
| Routing | React Router v6 |
| Icons | lucide-react |

---