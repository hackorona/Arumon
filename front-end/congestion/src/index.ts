import {hello} from './sub';
import axios from 'axios';

const baseURL = 'https://qakz6v6ril.execute-api.ap-northeast-1.amazonaws.com/dev/density'

const main = async () => {
  const message: string = 'Hello World2';
  const result = await axios.get(baseURL)
  console.log(result)
  hello(message)
}

main()
