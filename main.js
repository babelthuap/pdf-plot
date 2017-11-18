(() => {
'use strict';

function generatePdfPlot(weightFn, numBuckets) {
  let buckets = Array(numBuckets).fill(0);
  let step = 0.001 / numBuckets; // number of steps = 1,000 * numBuckets
  for (let r = 0; r < 1; r += step) {
    let b = Math.floor(weightFn(r) * numBuckets);
    buckets[b]++;
  }
  return buckets;
}

const $root = document.getElementById('root');

function render(f) {
  let start = performance.now();
  let arr = generatePdfPlot(f, window.innerWidth);
  let maxBucket = arr.reduce((a, b) => Math.max(a, b), 0);
  let heightFactor = window.innerHeight / maxBucket;
  let $plot = document.createElement('div');
  for (let b of arr) {
    let $b = document.createElement('div');
    $b.classList.add('b');
    $b.style.height = `${Math.round(b * heightFactor)}px`;
    $plot.appendChild($b);
  }
  $root.innerHTML = '';
  $root.appendChild($plot);
  window.scrollTo(0, 0);
  console.log(`${performance.now() - start} ms`);
}

function trigCurve(r) {
  return Math.acos(1 - 2 * r) / Math.PI;
}

function sharpCenter(r) {
  return (3.2 * r * r * r) - (4.8 * r * r) + (2.6 * r);
}

render(sharpCenter);
window.addEventListener('resize', () => render(sharpCenter), false);

})();
