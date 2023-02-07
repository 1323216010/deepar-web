import { DeepAR } from 'deepar';
import deeparWasm from 'deepar/wasm/deepar.wasm';
import faceTrackingModel from 'deepar/models/face/models-68-extreme.bin';
import segmentationModel from 'deepar/models/segmentation/segmentation-160x160-opt.bin';


const canvas = document.getElementById('deepar-canvas');
const deepAR = new DeepAR({
  licenseKey: 'e7354dce189b6f111ce2d13d93e484a78b25001e569db34d5b3cfc185cebddc0e0edc228d207230b',
  canvas: canvas,
  deeparWasmPath: deeparWasm,
  callbacks: {
    onInitialize: () => {
      deepAR.startVideo(true);
    },
  },
  segmentationConfig: {
    modelPath: segmentationModel,
  },
});

deepAR.downloadFaceTrackingModel(faceTrackingModel);

const effects = [
  './effects/test.deepar',
  './effects/MakeupLook.deepar',
  './effects/Ping_Pong.deepar',
  './effects/galaxy_background.deepar',
];
let currentEffectIdx = -1;
const btn = document.getElementById('button');
btn.addEventListener('click', () => {
  currentEffectIdx = (currentEffectIdx + 1) % effects.length;
  const effect = effects[currentEffectIdx];
  deepAR.switchEffect(0, 'slot', effect);
});
