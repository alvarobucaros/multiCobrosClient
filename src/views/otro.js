import React, { Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Pagination from "react-paginate";
import Axios from 'axios';
import Modal from 'react-modal';
import '../App.css';

const MasOtros = () => {

    // formato de  la modal
    const customStylesOtro = {
        content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
    };
    const customStylesDelete = {
        content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
    };

    const btnRadioOtroEstado = [{id:'A',detalle:'Activo'},{id:'I',detalle:'Inactivo'}];
    const otroSelectF = [{id:'T',detalle:'Teléfono'},
                        {id:'E',detalle:'Email'},
                        {id:'C',detalle:'Cédula'}]

    // Registro de lectura y tabla principal y del select
    const {register, errors, handleSubmit} = useForm();
    const [otroDatos, setOtroDatos] = useState([]);
    const [offset, setOffset] = useState(0);
    const [cptosV, setCptosV] = useState([]);
    const [cptosF, setCptosF] = useState([]);
 
    const[codBorrado, setCodBorrado] = useState('');
    const[idBorrar, setIdBorrar] = useState(0);

    // Tabla principal valores iniciales
    var d = new Date();
    let hdate=fecha(d.toISOString());
    var [otroSelect, setOtroSelect] = useState({
        id:0,  otroCodigo:'', otroNombre:'', otroPassword:'', otroFecha:hdate,
        otroEmail:'', otroTexto:'', otroSelectF:'E', otroSelectV:'', otroEstado:'A'
    });

    // Validación
    const seleccionaOtro=(elemento, caso)=>{
        elemento.otroFecha = fecha(elemento.otroFecha)
        if (elemento.otroEstado===null || elemento.otroEstado===undefined ){elemento.otroEstado='A'}
        setOtroSelect(elemento);
        (caso === 'Editar')&&setIsOpen(true)
    }

    // metdos de la Modal general y delete
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [modalDeleteIsOpen,setDeleteIsOpen] = React.useState(false);
 
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal(){
        setIsOpen(false);
    }

    function openModalDelete() {
        setDeleteIsOpen(true);
    }

    function closeModalDelete(){
        setDeleteIsOpen(false);
    }

    // Fecha de ISO a amd
    function fecha(fch){
        if (fch != null && fch !== undefined) {
           fch = fch.split("T")[0]
        }else{
            fch=new Date();
        }
        return fch;
    }

    //  Registro Nuevo valores iniciales
    function userNuevo(){
        var d = new Date();
        let hdate=fecha(d.toISOString());
        otroSelect.id=0;
        otroSelect.otroCodigo='';
        otroSelect.otroNombre='';
        otroSelect.otroPassword='';
        otroSelect.otroTexto='';
        otroSelect.otroFecha=hdate;
        otroSelect.otroEmail='';otroSelect.otroTexto='';
        otroSelect.otroSelectF='E';
        otroSelect.otroSelectV='';
        otroSelect.otroEstado='A';
        openModal();
    }

    // botones de la tabla
    function cambiaRec(txt){
        openModal();
    }

    function changeEstado(estado){
        otroSelect.otroEstado = estado;
    }
    
    function confirmaBorraRec(txt){
        Axios.get('http://localhost:3001/deleteOtro:'+ idBorrar )
        .then( alert('Registro borrado'),
            response=>{           
            handlePageClick()
        .catch((err) => console.error(err));
        });
        remove(idBorrar)
        setDeleteIsOpen(false);
    }

    function borraRec(txt){
        let i = txt.id
        setCodBorrado(txt.otroCodigo+' '+txt.otroNombre);
        setIdBorrar(txt.id)
        openModalDelete();

    }
   
    // remueve de la lista traida de la base de datos
    const remove = (id) => {
        otroDatos.splice(otroDatos.findIndex(txt => txt.id === id), 1);
        setOtroDatos([...otroDatos]);
    };

    const handleChangeSelectF = (e) => {
        otroSelect.otroSelectF=e.target.value
    }

    const handleChangeSelectV = (e) => {
        otroSelect.otroSelectV=e.target.value
    }
    // va a actualizar la información
    const submitOtro = (data, event) =>{       
        Axios.post('http://localhost:3001/updateOtros', data )
        .then( alert('Información actualizada'),()=>{
            console.log(data)
        .catch((err) => console.error(err));
        })
        event.target.reset()
        remove(idBorrar)        
        setIsOpen(false);
    }

    const [pageCount, setPageCount] = useState(0)
    const recordPerPage = 8;
    const [ activePage, setCurrentPage ] = useState( 1 );

 // trae datos de la tabla principal
    useEffect(()=>{
        Axios.get('http://localhost:3001/leeotro')
        .then(res=>{
            var otroDatos = res.data
            const slice = otroDatos.slice(offset, offset + recordPerPage)
            const indexOfLastRec  = activePage * recordPerPage;
            const indexOfFirstRec = indexOfLastRec - recordPerPage;
            const currentRec     = otroDatos.slice( indexOfFirstRec, indexOfLastRec );
            setOtroDatos(slice)
            setPageCount(Math.ceil(otroDatos.length / recordPerPage))           
        })
    },[offset])

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

    //  Paginación

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        alert(selectedPage)
        setOffset(selectedPage + 1)
    };

    //  Parte principal: formulario y ventana modal
    return(      
        <Fragment>
            
            <div>
                <h2>OTRO EJEMPLO</h2>
                <button onClick={userNuevo}>Nuevo registro</button>
            <div>                
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false} 
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStylesOtro}
            contentLabel="Otros"
            >

            <div className='form'>
                <div className='content'>
                    <form className="form-horizontal" onSubmit={handleSubmit(submitOtro)}>
                        <div className='laModal'>
                            <div className='miModalTit'>
                                <h3>Actualiza otros</h3>
                            </div>
                        <div>
                            <label className='label'>Codigo</label>
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
                                { otroSelectF.map((txt, key) =>                
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
                            <label>Estado</label>
                            <input type="radio" name = 'otroEstado' defaultChecked={otroSelect.otroEstado === 'A'}
                            onChange={() => changeEstado('A')} ref={register()}
                            defaultValue={otroSelect.otroEstado='A'}  /> Activo
                            <input type="radio" name = 'otroEstado' defaultChecked={otroSelect.otroEstado === 'I'} 
                            onChange={() => changeEstado('I')} ref={register()}
                            defaultValue={otroSelect.otroEstado='I'}  /> Inactivo  
                        </div>

                        <div>
                            <button>Aceptar</button>
                            <button onClick={closeModal}>Anula</button>
                        </div>
                        <div  style={{visibility : "hidden" }}>
                            <input type='text'  name ='id' 
                            defaultValue={otroSelect.id}
                            ref={ register({value:0})}/>    
                        </div>
                    </div>
                    </form> 
                </div>
            </div>
        </Modal>     
 
        <Modal
            isOpen={modalDeleteIsOpen}
            ariaHideApp={false} 
            onRequestClose={closeModalDelete}
            style={customStylesDelete}
            >
            <div className='laModal'>
                <span>Quiere Borrar a {codBorrado}</span>
                <div className='tabla'>    
                    <button className='btn btn-sm btn-primary mr-2'onClick={confirmaBorraRec}>Si</button>
                    <button className='btn btn-sm btn-secondary' onClick={closeModalDelete}>No</button>
                </div>
            </div>
        </Modal>

            <div className="table-responsive tabla">
                <table className='table table-bordered table-hover table-sm'> 
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
                        {  otroDatos.map((txt, key) =>               
                        <tr key={txt.id}>
                            <td>{txt.id}</td>
                            <td>{txt.otroCodigo}</td> 
                            <td>{txt.otroNombre}</td>
                            <td>{fecha(txt.otroFecha)}</td>
                            <td>{txt.otroTexto}</td>
                            <td>{txt.otroEstado}</td>
                            <td>{txt.otroPassword}</td>
                            <td>{txt.otroSelectF}</td>
                            <td>{txt.otroSelectV}</td>
                            <td>{txt.otroEmail}</td>
                            <td><button onClick={() =>  seleccionaOtro(txt,'Editar')} className="btn btn-sm btn-primary ">Cambia</button></td>
                            <td><button onClick={() => borraRec(txt)} className="btn btn-sm btn-danger ">Anula</button></td>
                        </tr>                              
                        )}
                        </tbody>                 
                </table>
                {/* <div className="pagination">
                    <Pagination
                    activePage={ activePage }
                    itemsCountPerPage={ 6 }
                    totalItemsCount={ otroDatos.length }
                    pageRangeDisplayed={ 6 }
                    onChange={ handlePageChange }
                    /> */}
                    <div className="pagination">
                    <Pagination
                    previousLabel={"anterior"}
                    nextLabel={"siguiente"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={8}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>                    
                </div>
            </div>
        </div>
        </div>
    </Fragment>
    )
}

export default MasOtros;