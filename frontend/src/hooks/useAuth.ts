import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { signIn } from "@/services/auth";
import secureLS from "@/contants/secure";
import { getMe } from "@/services/user";
import { ApiError } from "@/services/api/api.types";
import { MeProps } from "@/services/user/user.types";
import { AxiosError } from "axios";
import { SignInProps } from "@/services/auth/auth.types";

export const isLoggedIn = () => {
  return !!secureLS.get("access_token");
};

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<MeProps, ApiError>({
    queryKey: ["currentUser"],
    queryFn: () => getMe(),
    enabled: isLoggedIn(),
    retry(_failureCount, error) {
      if (error.status === 401) {
        logout();
        return false;
      }
      return true;
    },
  });

  const doSignIn = async (body: SignInProps) => {
    const response = await signIn(body);
    secureLS.set("access_token", response.data.access_token);
  };

  const loginMutation = useMutation({
    mutationFn: doSignIn,
    onSuccess: () => {
      window.location.href = "/area-do-usuario/inicio";
    },
    onError: (err: AxiosError) => {
      if (err.request.status === 401) {
        setError("Usuário/Senha Incorretos");
        return;
      }

      const responseData = JSON.parse(err.request.response);
      setError(responseData.message ?? err.message);
    },
  });

  const logout = () => {
    secureLS.remove("access_token");
    queryClient.clear();

    window.location.href = "/";
  };

  const isAdmin = user?.role === "ADMIN";

  return {
    loginMutation,
    logout,
    user: user,
    isLoading: isLoading,
    error,
    isAdmin,
    setError,
    resetError: () => {
      setError(null);
    },
  };
};

export default useAuth;
