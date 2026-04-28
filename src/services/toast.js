const TOAST_EVENT = "vel:toast";

function emitToast(message, type = "info") {
  if (!message) {
    return;
  }
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, type } }));
}

export function showToastInfo(message) {
  emitToast(message, "info");
}

export function showToastSuccess(message) {
  emitToast(message, "success");
}

export function showToastError(message) {
  emitToast(message, "error");
}

export { TOAST_EVENT };
