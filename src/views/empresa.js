import React, {Fragment, useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import {Form } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import Axios from 'axios';


const Empresa = () => {

const {register, errors, handleSubmit} = useForm();

var [empresaDatos, setEmpresaDatos] = useState([]);

useEffect(()=>{
    Axios.get('http://localhost:3001/leeEmpresa')
    .then((response)=>{
console.log(response.data);
        setEmpresaDatos(response.data)
    })
},[])

const submitEmpresa = (data, event) =>{
  Axios.post('http://localhost:3001/updateOtros', data )
  .then(()=>{
      console.log(data.data)
      setEmpresaDatos(data.data)
  .catch((err) => console.error(err));
  })
  //event.target.reset()
  alert(empresaDatos.em_nombre)
}
return(      

    <Fragment>
        <h2>MI EMPRESA</h2>
        <Form.Group onSubmit={handleSubmit(submitEmpresa)}>
          <div>
             <Form.Group controlId="em_nombre">
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nombre Empresa" 
              ref={ register({})}/>
            </Form.Group>              
          </div>
          <div>
             <Form.Group controlId="em_direccion">
              <Form.Label>DIRECCION</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Dirección física Empresa" 
              ref={ register({})}/>
            </Form.Group>              
          </div>
          <div>
             <Form.Group controlId="em_localidad">
              <Form.Label>LOCALIDAD</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Localidad o ubicación" 
              ref={ register({})}/>
            </Form.Group>              
          </div>
          <div>
             <Form.Group controlId="em_barrio">
              <Form.Label>BARRIO</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Barrio o Zona" 
              ref={ register({})}/>
            </Form.Group>              
          </div>

          <div>
              <label htmlFor='em_ciudad' >CIUDAD</label> 
              <input type='text'  name ='em_ciudad' placeholder='Ciudad'
              className="form-control my-2"
              ref={
                  register({
                      required:{value:true, message:'Campo  obligatorio'}
                  })
              }
              /> 
              <span className="text-danger text-smalld-block md-2">
                  {errors?.em_ciudad?.message}
              </span>
          </div>
          <div>
              <label htmlFor='em_nit' >NIT</label> 
              <input type='text'  name ='em_nit' placeholder='Número identificación'
              className="form-control my-2"
              ref={
                  register({
                      required:{value:true, message:'Campo  obligatorio'}
                  })
              }
              /> 
              <span className="text-danger text-smalld-block md-2">
                  {errors?.em_nit?.message}
              </span>
          </div> 
          <div>
              <label htmlFor='em_telefono' >TLEFONOS</label> 
              <input type='text'  name ='em_telefono' placeholder='Número celular'
              className="form-control my-2"
              ref={
                  register({
                      required:{value:true, message:'Campo  obligatorio'}
                  })
              }
              /> 
              <span className="text-danger text-smalld-block md-2">
                  {errors?.em_telefono?.message}
              </span>
          </div> 
          <div>
          
        <Form.Group controlId="em_email">
            <Form.Label>E-MAIL</Form.Label>
            <Form.Control type="email" placeholder="Correo electrónico"
            ref={
                  register({ })
              } />
        </Form.Group>
        </div> 
          <div>
            <Form.Group controlId="em_observaciones">
                <Form.Label>OBSERVACIONS</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div> 
          <div>
              <Form.Group controlId="em_consecRcaja">
              <Form.Label>CONSECUTIVO R. CAJA</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Consecutivo R.Caja" />
              </Form.Group>
          </div>
          <div>
              <Form.Group controlId="em_consecEgreso">
              <Form.Label>CONSECUTIVO EGRESOS</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Consecutivo Egresos" />
              </Form.Group>
          </div>          
 
          <div>
                <Form.Group controlId="em_autentica">
                    <Form.Label>TIPO AUTENTICA</Form.Label>
                    <Form.Control as="select">
                        <option value="T">Nro Teléfono</option>
                        <option value="M">Correo Electrónico</option>
                        <option value="C">Documento identidad</option>
                    </Form.Control>
            </Form.Group>
            </div> 
            <div>
                <label htmlFor='em_estao' >ESTADO</label>

                <input type='radio' ref={register} name='em_estao' value='A'
                />ACTIVA
                <input type='radio'ref={register} name='em_estao' value='I'
                    />INACTIVA
                </div>  
                <Button variant="primary">Aceptar</Button>                                                     
        </Form.Group>


        <div  style={{visibility : "hidden" }}>
            <input type='text'  name ='id' defaultValue = '0' 
            ref={ register({value:0})}/>   
        </div> 

        <div>
        </div>
        </Fragment>
    )
}

export default Empresa;