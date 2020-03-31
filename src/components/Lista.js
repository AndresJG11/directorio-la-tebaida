import React, {Component} from 'react';
import firebase from 'firebase';
import './Lista.css'
import M from 'materialize-css'


class Lista extends Component{
	
	db = firebase.firestore();
	
	estiloFotos = {maxWidth:"100px", maxHeight:"100px", width:'100px', height:'100px', padding:'0px', margin:'0px'};

	textInput;

	clientes;

	removeAccents = (str) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	  } 
	
    constructor(props){
		super(props)
		this.state = {comerciante: [], search : false, search_criteria : ""};
		this.getComerciantes();
		this.handleChange = this.handleChange.bind(this);
    }

    getComerciantes(search = ""){
		 // Falta filtrar los datos que contengan this.state.search_criteria
        this.db.collection("comerciantes").get().then((querySnapshot) => {
			  var state = this.state.comerciante;
            querySnapshot.forEach((doc) => {
					state.push(doc.data());
            });
				 this.setState({comerciante: state });
				 this.clientes = this.state.comerciante;
 				 this.setState({search: false });
        });
    }

	handleChange = (event) => {
		this.setState({search_criteria: event.target.value});

		if(this.state.search_criteria.length >  1){
			var busqueda = this.state.search_criteria.toUpperCase(); 
			busqueda = this.removeAccents(busqueda)
			event.preventDefault();

			this.setState({search: true});

			let resultado = this.clientes.filter( area => ( this.removeAccents((area.categoria).toUpperCase()).includes(busqueda) || (this.removeAccents(area.establecimiento.toUpperCase())).includes(busqueda))  ) ;
			this.setState({comerciante: resultado})
		} else{
			this.setState({search: false});
			this.setState({comerciante: this.clientes})
		}
	}


    render(){
		
		let render;

		if (this.state.comerciante.length === 0 && this.state.search){
			render = <div> No se han obtenido resultados </div>
		}
		else if (this.state.comerciante.length === 0 && !this.state.search){
			render = <div> Cargando... Si tu conexion es lenta debes actualizar la página</div>
		}else if (this.state.comerciante.length > 0) {
        render = <div>
            <table>
					<thead>
						<tr>
							<th style={this.estiloFotos}> </th>
							<th scope="col">Nombre</th>
							<th scope="col">Categoría</th>
							<th scope="col">Celular <br/> Teléfono </th>
							{/*<th scope="col">Horario</th>*/}
							<th scope="col">Redes sociales</th>
						</tr>
					</thead>
                <tbody>
					 		{this.state.comerciante.map(area => (
								 <tr>
									<td style={this.estiloFotos, {justifyContent:'center', alignItems: 'center', padding:'0px', margin:'0px'}}><img src={area.foto} style={this.estiloFotos}/></td>
									<td data-label="Nombre">{area.establecimiento}</td>
									<td data-label="Categoría">{!area.categoria.length==0?area.categoria:"No disponible"}</td>
									<td data-label="Contacto">{area.celular} {!area.telefono.length==0?"-"+area.telefono:""}</td>
									{/*<td data-label="Horario"> No disponible </td>*/}
									<td data-label="Redes sociales">{!area.facebook.length==0?area.facebook:"Facebook No disponible"} <br/> {!area.whatsapp.length==0?area.whatsapp:"WhatsApp No disponible"}</td>
								 </tr>
							 ))}
                </tbody>
            </table>
        </div>
	  	}
		  return <div>
			  <div>
			 	<form >
				 	<input type="text" placeholder="Intenta buscar algo, por ejemplo Panaderia " value={this.state.value} onChange={this.handleChange} />
	{/*<button className="btn waves-effect waves-ligh  grey darken-1" > { !this.state.search? 'Buscar' : 'Todo' } </button>*/}
		  		</form>
			  </div>
			  <br/>
			{render}
		</div>
    }
}


export default Lista;
