import axios from 'axios';

export default function getPrices(quote){
  const { data } = axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo')
  console.log(data);
}
