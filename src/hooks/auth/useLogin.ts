import { authService } from "../../services";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password);
    if (user) {
      localStorage.setItem("accessToken", user.accessToken);
    }
    return user;
  };

  return { login };
};
