import React from 'react';
import Lista from './components/Lista.js';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import firebase from 'firebase'


var firebaseConfig = { 
apiKey: "AIzaSyD3rxBOENc_-Og_esmoVx-oYHlTIofwJqc",
authDomain: "directoriolatebaida.firebaseapp.com",
databaseURL: "https://directoriolatebaida.firebaseio.com",
projectId: "directoriolatebaida",
storageBucket: "directoriolatebaida.appspot.com",
messagingSenderId: "551593411291",
appId: "1:551593411291:web:d84b78af96a028af7f02fe",
measurementId: "G-BL6W8LGX60"}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

/*
  function RegistrarComerciante(data){
    db.collection("comerciantes").add(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }); 
  }
  */

  function RegistrarVisita(data){
    db.collection("visitas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let visitasActuales = doc.data().visitas;
          db.collection("visitas").doc("visitasSitio").update({visitas:parseInt(visitasActuales)+1})
          });
      });
  }


  var pruebaComerciante = {
    celular: "3105455930 - 3215130835",
    establecimiento: "Agroinsumos la 5ta",
    facebook: "",
    categoria: "Agroinsumos",
    foto: "https://2.bp.blogspot.com/-YiWi32Pbamo/W1djBdPn0uI/AAAAAAAATrM/BKuX5dAzIOQWpbL65ahXyC6YOfumUX7ZwCK4BGAYYCw/s1600/tulogoaquifooter.png",
    horario: "",
    telefono: "",
    whatsapp: ""
  }
  // RegistrarComerciante(pruebaComerciante);

  //RegistrarVisita();

function App() {
 
  return ( 
    <div className="App">
      <div className="card">
        <div className="card-content">
          <h1> Directorio La Tebaida </h1>
          <p className="flow-text"> Proyecto sin ánimo de lucro con el objetivo de facilitar el contacto entre usuarios y comerciantes de La Tebaida ante la emergencia sanitaria provocada por el covid-19 <span>¿Eres comerciante?</span> Haz que tu negocio aparezca aquí, contáctame  por medio de WhatsApp.  </p>
          <div>
          <blockquote>
            <p style={{fontWeight: "bold"}}> Desarrollado por: </p>  <i>Andrés Jiménez García </i>
            <p style={{fontWeight: "bold"}}> Contacto: </p>  <p>311 778 7283 </p>
          </blockquote>
          </div>
        </div>

        <div className="card deep-orange lighten-1">
          <div className="card-content center-align">
          <h5 style={{fontWeight: "bold"}}> La mejor forma de evitar el contagio es quedándote en casa</h5>
          </div>
        </div>
      </div>
      <h3> Establecimientos </h3>
      <div className="card">
        <div className="card-content">
          <Lista/>
        </div>
      </div>
    </div>
  );
}

export default App;
