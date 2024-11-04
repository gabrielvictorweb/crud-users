import { yupResolver } from "@hookform/resolvers/yup";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Logo from "@/assets/logo.svg";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import React from "react";
import { Button, Input, Loading } from "@/components";
import { useQueryClient } from "@tanstack/react-query";

export const SignIn = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido.")
      .required("Esse campo é obrigatório."),
    password: yup
      .string()
      .min(8, "Minimo de 8 caracteres.")
      .max(32, "Máximo de 32 caracteres.")
      .required("Senha é obrigatória."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const { loginMutation, user, isLoading, error, setError } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("yup");
    setError(null);

    await loginMutation.mutateAsync({
      username: data.email,
      password: data.password,
    });
  };

  React.useEffect(() => {
    toast(error, { type: "error", position: "top-left" });

    if (user) {
      queryClient.clear();
      navigate("/area-do-usuario/inicio");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full max-w-[400px] mx-auto">
        <Link to="/">
          <img
            className="max-w-[100px] mx-auto mb-12"
            title="Logotipo"
            alt="Logotipo"
            src={Logo}
          />
        </Link>
        <h1 className="my-4 font-semibold text-xl tracking-tight">
          Entre em sua conta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="E-mail"
            register={register}
            type="text"
            error={errors?.email?.message?.toString()}
          />
          <Input
            id="password"
            label="Senha"
            register={register}
            type="password"
            error={errors?.password?.message?.toString()}
          />

          <div className="mt-6 flex justify-end">
            <Button text="Entrar" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};
