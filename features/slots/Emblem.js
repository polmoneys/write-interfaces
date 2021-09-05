//https://github.com/GeorgeHastings/emblem

var Emblem = {
    init: function (el, str) {
        const text = str ? str : el.innerHTML;
        el.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            const letter = text[i];
            const span = document.createElement('span');
            const node = document.createTextNode(letter);
            const r = (360 / text.length) * i;
            const x = (Math.PI / text.length).toFixed(0) * i;
            const y = (Math.PI / text.length).toFixed(0) * i;
            span.appendChild(node);
            span.style.webkitTransform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
            span.style.transform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
            el.appendChild(span);
        }
    },
};

export default Emblem;
