import React, { useState } from 'react';

const TextInput = props => {
  const [data, setData] = useState(props);
  return (
    <div>
      <label>{data.label}</label>
      <input type="text" value={data.value} name={data.name} 
      placeholder={data.placeholder} onChange={event => console.log('cambiar por una funcion')}
       />
</div>      
  )}

export default TextInput;