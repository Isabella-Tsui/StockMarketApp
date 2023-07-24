import React from 'react'
import styles from './Home.module.css'
import { Divider } from 'antd'
import * as FaIcons from 'react-icons/fa'

export default function WishList({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated}
      <div className={styles.home}>
        <div className={styles.container}>
          <h1>
            Your WishList <span>♥</span>{' '}
          </h1>
          <Divider
            size='large'
            style={{
              margin: '16px 0',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
              height: '2px',
              // black color
              backgroundColor: '#000000',
            }}
          />
          <div className={styles.wishList}>
            <ul>
              <li>
                <div className={styles.wishListData}>
                  <h3>MSFT</h3>
                  <p>Microsoft Corporation</p>
                </div>

                <div className={styles.icons}>
                  <FaIcons.FaTrashAlt
                    style={{
                      // red color
                      color: '#ff0000',
                    }}
                  />

                  <FaIcons.FaEye
                    style={{
                      // blue color
                      color: '#0000ff',
                    }}
                  />
                </div>
              </li>
              <li>
                <div className={styles.wishListData}>
                  <h3>MSFT</h3>
                  <p>Microsoft Corporation</p>
                </div>

                <div className={styles.icons}>
                  <FaIcons.FaTrashAlt
                    style={{
                      // red color
                      color: '#ff0000',
                    }}
                  />

                  <FaIcons.FaEye
                    style={{
                      // blue color
                      color: '#0000ff',
                    }}
                  />
                </div>
              </li>
              <li>
                <div className={styles.wishListData}>
                  <h3>MSFT</h3>
                  <p>Microsoft Corporation</p>
                </div>

                <div className={styles.icons}>
                  <FaIcons.FaTrashAlt
                    style={{
                      // red color
                      color: '#ff0000',
                    }}
                  />

                  <FaIcons.FaEye
                    style={{
                      // blue color
                      color: '#0000ff',
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
