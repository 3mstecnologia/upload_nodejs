import Router from 'next/router';
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies } from "nookies";
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      axios
        .get("http://10.88.1.219/recuperaUsuario", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setUser(res.data);
        });
    }
  }, []);
   
  
   async function signIn({ cpf, passwordEnviado }) {
    console.log("Entrada do func Sign",cpf, passwordEnviado);
    const {data} = await axios.post("http://10.88.1.219:3001/login", {
      cpf,
      passwordEnviado,
    },)
     if (data.error) {
       console.log("Erro no login",data.error);
       return {
         error: data.error,
       };
      }
     
     
    if (!!token) {
      Router.push("/login");
      };
    setCookie(undefined, "token", token, {
      maxAge: 60 * 60 * 12, // 12 hours
    });

    setUser(user);
    Router.push("/painel");
  }
    return (
      <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
        {children}
      </AuthContext.Provider>
    );
  
} // end AuthProvider
