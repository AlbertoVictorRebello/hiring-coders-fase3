import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFullSession } from 'vtex.session-client'
import { Spinner } from 'vtex.styleguide'
import Coins from './Coins'

import style from './style.css'

function PointCounter() {
  const { loading, data, error } = useFullSession()
  const [points, setPoints] = useState(0)
  const [getDataError, setGetDataError] = useState(false)
  const [user, setUser] = useState<any>(undefined)


  useEffect(() => {
    const getData = data as any
    setUser(getData?.session?.namespaces?.profile)
  },[data])

  useEffect(() => {
    if (user && !loading) {
      axios
      .get(`/_v/bonus/${user?.email?.value}`)
        .then(function (response) {
        setPoints(response.data?.Item?.saldo ?? 0)
      })
      .catch(function () {
        setGetDataError(true)
      })
    }
  }, [loading, user])

  if (loading && !error || getDataError) {
    
    return (
      <div className={`${style.pointCounter} c-muted-1 db tc`}>
        <Spinner />
      </div>
    )
  }

  if (!loading && !user) {
    return (
      <div className={`${style.pointCounter} c-muted-1 db tc`}>
        <h3>{`Faça login para ver seus pontos.`}</h3>
      </div>
    )
  }

  return (
    <div className={`${style.pointCounter} c-muted-1 db tc`}>
      <div className={style.pointCounterContainer}>
        <Coins className={style.coinsPointCounter} />
        <div className={style.pointsPointCounter}>
          {points}
        </div>
      </div>
    </div>
  )
}

export default PointCounter
