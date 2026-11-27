function criarCirculoEmPartes(centroX, centroY, raio, partes, cor, chanceDaCor) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");

    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);

    svg.appendChild(circle);

    let cx = centroX;
    let cy = centroY;
    let r = raio;
    let qtd = partes;

    let angulo = 360 / qtd;

    if (chanceDaCor) {
        let add = 0
        for (let x = 0; x < qtd; x++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            let rng = Math.floor(Math.random() * 6 + 1);
            path.classList.add('pedaco');
            if (rng > 2 || (x == qtd - 1 && add == 0)) {
                path.setAttribute('fill', cor)
                add++
            } else {
                path.setAttribute('fill', 'white')
            }

            path.setAttribute('d', `M${cx},${cy} \n
            L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
            A ${r},${r} 0,0,1 \n
            ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
            L${cx},${cy}`);
            svg.appendChild(path);
        }
    } else {
        for (let x = 0; x < qtd; x++) {
            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.setAttribute('d', `M${cx},${cy} \n
            L${cx + r * Math.cos((Math.PI * angulo / 180) * x)},${cy + r * Math.sin((Math.PI * angulo / 180) * x)} \n 
            A ${r},${r} 0,0,1 \n
            ${cx + r * Math.cos((Math.PI * angulo / 180) * (x + 1))},${cy + r * Math.sin((Math.PI * angulo / 180) * (x + 1))} \n
            L${cx},${cy}`);
            if (cor) {
                path.setAttribute('fill', cor);
            }
            svg.appendChild(path);
        }
    }


    return this.svg;
}