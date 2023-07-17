import { Client, Collection, MessageEmbed } from 'discord.js';
import axios from 'axios';

export class CustomClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
    }

    buildEmbed(description) {
        return new MessageEmbed().setDescription(description).setColor('Aqua');
    }

    async getGasPrices() {
        const params = {
            module: 'gastracker',
            action: 'gasoracle',
            apikey: this.config.etherscan.apiKey,
        };

        const response = await axios.get('https://api.etherscan.io/api', { params });
  
        if (response.status === 200 && response.data && response.data.status === '1') {
            const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = response.data.result;
            return [SafeGasPrice, ProposeGasPrice, FastGasPrice];
        }
        return [];
    }
}

