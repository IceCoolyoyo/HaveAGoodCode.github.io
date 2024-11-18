# HaveAGoodCode

Welcome to **HaveAGoodCode**! 🚀

**HaveAGoodCode** is a supportive community for coding enthusiasts, where our mission is to foster creativity and excellence in programming. 

### What We Offer:

Join us in writing great code and creating a bright future!

---

# How to Start Development with Node.js and Gulp CLI

Welcome to **HaveAGoodCode**! 🚀 In this guide, we'll walk through how to get started with Node.js and install the Gulp CLI, so you can start automating your tasks and writing great code.

### Step 1: Install Node.js

   Node.js is a JavaScript runtime built on Chrome's V8 engine. It's essential for running JavaScript outside the browser and for managing packages via **npm** (Node Package Manager).
   
   1. **Go to the official Node.js website**:  
      [https://nodejs.org/](https://nodejs.org/)
   
   2. **Download and install Node.js**:  
      You'll see two versions: 
      - **LTS** (Long Term Support): Recommended for most users.
      - **Current**: Latest features, but may be less stable.
   
      Choose **LTS** unless you need the latest features.
   
   3. **Verify the installation**:  
      Once installed, open your terminal (Command Prompt or Terminal on Mac) and type the following commands to check if Node.js and npm were installed correctly:
   
      ```bash
      node -v
      npm -v
      ```

### Step 2: Install the Gulp CLI Globally
   Now that you have Node.js installed, you can install the Gulp Command Line Interface (CLI) globally. The Gulp CLI helps you run Gulp tasks from the command line.
   
   1. **Open your terminal (Command Prompt on Windows or Terminal on macOS/Linux)**.
   
   2. **Install Gulp globally by running the following command**:
   
      ```bash
      npm install --global gulp-cli
      ```
   
   3. **Verify the Gulp installation**:
      To ensure Gulp was installed correctly, run this command:
   
      ```bash
      gulp -v
      ```
      
      This should show the Gulp version installed on your system.

### Step 3: Create a New Directory
   First, create a new directory:
   
   ```bash
   mkdir have_a_good_code
   ```

### Step 4: Clone the Repository
   After creating the directory, navigate into it and clone the repository:

   ```bash
   cd have_a_good_code
   git clone https://github.com/HaveAGoodCode/HaveAGoodCode.github.io.git
   ```

### Step 5: Run Gulp Tasks
   After installing Gulp, you can now run the Gulp tasks in your project.
   
   ```bash
   gulp
   ````
   This will run the default Gulp task defined in your project’s gulpfile.js.

---

With these steps, you’ve set up HaveAGoodCode project ! 🚀
