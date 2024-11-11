import { useState, useCallback,useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
const passworddref=useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

 const copypass=useCallback(()=>{
  passworddref.current?.select()
  window.navigator.clipboard.writeText(password)},[password])

  useEffect(()=>{
    PasswordGenerator()
  },[length,numberAllowed,charAllowed,PasswordGenerator])
  return (
    <>
<div className="main">
  <h1>Password Generator</h1>
 <div className="content">
  <input type="text" value={password} placeholder='Password'ref={passworddref} />
  <button className='copy' onClick={copypass}>Copy</button>
 </div>
  <div className="info">
    <div className="tom">
      <input type="range" min={8} max={50} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
      <label > Length:{length} </label>
    </div>
    <div className="check1">
      <input type="checkbox" id="numberinput" checked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}  />
      <label>Number</label>
    </div>
<div className="check2">
  <input type="checkbox" id='charinput' checked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} />
  <label htmlFor="">Character</label>
</div>
  </div>
</div>

    </>
  );
}

export default App;
