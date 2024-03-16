import { useState,  useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Newcard   from "./componentes/Newcard.jsx";
import Card   from "./componentes/Card.jsx";


function App() {
// minha nova  nota
const data = new Date();
const opcoes = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);

// nota modelo de obejto
let nota = {
  id: crypto.randomUUID(),
  date: dataFormatada,
  content: 'If a selection would contain part of the element, he content of the element shall be selected atomically: If a selection would contain part of the element, The content of the element shall be selected atomically: If a selection would contain part of the element, then the selection must contain the entire element including all its descendants. If a double-click or context-click occurred in sub-elements, the highest ancestor with this value will be selected.'
}

// uso de estado em react para modal para nova nota
const [closeMoldal, setCloseModal] = useState('modal-hidden')

function closeModal() {
  if(closeMoldal == 'modal-hidden'){
    setCloseModal('modal')
    document.documentElement.style.overflow = 'hidden';
    document.querySelector('textarea').value = ' ';
    
  }else{
    setCloseModal('modal-hidden')
    // https://horadecodar.com.br/como-desabilitar-o-scroll-de-uma-pagina-web-com-javascript/
    document.documentElement.style.overflow = 'auto';
  }
}

// uso de estado em react para modal para salvar conteudo notas

// todas as notas do localmente

const [notasValor, setNotasValores] = useState(()=>{
  var temNotas = localStorage.getItem("notas");
  if(temNotas){
   return JSON.parse(localStorage.getItem("notas")) 
  }else{
   return [ ]
}})

// atualização de todas as notas do localmente

setTimeout(() => {
  setNotasValores( JSON.parse(localStorage.getItem("notas")) )
}, 1000);


function salvarNota(){
  if(!localStorage.getItem("notas")){
    localStorage.setItem("notas", JSON.stringify([notaUser, ... notasValor]));
    setNotasValores(JSON.parse(localStorage.getItem("notas")))
  }else{
    
   localStorage.setItem("notas", JSON.stringify([notaUser, ... notasValor]));
   setNotasValores(JSON.parse(localStorage.getItem("notas")))
  }

  closeModal()
}

// nota do usuario atual
const [notaUser, setNotaUser] = useState([])

function valorNotas(event) {
  let nota = {
    id: crypto.randomUUID(),
    date: dataFormatada,
    content: event.target.value 
  }
  setNotaUser(nota);
  
}

// nota do usuario exluir



  return (
      <div className='box_contener'>
        <header>
            <img src="https://gist.githubusercontent.com/maykbrito/f47569e32fb2b21f2ecc9f4c035c141f/raw/a45997404564112d7596fbb1b9cad5de5521927e/logo.svg"
                alt="Logo da NLW"/>
            <input type='text' placeholder='Busque em suas notas...'></input>
        </header>
        <main>
          <Newcard evento={closeModal}/>
          {notasValor.map((nota)=>{
          return (
           <Card key={nota.id} date={nota.date} content={nota.content} excluir={nota.id} dados={notaUser}/> 
          ) 
          })}
        </main>
        <div className={closeMoldal == 'modal' ? 'modal' : 'modal-hidden'}>
          <div className='modal_close'>
            <button 
            onClick={closeModal} 
            className='cancelar'
            >
              Cancelar nota
            </button>
            <button  
            onClick={closeModal} 
            className='sair'
            >
              x
            </button>
          </div>
          <textarea 
          onChange={valorNotas}
          type='text'
          >
          </textarea>
          <div className='modal_salve' >
            <button 
            onClick={salvarNota}  
            >
              Salvar nota
            </button>
          </div>
        </div>
      </div>
  )
}

export default App
