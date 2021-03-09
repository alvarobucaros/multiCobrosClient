import React, { Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Pagination from "react-js-pagination";
import Axios from 'axios';
import Modal from 'react-modal';

const MasOtros = () => {

    // formato de  la modal
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

    // Registro de lectura y tabla principal y del select
    const {register, errors, handleSubmit} = useForm();
    const [otroDatos, setOtroDatos] = useState([]);
    const [cptosV, setCptosV] = useState([]);
     const [cptosF, setCptosF] = useState([]);
     const fijo = [{id:'T',detalle:'Teléfono'},
                 {id:'E',detalle:'Email'},{id:'C',detalle:'Cédula'}]

    let today = new Date();
    let hdate=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    var [otroSelect, setOtroSelect] = useState({
        id:0,  otroCodigo:'', otroNombre:'', otroPassword:'', otroFecha:hdate,
        otroEmail:'', otroTexto:'', otroSelectF:'', otroSelectV:'', otroEstado:''
    });
    const seleccionaOtro=(elemento, caso)=>{
        setOtroSelect(elemento);
        (caso === 'Editar')&&setIsOpen(true)
    }
    // meetdos de la Modal
    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function userNuevo(){
        openModal();
    }
    function afterOpenModal() {
        let today = new Date();
        let hdate=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
     
        otroSelect.id = 0; otroSelect.otroCodigo=''; otroSelect.otroNombre=''; 
        otroSelect.otroFecha=hdate; otroSelect.otroTexto=''; otroSelect.otroEstado='A'; 
        otroSelect.otroPassword=''; otroSelect.otroSelectF=''; otroSelect.otroSelectV='';
        otroSelect.otroEmail=''
    }

    function closeModal(){
        setIsOpen(false);
    }

    // botones de la tabla
    function cambiaRec(txt){
        alert (txt.id+' '+txt.otroCodigo+' '+txt.otroNombre); 
        openModal();
    }
    
    function borraRec(txt){
     //   if( confirm ('Va aborrar a ' + i+ '?')){
    //  https://levelup.gitconnected.com/how-to-build-a-generic-reusable-synchronous-like-confirmation-dialog-in-react-js-71e32dfa495c
        let i = txt.id
        alert('borra '+txt.otroCodigo);

        Axios.get('http://localhost:3001/deleteOtro:'+ i )
        .then(response=>{
            alert('ya');
            handlePageChange()
        .catch((err) => console.error(err));
        });
        remove(i)
    }
   
    const remove = (id) => {
        otroDatos.splice(otroDatos.findIndex(txt => txt.id === id), 1);
        setOtroDatos([...otroDatos]);
    };

    const handleChangeSelectF = (e) => {
        otroSelect.otroSelectF=e.target.value
        alert(e.target.value)
    }

    const handleChangeSelectV = (e) => {
        otroSelect.otroSelectV=e.target.value
        alert(e.target.value)

    }
    // va a actualizar la información
    const submitOtro = (data, event) =>{
        alert(data.id)
        Axios.post('http://localhost:3001/updateOtros', data )
        .then(()=>{
            console.log(data)
        .catch((err) => console.error(err));
        })
        event.target.reset()
    }

 // trae datos de la tabla principal
    useEffect(()=>{
        Axios.get('http://localhost:3001/leeotro')
        .then((res)=>{
            var data = res.data
            setOtroDatos(data)
        })
    },[])

   // trae la lista dsplegable dinamica
    useEffect(()=>{
        Axios.get('http://localhost:3001/traeConceptos')
        .then((res)=>{
            var data=res.data
            const cp = data.map((txt, key) =>                
            <option key={txt.id} value={txt.id}>{txt.cp_descripcion}                   
            </option>                
            )
            setCptosV(cp);
        }) 
    },[])

    const todosPerPage = 8;
    const [ activePage, setCurrentPage ] = useState( 1 );
 
    // Logic for displaying current todos
    const indexOfLastTodo  = activePage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos     = otroDatos.slice( indexOfFirstTodo, indexOfLastTodo );
 
    const renderTodos = currentTodos.map( ( todo, index ) => {
       return <li key={ index }>{ todo }</li>;
    } );
 
    const handlePageChange = ( pageNumber ) => {
       console.log( `active page is ${ pageNumber }` );
       setCurrentPage( pageNumber )
    };

    return(      
        <Fragment>
            
            <div className='content'>
                <h2>OTRO EJEMPLO</h2>
                <button onClick={userNuevo}>Nuevo registro</button>
            <div>                
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false} 
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Otros"
            >

            <div className='form'>
                <div className='laModal'>
                   <form onSubmit={handleSubmit(submitOtro)}>
                    <div className='miModalTit'>
                        <h3>Actualiza otros</h3>
                    </div>
                    <div>
                        <label>Codigo</label>
                        <input type="text" defaultValue={otroSelect.otroCodigo}
                        name="otroCodigo" placeholder="contraseña obligatorio"
                ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <div>
                        <label>Nombe</label>
                        <input type="text" defaultValue={otroSelect.otroNombre} 
                        name="otroNombre" placeholder="contraseña obligatorio"
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="Password" defaultValue={otroSelect.otroPassword}
                                name = "otroPassword" placeholder="contraseña obligatorio"
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>                    
                    <div>
                        <label>Fecha</label> 
                        <input type="Date" defaultValue={otroSelect.otroFecha}
                         name="otroFecha" placeholder="AAAA/MM/DD" 
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <div>
                        <label>E-mail</label>
                        <input type="email"  defaultValue={otroSelect.otroEmail}
                        name = "otroEmail" placeholder="Correo electrónico" 
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>        
                    <div>
                        <label>Detalles</label>
                        <input type="textarea"  defaultValue={otroSelect.otroTexto}
                        name="otroTexto" rows={2} placeholder="Detalles" 
                        ref={register({
                            required:{value:true, message:'Campo obligatorio'}
                        })} />
                    </div>
                    <div>
                        <label>Lista Fija</label>
                        <select  name="otroSelectF"  defaultValue={otroSelect.otroSelectF}
                         onChange={e=>handleChangeSelectF(e)}                    
                            ref={register({
                                required:{value:true, message:'Campo obligatorio'}
                            })} >
                         {/* {cptosF}  */}
                         { fijo.map((txt, key) =>                
    <option  value={txt.id}>{txt.detalle}                   
     </option> ) }
                        </select>
                    </div>  
                    <div>
                        <label>Lista Variable</label>
                        <select  name="otroSelectV" defaultValue={otroSelect.otroSelectV}
                         onChange={handleChangeSelectV}                     
                            ref={register({
                                required:{value:true, message:'Campo obligatorio'}
                            })} >
                            {cptosV}
                        </select>
                    </div>
                    <div>                      
                        <div className='content'>
                            <label>Estado</label>
                            <div><input type="radio" defaultValue={otroSelect.otroEstado} name="otroEstado"                        ref={register({
                                required:{value:true, message:'Campo obligatorio'}
                            })} /> Activo</div>
                            <div><input type="radio" defaultValue={otroSelect.otroEstado} name="otroEstado"                        ref={register({
                                required:{value:true, message:'Campo obligatorio'}
                            })} /> Inactivo</div>
                        </div>
                    </div>
                    <button>Aceptar</button>
                    <button onClick={closeModal}>Anula</button>
                    <div  style={{visibility : "hidden" }}>
                        <input type='text'  name ='id' 
                         defaultValue={otroSelect.id}
                        ref={ register({value:0})}/>    
                    </div>
                </form> 
                </div>
            </div>
        </Modal>        
            <div>
                <table className='table table-bordered'> 
                    <thead>                        
                        <tr>
                            <th>#</th>
                            <th>CODIGO</th>
                            <th>DETALLE</th>
                            <th>FECHA</th>
                            <th>OBSERVACIONES</th>
                            <th>ESTADO</th>
                            <th>CONTRASEÑA</th>
                            <th>FIJO</th>
                            <th>VARIABLE</th>
                            <th>CORREO</th>
                            <th colSpan='2'>COMANDOS</th>
 
                        </tr> 
                    </thead>  
                        <tbody>                      
                            {/* {renderTodos} */}

                          {  otroDatos.map((txt, key) =>               
                    <tr key={txt.id}>
                        <td>{txt.id}</td>
                        <td>{txt.otroCodigo}</td> 
                        <td>{txt.otroNombre}</td>
                        <td>{txt.otroFecha}</td>
                        <td>{txt.otroTexto}</td>
                        <td>{txt.otroEstado}</td>
                        <td>{txt.otroSelectF}</td>
                        <td>{txt.otroSelectV}</td>
                        <td>{txt.otroEmail}</td>
                        <td><button onClick={() =>  seleccionaOtro(txt,'Editar')} className="btn btn-sm btn-primary ">Cambia</button></td>
                        <td><button onClick={() => borraRec(txt)} className="btn btn-sm btn-danger ">Anula</button></td>
                    </tr>                              
                )}
                        </tbody>                 
                </table>
                <div className="pagination">
                    <Pagination
                    activePage={ activePage }
                    itemsCountPerPage={ 8 }
                    totalItemsCount={ otroDatos.length }
                    pageRangeDisplayed={ 8 }
                    onChange={ handlePageChange }
                    />
                </div>
            </div>
        </div>
        </div>
    </Fragment>
    )
}

export default MasOtros;