import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import Modal from 'react-modal';

const Usuarios = () => {

    const customStyles = {
        content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
    };

    const [modalIsOpen,setIsOpen] = React.useState(false);

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, event) =>{
        console.log(data)
        Axios.post('http://localhost:3001/usuadd', data )
        .then(()=>{
            console.log('Creado OK');
        });
        event.target.reset()
    };

    function openModal() {
        setIsOpen(true);
    }

    function userNuevo(){
      //  this.titulin='Crea usuario';
        openModal();
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }
 
    function closeModal(){
        setIsOpen(false);
    }
    return(
        <Fragment>
            <h2>Usuarios de la APP</h2>
            <button onClick={userNuevo}>Nuevo Usuario</button>
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Usuarios"
            >

            <div className='content form'>
                <div className='miModalTit'>
                    <div><h3>Actualiza usuario</h3></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
              
                <div>
                    <label htmlFor='us_nombre' className="form-control my-2">NOMBRE</label> 
                    <input type='text'  name ='us_nombre' placeholder='Nombre usuario'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_nombre?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor='us_email' className="form-control my-2">E-MAIL</label> 
                    <input type='text'  name ='us_email' placeholder='Email usuario'
                    className="form-control my-2"
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
                <div>
                <label htmlFor='us_direccion' >DIRECCION</label>
                    <input type='text'  name ='us_direccion' placeholder='Dirección'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_direccion?.message}
                    </span>
                </div>

                <div>
                    <label htmlFor='us_ciudad' >CIUDAD</label> 
                    <input type='text'  name ='us_ciudad' placeholder='Ciudad residencia'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo  obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_ciudad?.message}
                    </span>
                </div>

                <div>
                <label htmlFor='us_localidad' >LOCALIDAD</label> 
                    <input type='text'  name ='us_localidad' placeholder='Localidad'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_localidad?.message}
                    </span>
                </div>

                <div>
                <label htmlFor='us_barrio' >BARRIO</label> 
                    <input type='text'  name ='us_barrio' placeholder='Barrio o  zona'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_barrio?.message}
                    </span>
                </div>                                                
                <div>
                    <label htmlFor='us_tipoDoc' >TIPO DOC</label> 
                    <select name="us_tipoDoc" ref={register}>
                        <option value="C">Ced.Ciudadanía</option>
                        <option value="E">Ced.Extrangería</option>
                        <option value="N">Nit</option>
                        <option value="P">Pasaporte</option>
                    </select> 
                </div>

                <div>
                <label htmlFor='us_nroDoc' >NUMERO DOC</label> 
                <input type='text'  name ='us_nroDoc' placeholder='Número doumento'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_nroDoc?.message}
                    </span>
                </div>
            <div>
              <label htmlFor='us_telefono' >NRO CELULAR</label> 
              <input type='text'  name ='us_telefono' placeholder='Número teléfono'
                    className="form-control my-2"
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block md-2">
                        {errors?.us_telefono?.message}
                    </span>
            </div>
            <div>
              <label htmlFor='us_clave' >CONTRASEÑA</label> 
              <input type='password'  name ='us_clave' placeholder='Contraseña de acceso'
                  className="form-control my-2"
                  ref={
                      register({
                          required:{value:true, message:'Campo obligatorio'}
                      })
                  }
                  /> 
                  <span className="text-danger text-smalld-block md-2">
                      {errors?.us_telefono?.message}
                  </span>         
                </div>
                <div>
                    <label htmlFor='us_nivel' >TIPO USUARIO</label> 
                    <select name="us_nivel" ref={register}>
                        <option value="C">Consultas</option>
                        <option value="A">Administrador</option>
                        <option value="S">Superior</option>
                    </select> 
                </div>
                <div>
                <label htmlFor='us_estado' >ESTADO</label> 
                <input type='radio' ref={register} name='us_estado' value='A'
                />ACTIVO 
                <input type='radio'ref={register} name='us_estado' value='I'
                    />INACTIVO
                </div>

                <br/>           
                <button>Enviar</button>
                <button onClick={closeModal}>Anula</button>
                <div  style={{visibility : "hidden" }}>
                    <input type='text'  name ='id' defaultValue = '0' 
                    ref={ register({value:0})}/>
                    <input type='text'  name ='us_idempresa' defaultValue='1'
                     ref={ register({value:1})}  />
   
                </div> 
            </form>
            </div>
            </Modal>
        </Fragment>
    )
}

export default Usuarios;