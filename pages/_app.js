import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import { createContext } from 'react';

const state = {
  userName: "Akshay Kanchan",
  emailId: "akshaykanchan07@gmail.com",
  userId: "42DJ21",
  phoneNo: [
    "9000000000",
  ]
}
const Context = createContext(state);
export { Context };

function MyApp({ Component, pageProps }) {

  return (
    <Context.Provider value={state}>
      <NextNProgress />
      <Component {...pageProps} />
    </Context.Provider>
    )
}

export default MyApp
