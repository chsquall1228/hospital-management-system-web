export const useLogout = () => {
  const logout = () => {
    sessionStorage.removeItem("accessToken");
  };

  return { logout };
};
