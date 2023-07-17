import axios, { AxiosResponse } from 'axios';

/**
 * FearGreedIndexAPI class for fetching the Fear and Greed Index from the alternative.me API.
 */
export class FearGreedIndexAPI {
  /**
   * Static method to fetch the Fear and Greed Index.
   * @returns {Promise<string>} The Fear and Greed Index.
   * @throws {Error} When unable to fetch the index.
   */
  async getFearGreedIndex(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get('https://api.alternative.me/fng/');
      const fearGreedIndex: string = response.data.data[0].value;

      // Check if fearGreedIndex is a number
      if (isNaN(Number(fearGreedIndex))) {
        throw new Error(`Fear and Greed Index is not a number: ${fearGreedIndex}`);
      }

      return fearGreedIndex;
    } catch (error) {
      // Rethrow the error with a custom message
      const message = (error instanceof Error) ? error.message : 'Unexpected error occurred';
      throw new Error(`Failed to fetch Fear and Greed Index: ${message}`);
    }
  }
  
  async getGasPrices(): Promise<number[]> {
    try {
      const params = {
        module: 'gastracker',
        action: 'gasoracle',
        apikey: "2GDQQWBUR3C9WVWV5ZS1EYY4ETVPGFW3R5",
      };

      const response = await axios.get('https://api.etherscan.io/api', { params });

      if (response.status === 200 && response.data && response.data.status === '1') {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = response.data.result;
        return [SafeGasPrice, ProposeGasPrice, FastGasPrice];
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}


