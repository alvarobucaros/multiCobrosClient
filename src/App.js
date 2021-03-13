import React, {useState} from 'react';
import { BrowserRouter as Router, Route,  Link} from 'react-router-dom';
import Usuarios from './views/usuarios';
import Conceptos from './views/conceptos';
import Emmpresa from './views/empresa';
import Pagos from './views/pagos';
import IngreGastos from './views/ingregastos';
import Login from './views/login';
import Otro from './views/otro';
import Test from './views/test';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [show, setShow] = useState(false);
  const [nomEmpresa, setNomEmpresa] = useState('TITULO EMPRESA')
  const [nomUsuario, setNomUsuario] = useState('USUARIO Y PERFIL')

  return (
     
    <Router>
      <ul className="container mb-1">

      {show ? (
        <div className="container">
        <li className="nav-container-items-mr-2"> 
        <Link to= '/'>Inicio</Link></li>
        </div>
        ):(
        <div>
          <div>
          <li className="nav-container--items-mr-1"> 
          <Link to= '/empresa'>Empresa</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/usuarios'>Usuarios</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/conceptos'>Conceptos</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/IngreGastos'>Otros ingresos y Gastos</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/Pagos'>Pagos</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/Otros'>OtroEjemplo</Link></li>
          <li className="nav-container-items-mr-1"> 
          <Link to= '/Test'>Test Ej</Link></li>
          </div> 
          <div className='section-tit'>
            <div>
              <span>{nomEmpresa}</span>
            </div>
            <div>
              <span>{nomUsuario}</span>
            </div>
          </div>         

        </div>
        )}
      </ul>
      <button
        type="button"
        onClick={() => {
          setShow(!show);
        }}
        
      >   pide user {show ? 'Si' : 'No'}
      </button>
      <div>
      <Route path='/' component={Login} />
      </div>
      <div>
      <Route path='/empresa' component={Emmpresa} />
      <Route path='/usuarios' component={Usuarios} />
      <Route path='/conceptos' component={Conceptos} />
      <Route path='/IngreGastos' component={IngreGastos} />
      <Route path='/Pagos' component={Pagos} />
      <Route path='/Otros' component={Otro} />
      <Route path='/Test' component={Test} />
      </div>
    </Router>

  );

}
export default App;
