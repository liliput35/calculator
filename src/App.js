import { useState } from 'react'


function App() {
  const [calc, setCalc] = useState('')
  const [result, setresult] = useState('')

  const ops = ['/', '*', '+', '-', '.']

  const updateCalc = value => {
    // if the last value is op and calc is nothing, or op and last is op  then return and do nothing
    if(
      ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))
    ){
      return;
    }
    setCalc(calc + value)

    //update result

    // if last item is not operator
    if (!ops.includes(value)){
      setresult(eval(calc + value).toString());
    }
  }

  const createDigits = () => {
    const digits = []; 

    for (let i = 1; i < 10; i++){
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>{i}</button>
      )
    }

    return digits
  }

  //by the time this happens calc is already updated and we just need to turn it into string
  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    if(calc == ''){
      return
    }
    else{
      const value = calc.slice(0, -1)

      setCalc(value)
    }
  }

  return (
    <div className="App">
     <div className="calculator">
       <div className="display">
         { result ? <span>({result})</span> : ''} {calc || '0'}
       </div>

       <div className="operators">
         <button onClick={() => updateCalc('/')}>/</button>
         <button onClick={() => updateCalc('*')}>*</button>
         <button onClick={() => updateCalc('+')}>+</button>
         <button onClick={() => updateCalc('-')}>-</button>

         <button onClick={deleteLast}>DEL</button>
       </div>

        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>

     </div>
    </div>
  );
}

export default App;
