import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";

export function FormSignUp() {
  const navigate = useNavigate();

  type InputTypes = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputTypes>();

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <h1>Crie sua Conta</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>
            Nome:
            <input
              type="text"
              placeholder="Digite seu nome"
              {...register("name", {
                required: "campo obrigatório!",
              })}
            />
          </label>
          <span className="inputError">{errors.name?.message}</span>
        </section>
        <section>
          <label>
            Email:
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              {...register("email", {
                required: "campo obrigatório!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "endereço de email invalido!",
                },
              })}
            />
          </label>
          <span className="inputError">{errors.email?.message}</span>
        </section>

        <section>
          <label>
            Senha:
            <input
              type="password"
              placeholder="Mínimo de 7 caracteres"
              {...register("password", {
                required: "campo obrigatório!",
                minLength: {
                  value: 7,
                  message: "A senha deve ter no mínimo 7 dígitos",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?,./\\[\]-]).+$/,
                  message:
                    "A senha deve ter número, letra maiúscula e caractere especial",
                },
              })}
            />
          </label>
          <span className="inputError">{errors.password?.message}</span>
        </section>

        <Button title="Finalizar" loading={false} variant="secondary"/>
      </form>

      <span className="messageChangePage">já tem uma conta? </span>
      <button className="buttonChangePage" onClick={() => navigate("/")}>
        Registrar
      </button>
    </Container>
  );
}
