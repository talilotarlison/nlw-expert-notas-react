import styles from "./Card.module.css"
import { useState,  useEffect  } from 'react'


function Card(props) {


function excluirNota(){
   // console.log(props.excluir)
    var notas = JSON.parse(localStorage.getItem("notas")) 
    var excluirItem = notas.filter(nota=> nota.id != props.excluir )
    localStorage.setItem("notas", JSON.stringify(excluirItem));       
    // console.log(excluirItem)
    setCloseModal('modal_hidden')    
}


    
// uso de estado em react para modal para nova nota
const [closeMoldal, setCloseModal] = useState('modal_hidden')


function closeModalShow() {
  if(closeMoldal == 'modal_hidden'){
    setCloseModal('modal')
    document.documentElement.style.overflow = 'inherit';
    
  }else{
    setCloseModal('modal_hidden')
    // https://horadecodar.com.br/como-desabilitar-o-scroll-de-uma-pagina-web-com-javascript/
    document.documentElement.style.overflow = 'auto';
  }
}

// data modelo para minha nova  nota 
//    const data = new Date();
//   const opcoes = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//    const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);

    return (
        <>
            <button onClick={closeModalShow} className='nota' key={props.id}>
                <span> {props.date}</span>
                <p>{props.content}</p>
            </button>
            <div  className={closeMoldal == 'modal' ? styles.modal_show : styles.modal_hidden}>
                <div className={styles.modal_close}>
                    <p className={styles.data_nota}>
                        {props.date}
                    </p>
                    <button onClick={closeModalShow}
                        className={styles.sair}>x</button>
                </div>
                <div className={styles.textarea}
                     >{props.content}</div>
                <div className={styles.modal_excluir}>
                    <button onClick={excluirNota}>Excluir nota</button>
                </div>
            </div>

        </>
    )
}

export default Card