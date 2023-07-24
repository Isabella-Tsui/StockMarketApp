import React, { useState } from 'react'
import Input from '../components/Input'
import QuoteCard from '../components/QuoteCard'
import styles from './Home.module.css'
import CompanyData from '../components/CompanyData'
import Chart from '../components/Chart'
import AddToWatchList from './AddToWatchList'
import { Button, Typography, Modal } from 'antd'

export default function Home({ isAuthenticated }) {
  const [quoteText, setQuoteText] = useState('AAPL')
  const [modal2Open, setModal2Open] = useState(false) // dependency for modal

  return (
    <>
      {isAuthenticated}
      <div className={styles.home}>
        <Input setQuoteText={setQuoteText} />

        <div className={styles.wishList}>
          <div></div>
          <Button
            type='primary'
            style={{
              margin: '0px 16px',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
              backgroundColor: '#f5f5f5',
              color: '#000000',
              borderColor: '#f5f5f5',
            }}
            onClick={() => {
              setModal2Open(true)
            }}
          >
            Add to Watch List
          </Button>
        </div>
        <div className={styles.stocksDetail}>
          <div className={styles.left}>
            <Typography.Title level={3}>Stock Details</Typography.Title>
            <QuoteCard quoteText={quoteText} />
          </div>

          <div className={styles.right}>
            <Typography.Title level={3}>Company Details</Typography.Title>
            <CompanyData quoteText={quoteText} />
          </div>
        </div>

        <div class={styles.chart}>
          <Chart quoteText={quoteText} />
        </div>
      </div>

      <Modal
        title='Add to Watch List'
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <AddToWatchList />
      </Modal>
    </>
  )
}
