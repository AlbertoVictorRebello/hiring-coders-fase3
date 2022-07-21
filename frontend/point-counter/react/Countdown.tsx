import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { useFullSession } from 'vtex.session-client'
import { Spinner } from 'vtex.styleguide'

const CSS_HANDLES = ['countdown']

function Countdown() {
  const { loading, data, error } = useFullSession()
  const [points, setPoints] = useState([])
  const [getDataError, setGetDataError] = useState(false)
  const getData = data as any
  const email = getData?.session?.namespaces?.profile?.email?.value

  useEffect(() => {
    axios
      .get(`/_v/bonus/${email}`)
      .then(function (response) {
        setPoints(response.data.Item.saldo)
      })
      .catch(function () {
        setGetDataError(true)
      })
  }, [])

  const handles = useCssHandles(CSS_HANDLES)
  if (loading && !email) {
    return (
      <div className={`${handles.countdown} c-muted-1 db tc`}>
        <Spinner />
        <h3>{`Carregando seus pontos!`} </h3>
      </div>
    )
  }

  if (!email || error) {
    return (
      <div className={`${handles.countdown} c-muted-1 db tc`}>
        <h3>{`Faça login para ver seus pontos.`}</h3>
      </div>
    )
  }

  if (getDataError) {
    return (
      <div className={`${handles.countdown} c-muted-1 db tc`}>
        <h3>{`Ops, algo deu errado, atualize a página.`}</h3>
      </div>
    )
  }
  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      <h3>{`Você tem ${points} pontos, bora acumular mais?`}</h3>
    </div>
  )
}

export default Countdown
