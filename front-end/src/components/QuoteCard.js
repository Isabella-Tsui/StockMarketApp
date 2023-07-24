import React, { useState, useEffect } from 'react'
import { Card, Spin, Skeleton, Typography } from 'antd'
import { getQuote } from '../utils/apicall'

const QuoteCard = ({ quoteText }) => {
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(true)

  // call api from here
  useEffect(() => {
    const getQuoteData = async () => {
      setLoading(true)
      const data = await getQuote(quoteText)

      setQuote(data)
      setLoading(false)
    }

    getQuoteData()
  }, [quoteText])

  if (loading) return <Spin />

  return (
    <Card
      style={{
        width: '100%',
        margin: '16px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
      }}
      hoverable
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <ul>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              Current Price
            </Typography.Title>
            <span>{quote.c} $</span>
          </li>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              Previous Close
            </Typography.Title>
            <span>{quote.d}$</span>
          </li>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              Percentage Change
            </Typography.Title>
            <span
              style={{
                color: quote.dp > 0 ? 'green' : 'red',
              }}
            >
              {quote.dp}%
            </span>
          </li>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              Daily Change
            </Typography.Title>
            <span>{quote.o}</span>
          </li>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              High
            </Typography.Title>
            <span>{quote.h}$</span>
          </li>
          <li>
            <Typography.Title level={5} style={{ margin: '0' }}>
              Low
            </Typography.Title>
            <span>{quote.l}$</span>
          </li>
        </ul>
      )}
    </Card>
  )
}

export default QuoteCard
