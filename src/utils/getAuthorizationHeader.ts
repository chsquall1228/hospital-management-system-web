export function getAuthorizationHeader() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  return {
    Authorization: `Bearer ${accessToken || ""}`,
  };
}
