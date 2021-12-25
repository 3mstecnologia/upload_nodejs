import Head from "next/head";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    console.log("dados de entrada do handleSingin", data);
    await signIn(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="form-group">
          <input
            {...register("cpf")}
            type="text"
            name="cpf"
            placeholder="CPF"
          />

          <input
            {...register("passwordEnviado")}
            type="passwordEnviado"
            name="passwordEnviado"
            placeholder="Senha"
          />
        </div>

        <div className="form-group">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}
