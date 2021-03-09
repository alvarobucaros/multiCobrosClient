import React, {Fragment} from 'react';
import { Form, FormGroup, Label, 
        Input, Button, Select} from 'reactstrap'
// import {useForm} from 'react-hook-form';
// import Axios from 'axios';
// import Modal from 'react-modal';

// id, ig_idEmpresa, ig_fecha, ig_tipo, ig_detalle, ig_numero, ig_documento, ig_idUsuario, ig_valor, ig_saldo


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