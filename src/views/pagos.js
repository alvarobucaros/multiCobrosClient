import React, { Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import Modal from 'react-modal';

const Pagos = () => {

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

    const {register, errors, handleSubmit} = useForm();

    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function userNuevo(){
        openModal();
    }
    function afterOpenModal() {
        
    }

    function closeModal(){
        setIsOpen(false);
    }

    function cambiaRec(i){
       alert('cambia '+i)
    }
    
    function borraRec(i){
        alert('Borra '+i)
    }
    var [otroDatos, setOtroDatos] = useState([]);
    var [usuDatos, setUsuDatos] = useState([{id:'',us_nombre:''}]);
    var [cptosDatos, setCeptosDatos] = useState([]);

    const submitOtro = (data, event) =>{
        Axios.post('http://localhost:3001/updateOtros', data )
        .then(()=>{
            console.log(data)
        .catch((err) => console.error(err));
        })
        event.target.reset()
    }

    useEffect(()=>{
        Axios.get('http://localhost:3001/traeUsu')
        .then((response)=>{
console.log(response.data);
        setUsuDatos(response.data)
        setUsuDatos(response.data.map(usuarios => 
            <option key={usuarios.id}>{usuarios.us_nombre}</option>
        ));
        });

        Axios.get('http://localhost:3001/traeConceptos')
        .then((response)=>{
console.log(response.data);
        setCeptosDatos(response.data)
        });
    },[])


    return(      

        <Fragment>
            <h2>PAGO DE CONCEPTOS</h2>
            <button onClick={userNuevo}>Nuevo registro</button>
            <div>
                <label htmlFor='ig_tipo' >USUARIOS</label> 
                <select name = "pg_usuario" 
                   options={usuDatos}>
                {/* usuDatos.map(d => ({
                    "value" : d.id,
                       <div className="">
        <label htmlFor="coffee_beans_countries">Country</label>
            <Select id="country" name="coffee_beans[countries]" options={optionItems} />
        </div>
                    "label" : d.name
                    })) */}
                </select>
            </div>
            
            
            <div>
                    <label htmlFor='ig_tipo' >TIPO MOVIMIENTO</label> 
                    <select name="ig_tipo" >
                        <option value="I">Ingreso</option>
                        <option value="G">Gasto</option>
                        <option value="A">Saldo inicial</option>
                    </select> 
                </div>
            
            <div>
            
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false} 
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Otros"
            >

            <div className='content form'>
                <div className='miModalTit'>
                    <h3>Pago de concptos</h3>
                </div>
                <div className='laModal'>
                <form onSubmit={handleSubmit(submitOtro)}>
                    <div>
                        <label>Codigo</label>
                        <input type="text" name="otroCodigo"
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <div>
                        <label>Nombe</label>
                        <input type="text" name="otroNombre"
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <button>Sumit</button>
                    <button onClick={closeModal}>Anula</button>
                    <div  style={{visibility : "hidden" }}>
                        <input type='text'  name ='id' defaultValue = '0' 
                        ref={ register({value:0})}/>    
                    </div>
  
                </form> 
                </div>
            </div>
        </Modal>
        
            <div className='tabla'>
                <table> 
                    <thead>                        
                        <tr>
                            <th>#</th>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th colSpan='2'></th>
                        </tr> 
                    </thead>                                 
                    {otroDatos.map((txt) => {
                        return(
                        <tbody>
                            <tr key={txt.id}>
                                <td>{txt.id}</td>
                                <td>{txt.otroCodigo}</td>
                                <td>{txt.otroNombre}</td>
                                <td><button>Cambia</button></td>
                                <td><button>Anula</button></td>
                            </tr>
                        </tbody>
                        )
                        })
                    } 
                </table>
            </div>
        </div>
    </Fragment>
    )
}

export default Pagos;