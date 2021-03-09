import React, { Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Pagination from "react-js-pagination";
import Axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader,
    Form, FormGroup, Label, Input, Button, Select} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

//import Heading from '../components/heading'        

//id, pr_codigo, pr_detalle, pr_fecha
const Test = () => {

// parametros de la modal
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

    // metodos de la Modal
    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function registroNuevo(){
        testSelect.id=0;
        testSelect.pr_codigo='';
        testSelect.pr_detalle='';
        testSelect.pr_fecha='01-01-2000'
    }

    function afterOpenModal() {
        // despues de abrir la modal
    }

    function closeModal(){
        setIsOpen(false);
    }

 // trae datos de la tabla principal

    const [testDatos, settestDatos] = useState([]);
    const [testSelect, setTestSelect] = useState({
        id:0,pr_codigo:'',pr_detalle:'',pr_fecha:new Date()
    });
    const seleccionaTest=(elemento, caso)=>{
        setTestSelect(elemento);
        (caso === 'Editar')&&setIsOpen(true)
    }


    useEffect(()=>{
        Axios.get('http://localhost:3001/leePrueba')
        .then((res)=>{
            var data = res.data
            // const dt = data.map((txt, key) =>               
            //         <tr key={txt.id}>
            //             <td>{txt.id}</td>
            //             <td>{txt.pr_codigo}</td> 
            //             <td>{txt.pr_detalle}</td>
            //             <td>{txt.pr_fecha}</td>
            //             <td><button onClick={() => cambiaRec(txt)} className="btn btn-sm btn-primary ">Cambia</button></td>
            //             <td><button onClick={() => borraRec(txt)} className="btn btn-sm btn-danger ">Anula</button></td>
            //         </tr>                              
            //     )
            settestDatos(data)
        })
    },[])

    // Actualiza la información
    const submitTest = (data, event) =>{
        alert('submit');      
        Axios.post('http://localhost:3001/updatePrueba', data )
        .then(()=>{
            console.log(data)
        .catch((err) => console.error(err));
        })
        event.target.reset()
    }



    
        // botones de la tabla
        function cambiaRec(txt){
            alert (txt.id+' '+txt.pr_codigo+' '+txt.pr_detalle+' '+txt.pr_fecha); 
            openModal();
        }    
        
        function borraRec(txt){
            let i = txt.id
            alert('borra '+txt.id);
            Axios.get('http://localhost:3001/deletePrueba:'+ i )
            .then(response=>{
                alert('ya');
                handlePageChange()
            .catch((err) => console.error(err));
            });
                remove(i)
        }

        const remove = (id) => {
            alert('borra del arreglo')
            testDatos.splice(testDatos.findIndex(txt => txt.id === id), 1);
            settestDatos([...testDatos]);
        };

 
        //  Paginacion
        const recordPerPage = 8;
        const [ activePage, setCurrentPage ] = useState( 1 );
     
        // Logic for displaying current todos
        const indexOfLastRec  = activePage * recordPerPage;
        const indexOfFirstRec = indexOfLastRec - recordPerPage;
        const currentRec     = testDatos.slice( indexOfFirstRec, indexOfLastRec );
     
        const renderTodos = currentRec.map( ( todo, index ) => {
           return <li key={ index }>{ todo }</li>;
        } );
     
        const handlePageChange = ( pageNumber ) => {
           console.log( `active page is ${ pageNumber }` );
           setCurrentPage( pageNumber )
        };

    return (
        <Fragment>
                       
                <h2>OTRO EJEMPLO</h2>
                <button onClick={registroNuevo}>Nuevo registro</button>
            
        <div>
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false} 
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Otros"
            >
 
            <Form onSubmit={submitTest}>
                <FormGroup>
                    <Label>Código</Label>
                    <Input type='text' name='pr_codigo' placeholder='Digite código'
                    value = {testSelect.pr_codigo}> </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Detalle</Label>
                    <Input  type='text' name='pr_detalle' placeholder='Digite detalle'
                    value = {testSelect.pr_detalle} ></Input>
                </FormGroup>  
                <FormGroup>
                    <Label>Fecha</Label>
                    <Input type='date' name='pr_fecha' placeholder='Digite fecha'
                    value = {testSelect.pr_fecha} ></Input>
                </FormGroup>  
                <ModalFooter>
                <Button type='submit' className='btn btn-primary'>Submit</Button> 
                <Button button onClick={() => closeModal()} className='btn btn-primary'>Cancel</Button>  
                 
                </ModalFooter> 
                <div  style={{visibility : "hidden" }}>
                        <input type='text'  name ='id' defaultValue = '0' 
                        value = {testSelect.id}></input>
                 </div>   
            </Form>
            </Modal>
        </div>
        <div className='tabla'>
            <table className='table table-bordered'> 
                <thead>                        
                    <tr>
                        <th>#</th>
                        <th style={{ width: '30%' }}>CODIGO</th>
                        <th style={{ width: '50%' }}>DETALLE</th>
                        <th style={{ width: '30%' }}>FECHA</th>
                        <th colSpan='2'>COMANDOS</th>
                    </tr> 
                </thead>  
                <tbody>                      
                    {
                    testDatos.map(txt =>                                      
                    <tr key={txt.id}>
                        <td>{txt.id}</td>
                        <td>{txt.pr_codigo}</td> 
                        <td>{txt.pr_detalle}</td>
                        <td>{txt.pr_fecha.substring(0,10)}</td>
                        <td><button onClick={() => seleccionaTest(txt,'Editar')} className="btn btn-sm btn-primary ">Cambia</button></td>
                        <td><button onClick={() => borraRec(txt,'Borrar')} className="btn btn-sm btn-danger ">Anula</button></td>
                    </tr>)
                    }
                </tbody>                 
            </table>
            <div className="pagination">
                <Pagination
                activePage={ activePage }
                itemsCountPerPage={ 8 }
                totalItemsCount={ testDatos.length }
                pageRangeDisplayed={ 8 }
                onChange={ handlePageChange }
                />
            </div>
        </div>
     </Fragment>
     
    )
}

export default Test
