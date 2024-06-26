import '@/styles/globals.scss';
import 'react-loading-skeleton/dist/skeleton.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import Layout from '@/components/Layout';
export default function App({ Component, pageProps }) {
  return   <Layout><Component {...pageProps} /> </Layout>

}
