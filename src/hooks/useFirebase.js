
import { useState,useEffect } from "react"
import {initializeApp} from "firebase/app"
import {getDatabase,ref,set,get,child,onChildChanged} from "firebase/database"
import { useDispatch, useSelector } from "react-redux"
export default function useFirebase() {


    const [currentValues,setCurrentValues] = useState({r:0,g:0,b:0})

    //Configuring fire base
    const firebaseConfig = {
        apiKey: "AIzaSyD7uVQoXLkp33vhfGZgI5spG7msjjLOA6Y",
        authDomain: "smart-room-ce0c7.firebaseapp.com",
        databaseURL:"https://smart-room-ce0c7-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "smart-room-ce0c7",
        storageBucket: "smart-room-ce0c7.appspot.com",
        messagingSenderId: "193999510189",
        appId: "1:193999510189:web:aeadc9c972a5035c0d8424",
        measurementId: "G-4WC6QTNCPK"
    }

    const fireBaseApp = initializeApp(firebaseConfig)
    const database = getDatabase(fireBaseApp)


    const dbRef = ref(database)
    const dispatch = useDispatch()

    


    useEffect(() => {
        get(child(dbRef,"colors/")).then(snapshot=>{
            if(snapshot.exists()){
                dispatch({type:"r",payload:snapshot.val().r})
                dispatch({type:"g",payload:snapshot.val().g})
                dispatch({type:"b",payload:snapshot.val().b})
            }else(console.log("No data available"))
        }).catch(error=>{
            console.error(error)
        })

        get(child(dbRef,"smooth/")).then(snapshot=>{
            if(snapshot.exists()){
                dispatch({type:"setSmooth",payload:snapshot.val()})
            }else(console.log("No data available"))
        }).catch(error=>{
            console.error(error)
        })


        onChildChanged(ref(database,"colors/"),data=>{
           dispatch({type:data.key,payload:data.val()})
        })

        onChildChanged(ref(database,"/"),data=>{
            if(data.key === "smooth"){
                dispatch({type:"toggle"})
            } 
         })
        
    }, []);

    const smooth = useSelector(state=>state.smooth)


    const setMode = (newColor) => {
        set(ref(database,"/colors/"),newColor)
    }
    const setSmooth = () => {
        console.log(smooth)
        set(ref(database,"/smooth/"),!smooth)
        
    }
    

    



    return({currentValues,setMode,setSmooth})

}
