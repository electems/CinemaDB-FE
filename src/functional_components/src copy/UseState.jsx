import { useState } from "react"

function UseState() {

    const animals = ['zebra', 'horse', 'koala', 'kangaroo', 'doraemon']

    const animal = () => {
        return animals[Math.trunc(Math.random()*6)]
    }
    let [creature , setCreature] = useState(animal())

    function pickAnimal() {
        setCreature(animal())
    }

  return (
    <div>
        <h1>{creature}</h1>
        <button onClick={pickAnimal}>change animal</button>
    </div>
  )
}

export default UseState