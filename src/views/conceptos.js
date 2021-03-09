import React, {Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import Modal from 'react-modal';

const Conceptos = () => {

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
        Axios.post('http://localhost:3001/updateConceptos', data )
        .then(()=>{
            console.log(data)
        .catch((err) => console.error(err));
        event.target.reset()
    })
        }

    function openModal() {
        setIsOpen(true);
    }

    function userNuevo(){
        openModal();
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }
 
    function closeModal(){
        setIsOpen(false);
    }

    var [datos, setDatos] = useState([]);

    useEffect( () => {
        const result = Axios.get('http://localhost:3001/listCp')
        .then(response => {
     
        setDatos(result.data);
            alert(datos);
      })
    })

    //   axios.get('/tiplist', {})
    //   .then(response => {
    //     this.datos=response.data; 
    //     this.creaPaginacion();
    //   }).catch(e => {
    //       console.log(e);
    //   })

    return(
        <Fragment>
   
            <h2>Conceptos de cobro</h2>
            <button onClick={userNuevo}>Nuevo Concepto</button>
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Conceptos"
            >
            <div className='content form'>
                <div className='miModalTit'>
                    <div><h3>Actualiza Concepto</h3></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
             
                <div>
                    <label htmlFor='cp_titulo' className="formControl">NOMBRE</label> 
                    <input type='text'  name ='cp_titulo' placeholder='Nombre concepto'
                    className="form-control"
                    ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })}
                    /> 
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_titulo?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor='cp_descripcion' className="form-control">DETALLE</label> 
                    <textarea  name ='cp_descripcion' placeholder='Descripción'
                    className="form-control" cols='70' rows='4'
                    ref={
                        register({
                            required:{value:true, message:'Campo obligatorio'}
                        })
                    }
                    /> 
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_descripcion?.message}
                    </span>
                </div>
                 
                <div>
                    <label htmlFor='cp_periodoDesde' className="form-control">PERIODO INICIAL</label> 
                    <input type='text'  name ='cp_periodoDesde' placeholder='formato año mes, aaaamm'
                    className="form-control"
                    ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })}
                    />
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_periodoDesde?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor='cp_periodoHasta' className="form-control">PERIODO FINAL</label> 
                    <input type='text'  name ='cp_periodoHasta' placeholder='formato año mes, aaaamm'
                    className="form-control"
                    ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })}
                    />
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_periodoHasta?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor='cp_periodoActual' className="form-control">PERIODO ACTUAL</label> 
                    <input type='text'  name ='cp_periodoActual' placeholder='formato año mes, aaaamm'
                    className="form-control"
                    ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })}
                    />
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_periodoActual?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor='cp_valorCobro' className="form-control">VALOR A COBRAR</label> 
                    <input type='text'  name ='cp_valorCobro' placeholder='Valor del concepto' className="form-control"
                    ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })}
                    />
                    <span className="text-danger text-smalld-block">
                        {errors?.cp_valorCobro?.message}
                    </span>
                </div>                
                    
                <div>
                    <label htmlFor='cp_estado' >ESTADO</label> 
                    <input type='radio' ref={register} name='cp_estado' value='A' 
                    />ACTIVO 
                    <input type='radio'ref={register} name='cp_estado' value='I'
                    />INACTIVO
                </div>
                <div  style={{visibility : "hidden" }}>
                    <input type='text'  name ='id' defaultValue = '0' 
                    ref={ register({value:0})}/>
                    <input type='text'  name ='cp_idEmpresa' defaultValue='1'
                     ref={ register({})}  />     
                </div>  
                <br/>           
                <button className="btn btn-primary">Enviar</button>
                <button onClick={closeModal}>Anula</button>

            </form>
            </div>
            </Modal>
        </Fragment>
    )
}

export default Conceptos;