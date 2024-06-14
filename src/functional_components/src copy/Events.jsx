function Events() {
    
    const animals = ['zebra', 'horse', 'koala', 'kangaroo','doraemon']

    const animal = ()=>{
        return animals[Math.trunc(Math.random()*6)]
    }

    function pickAnimal(){
        document.createElement('h1').write(animal())
    }

  return (
      <div>
        <h1>{animal()}</h1>
        <button onClick={pickAnimal}>choose animal</button>
      </div>
  )
}

export default Events