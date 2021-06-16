import Head from 'next/head';
import Popups from 'components/Popups';
import Calendar from 'components/Calendar';

export default function Home() {
  return (
    <div className="Container">
      <Head>
        <title>Computer Notifications</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Popups />
      <Calendar />
    </div>
  )
}
