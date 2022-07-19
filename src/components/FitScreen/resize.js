export function centerFull({ width: pageWidth, height: pageHeight }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  document.body.style.width = `${pageWidth}px`;
  document.body.style.height = `${pageHeight}px`;

  const ratioX = screenWidth / pageWidth;
  const ratioY = screenHeight / pageHeight;

  document.body.style.transform = `scale(${ratioX}, ${ratioY})`;
  window.globalScale && window.globalScale.setScale(ratioX, ratioY);
}

export function equalRatioFull({ width: pageWidth, height: pageHeight }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  document.body.style.width = `${pageWidth}px`;
  document.body.style.height = `${pageHeight}px`;
  const ratioX = screenWidth / pageWidth;
  const ratioY = screenHeight / pageHeight;
  const scale = Math.min(ratioX, ratioY);
  let offsetX = 0;
  let offsetY = 0;
  if (ratioX < ratioY) {
    offsetY = (screenHeight / ratioX - pageHeight) / 2;
  } else {
    offsetX = (screenWidth / ratioY - pageWidth) / 2;
  }
  document.body.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
  window.globalScale && window.globalScale.setScale(scale, scale);
}

export function none({ width: pageWidth, height: pageHeight }) {
  document.body.style.width = `${pageWidth}px`;
  document.body.style.height = `${pageHeight}px`;
}
