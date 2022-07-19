// //react/Countdown.tsx
// import React /*, {useState}*/ from 'react'
// // import { TimeSplit } from './typings/global'
// // import { tick, getTwoDaysFromNow } from './utils/time'
// import { useCssHandles } from 'vtex.css-handles'

// interface CountdownProps {
//   targetDate: string
// }

// // const DEFAULT_TARGET_DATE = getTwoDaysFromNow()
// const CSS_HANDLES = ['countdown']

// const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
//   // targetDate = DEFAULT_TARGET_DATE
// }) => {
//   // const [timeRemaining, setTime] = useState<TimeSplit>({
//   //   hours: '00',
//   //   minutes: '00',
//   //   seconds: '00'
//   // })

//   const handles = useCssHandles(CSS_HANDLES)

//   // tick(targetDate, setTime)

//   return (
//     <div className={`${handles.countdown} c-muted-1 db tc`}>
//       <h5>{ `Seus Pontos :${500}` }</h5>
//     </div>
//   )
// }

// Countdown.schema = {
//   title: 'editor.countdown.title',
//   description: 'editor.countdown.description',
//   type: 'object',
//   properties: {
//     targetDate: {
//       title: 'Data final',
//       description: 'Data final utilizada no contador',
//       type: 'string',
//       default: null,
//     },
//   },
// }

// export default Countdown


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['countdown']

function Countdown() {

  const [points, setPoints] = useState([])

  useEffect(() => {
    axios.get('https://www.randomnumberapi.com/api/v1.0/random')
      .then(function (response) {
        // handle success
        console.log(response);

        setPoints(response.data)


      })
      .catch(function (error) {
        // handle error
        console.log("Deu errado" + error);
      })
      .then(function () {
        // always executed
      });
  }, [])

  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      <h3>{`Você tem ${points} pontos, bora acumular mais?`}</h3>
    </div>

  )
}

export default Countdown