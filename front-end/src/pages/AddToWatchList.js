import { Divider } from 'antd'

import React from 'react'
import { useState } from 'react'
import styles from '../pages/Home.module.css'

const AddToWatchList = () => {
  const [addWatchList, setAddWatchList] = useState(false)

  return (
    <div className={styles.addtoWatchList}>
      <ul>
        <li>
          <button>WatchList A</button>
        </li>
        <li>
          <button>WatchList A</button>
        </li>
        <li>
          <button>WatchList A</button>
        </li>
        <li>
          <button>WatchList A</button>
        </li>
      </ul>

      <Divider size='large'>OR </Divider>

      <div class={styles.newWatchList}>
        <button
          onClick={() => {
            setAddWatchList(!addWatchList)
          }}
        >
          Add a New WatchList
        </button>

        {addWatchList && (
          <div className={styles.addWatchList}>
            <input type='text' placeholder='Enter WatchList Name' />
            <button>Add</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddToWatchList
