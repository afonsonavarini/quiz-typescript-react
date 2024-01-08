import { useNavigate } from "react-router-dom";

export function useAppNavigation() {
  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  function navigateTo(path: string, dataToSend?: object) {
    navigate(path, { state: dataToSend});
}

  return { navigateBack, navigateTo };
}