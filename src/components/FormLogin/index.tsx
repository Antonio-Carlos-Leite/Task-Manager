import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";

export function FormLogin() {
  const navigate = useNavigate();

  type InputTypes = {
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
      <h1>Faça seu Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>
            Email
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
            Senha
            <input
              type="password"
              placeholder="Mínimo de 7 caracteres"
              {...register("password", {
                required: "campo obrigatório!",
                minLength: {
                  value: 7,
                  message: "A senha deve conter no mínimo de 7 caracteres",
                },
              })}
            />
          </label>
          <span className="inputError">{errors.password?.message}</span>
        </section>

        <Button title="Login" loading={false} />
      </form>

      <span className="messageChangePage">Não tem uma conta? </span>
      <button className="buttonChangePage" onClick={() => navigate("/signup")}>
        Registrar
      </button>
    </Container>
  );
}
