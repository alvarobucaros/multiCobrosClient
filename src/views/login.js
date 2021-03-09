import React, {Fragment,  useState} from 'react';
import {useForm} from 'react-hook-form';
import Axios from 'axios';

const Login = () => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, event) =>{  
            Axios.post('http://localhost:3001/autentica',data)
            .then((response)=>{

                if(response.data===null){
                    alert('Usuario no existe');
                }else
                if(response.data.er===0){
                    alert('Contraseña invalida');
                }else{                 
                    console.log(response.data)
                    alert(response.data.em_nombre+' '+response.data.us_nombre)
                }               
            })
        }

    return(
        <Fragment>
        {/* <div className='content form'>            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <label htmlFor='us_email' className="form-control col-sm-5">E-MAIL USUARIO</label> 
                    <input type='text'  name ='us_email' placeholder='Email usuario'
                    className="form-control col-sm-6"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_email?.message}
                    </span>
                </div>
                <div className='row'>
                    <label htmlFor='us_clave' className="form-control col-sm-5" >CONTRASEÑA</label> 
                    <input type='password'  name ='us_clave' placeholder='Contraseña de acceso'
                    className="form-control  col-sm-6"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_clave?.message}
                    </span>         
                </div>
                <br/>           
                <button className='btn btn-primary'>Enviar</button>                
            </form>
            </div> */}
        </Fragment>
    )

}

export default Login;