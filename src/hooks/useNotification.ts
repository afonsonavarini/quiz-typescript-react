
export function useNotification() {

  function createNotification(message: string) {
    localStorage.setItem("notification", message);
  }

  function removeNotification() {
    localStorage.removeItem("notification");
  }

  function getNotification() {
    return localStorage.getItem("notification");
  }


  return { createNotification, removeNotification, getNotification };
}