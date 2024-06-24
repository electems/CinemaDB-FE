import { useMemo, useState } from 'react'

const UseMemohook = () => {
  const [dark, setDark] = useState(false)
  const [number, setNumber] = useState(0)

  const doubleNumber = useMemo(() => {
    return slowfunction(number)
  }, [number])

  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }

  return (
      <>
          <input type='number' value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
          <button onClick={() => setDark(prevDark => !prevDark)}>change theme</button>
          <div style={themeStyles}>{doubleNumber }</div>
      </>
  )
}
function slowfunction (num) {
  console.log('calling slow function');
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}
export default UseMemohook;
