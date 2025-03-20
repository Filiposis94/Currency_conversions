import React from "react";
import axios from 'axios'

function App() {

  const [settings, setSettings] = React.useState({
    amount:0,
    targetCurr: 'USD'
  })
  const [symbols, setSymbols] = React.useState([]);
  const [message, setMessage] = React.useState({
    isShown:false,
    text:''
  })  
  // EVENT HANDLERS
  const handleChange = (event)=>{
    const {name, value, type} = event.target;
    setSettings(prevSettings =>{
        return {...prevSettings,
            [name]:type === 'number' ? Number(value): value
        };
    });
  };
  const handleMessage = (message)=>{
    setMessage({
      isShown:true,
      text:message
    });
    setTimeout(()=>{
      setMessage({
        isShown:false,
        text:''
      })
    },10000);
  }

  const handleSubmit = async ()=>{
    try {
      const res = await axios.get(`/api/v1/exchange?amount=${settings.amount}&targetCurr=${settings.targetCurr}`);
      const {exchangedAmount, targetCurr} = res.data
      handleMessage(`Exchange succesfull. ${exchangedAmount}${targetCurr} added to your balance.`)
    } catch (error) {
      console.log(error);
      handleMessage(error.response.data.msg);
    };
  };
  // GET CURRENCY SYMBOLS
  React.useEffect(()=>{
    async function getSymbols(){
      try {
        const res = await axios.get('api/v1/exchange/symbols');
        setSymbols(res.data.symbols);
      } catch (error) {
        console.log(error);
      };
    };
    getSymbols();
  },[]);

  // POPULATE select option
  let options = [];
  if(symbols && Object.keys(symbols).length > 0){
    for(const property in symbols){
      if(property === 'EUR'){
        continue
      };
      options.push(<option key={property} value={property}>{property}</option>)
    }
  }
  const targetCurrInput = <select id="targetCurr" name="targetCurr" value={settings.targetCurr} onChange={handleChange}>{options}</select>;

  return (
    <div className="container">
      <h1>Currency exchanger</h1>
      <p>Choose the amount and the goal currency and exchange it:</p>
      <input type="number" name="amount" value={settings.amount} onChange={handleChange} required />
      <label htmlFor="amount"> EUR to </label>
      {targetCurrInput}
      <p><button className="btn-submit" onClick={handleSubmit}>Exchange</button></p>
      {message.isShown && <p>{message.text}</p>}
    </div>
    
  );
}

export default App;
