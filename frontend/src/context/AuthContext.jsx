import Router from 'next/router';
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies } from "nookies";

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
    const {data:{token, user}} = await axios.post("http://10.88.1.219:3001/login", {
      cpf,
      passwordEnviado,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    
     
    if (!token) {
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
