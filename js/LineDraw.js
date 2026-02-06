const path = document.getElementById('Line');
const length = path.getTotalLength();
 
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
 
path.getBoundingClientRect();
 
path.style.animation = 'draw-line 10s linear forwards';