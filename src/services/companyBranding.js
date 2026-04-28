const STORAGE_PREFIX = "vel:company:profile-image:v1:";
const MAX_INPUT_BYTES = 8 * 1024 * 1024;
const TARGET_SIZE = 280;
const OUTPUT_QUALITY = 0.85;

function normalizeCompanyId(companyId) {
  const normalized = String(companyId || "").trim();
  return normalized;
}

function getStorageKey(companyId) {
  const normalized = normalizeCompanyId(companyId);
  if (!normalized) {
    return null;
  }
  return `${STORAGE_PREFIX}${normalized}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Nao foi possivel ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Imagem invalida."));
    image.src = dataUrl;
  });
}

function drawSquareImage(sourceImage) {
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_SIZE;
  canvas.height = TARGET_SIZE;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Nao foi possivel processar a imagem.");
  }

  const sourceSize = Math.min(sourceImage.width, sourceImage.height);
  const sourceX = Math.floor((sourceImage.width - sourceSize) / 2);
  const sourceY = Math.floor((sourceImage.height - sourceSize) / 2);

  context.clearRect(0, 0, TARGET_SIZE, TARGET_SIZE);
  context.drawImage(
    sourceImage,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    TARGET_SIZE,
    TARGET_SIZE,
  );

  return canvas.toDataURL("image/jpeg", OUTPUT_QUALITY);
}

export function getCompanyProfileImage(companyId) {
  const key = getStorageKey(companyId);
  if (!key || typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(key);
}

export function setCompanyProfileImage(companyId, imageDataUrl) {
  const key = getStorageKey(companyId);
  if (!key || typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, imageDataUrl);
}

export function removeCompanyProfileImage(companyId) {
  const key = getStorageKey(companyId);
  if (!key || typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(key);
}

export async function prepareCompanyProfileImage(file) {
  if (!file) {
    throw new Error("Selecione uma imagem.");
  }
  if (!String(file.type || "").startsWith("image/")) {
    throw new Error("Arquivo invalido. Envie uma imagem.");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error("Imagem muito grande. Escolha um arquivo de ate 8 MB.");
  }

  const rawDataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(rawDataUrl);
  return drawSquareImage(image);
}
