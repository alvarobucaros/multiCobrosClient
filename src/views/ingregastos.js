import React from 'react';
import { Form } from 'reactstrap'


const IngreGastos = () => {

    function registroNuevo(){
        
    }

    return(
        <Form>
            <h2>Usuarios de la APP</h2>
            <button onClick={registroNuevo}>Nuevo Registro</button>

            <div className='content form'>
                <div className='miModalTit'>
                    <div><h3>Ingresos y Gastos</h3></div>
                </div>
                <form >
              

                                                 
                <div>
                    <label htmlFor='ig_tipo' >TIPO MOVIMIENTO</label> 
                    <select name="ig_tipo" >
                        <option value="I">Ingreso</option>
                        <option value="G">Gasto</option>
                        <option value="A">Saldo inicial</option>
                    </select> 
                </div>



 

                <br/>           
                <button>Enviar</button>

            </form>
            </div>
        
        </Form>
    )    
}
export default IngreGastos;