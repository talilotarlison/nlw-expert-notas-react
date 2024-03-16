function Newcard(props){
    return(
    <button className='nova-nota' onClick={props.evento}>
        <span> Adicionar nota</span>
        <p>Grave uma nota de audio que sera convertida para texto automaticamente</p>
    </button>
    )
}

export default Newcard