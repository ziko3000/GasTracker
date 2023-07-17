<h1 align="center">Gas Tracker Discord Bot ⛽</h1>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://github.com/ziko3000">Min Fam</a>
  </sub>
</div>

<p align="center">
A Discord bot that allows you to get the current Gas for cryptocurrency markets using Slash commands.
</p>

![Bot Demo](demo.gif)

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)
- [Adding Commands](#adding_commands)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

To run this project, you'll need to have:

- Node.js (version 14.0.0 or newer)
- A Discord bot token, which you can get by creating a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
- Discord.js 14
- Typescript
- An environment variable file (.env) for your bot token

### Installing(Windows)

1. Clone this repository:

    ```bash
    git clone https://github.com/ziko3000/Fear-and-Greed-Index](https://github.com/ziko3000/GasTracker
    ```

2. Change into the cloned repository:

    ```bash
    cd your-repo-name
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create an .env file in the root of your project and insert your bot token:

    ```env
    BOT_TOKEN=YourDiscordBotToken
    APPLICATION_ID=YourApplicationId
    ```

5. Run the bot:

    ```bash
    npm run start

    ```
### Installing Nodemon on Linux

[Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in your source and automatically restart your server, perfect for development. Follow these steps to install it on Linux:

1. To install Nodemon globally (available to all your Node.js projects), you can run:

    ```bash
    npm install -g nodemon
    ```

    If you're facing permission issues, you may need to prepend `sudo`:

    ```bash
    sudo npm install -g nodemon
    ```

That's it! You've successfully installed Nodemon on your Linux machine. Now, you can use the `nodemon` command to run your bot:

```bash
    nodemon src/bot.ts
```    
## 🎈 Usage <a name = "usage"></a>

This bot supports the following Slash commands:

- `/gas`: Get Ethereum gas prices
- `/help`: Get help about the bot and its commands.

## ⛏️ Adding Commands <a name = "adding_commands"></a>

To add a new command:

1. Create a new command file in the `commands` folder, like `mycommand.ts`.
2. Define your command as a class with `name`, `description`, and `execute` method.
3. Import your command class in `CommandHandler.ts` and register it in the constructor.

For example:

```typescript
import { MyCommand } from './mycommand';

// In CommandHandler constructor
this.registerCommand('mycommand', 'This is my command', (interaction) => new MyCommand().execute(interaction));
```

## 📄 License <a name = "license"></a>
This project is licensed under the MIT License - see the LICENSE.md file for details.
