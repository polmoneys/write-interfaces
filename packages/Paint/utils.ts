function mapPoints(el, boundary, spaceX = 0, spaceY = 0) {
    let rect;
    if ('current' in el) {
        rect = el.current.getBoundingClientRect();
    } else {
        rect = el.getBoundingClientRect();
    }
    const offsetWidth = Math.round(rect.width / 2);
    const offsetHeight = Math.round(rect.height / 2);
    return [Math.round(rect.left + offsetWidth - boundary.x) - spaceX, Math.round(rect.top + offsetHeight - boundary.y) - spaceY];
}

function matchRefsToPoints(refs, boundary, spaceX, spaceY) {
    const points = refs.map((p) => mapPoints(p, boundary, spaceX, spaceY));
    return new Promise((resolveIt) => resolveIt(points));
}

export { matchRefsToPoints };
