import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged } from "firebase/auth";
import { useStoreNotes } from "./storeNotes";

export const useStoreAuth = defineStore('storeAuth',{
    state:()=>{
        return{
            user:{

            }
        }
    },
    actions:{
        init(){

            const storeNotes = useStoreNotes()
            onAuthStateChanged(auth,(user) =>{
                if(user)
                {
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/') // Page Transition
                    storeNotes.init()
                }
                else{
                    this.user = {}
                    this.router.replace('/auth') // Page Transition
                    storeNotes.clearNotes()
                }
            })
        },
        registerUser(credentials){
            createUserWithEmailAndPassword(auth,credentials.email,credentials.password).then((userCredentials)=>{
                const user = userCredentials.user
            }).catch((error)=>{
                const errorCode = error.code
                const errorMessage = error.message
            })
        },
        loginUser(credentials){
            signInWithEmailAndPassword(auth,credentials.email,credentials.password).then(()=>{

            }).catch((errore)=>{

            })
        },
        logoutUser(){
            signOut(auth).then(()=>{

            }).catch((error)=>{

            })
        },
    }
})