import Swal from "sweetalert2";

const errorColor = "red";
const successColor = "green";
const successIcon = "success";
const errorIcon = "warning";

const positionTop = "top";
const positionBottomRight = "bottom-right";
const positionTopRight = "top-right";

export function useToast() {
  const Toast = (color, position = positionTop) =>
    Swal.mixin({
      toast: true,
      position: position,
      iconColor: color,
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });

  function fireToast(color, icon, title, position = positionTop) {
    (async () => {
      await Toast(color, position).fire({
        icon: icon,
        title: title,
      });
    })();
  }

  function fireSuccessToast(title, position = positionTop) {
    fireToast(successColor, successIcon, title, position);
  }
  function fireErrorToast(title, position = positionTop) {
    fireToast(errorColor, errorIcon, title, position);
  }

  return {
    Toast,
    fireToast,
    errorColor,
    errorIcon,
    successIcon,
    successColor,
    fireErrorToast,
    fireSuccessToast,
    positionTopRight,
    positionBottomRight,
  };
}
