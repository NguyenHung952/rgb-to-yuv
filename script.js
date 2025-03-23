document.getElementById("generateMatrix").addEventListener("click", function () {
    let size = parseInt(document.getElementById("matrixSize").value);
    let matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";

    ['R', 'G', 'B'].forEach(color => {
        let title = document.createElement("h3");
        title.textContent = `Ma trận ${color}`;
        matrixInput.appendChild(title);
        
        let table = document.createElement("table");
        for (let i = 0; i < size; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                let cell = document.createElement("td");
                let input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.max = "255";
                input.value = "0";
                input.className = `${color.toLowerCase()}-matrix`;
                input.placeholder = color;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        matrixInput.appendChild(table);
    });
    document.getElementById("convertMatrixButton").style.display = "block";
});

document.getElementById("convertMatrixButton").addEventListener("click", function () {
    let matrixSize = parseInt(document.getElementById("matrixSize").value);
    let resultDiv = document.getElementById("matrixResult");
    resultDiv.innerHTML = "";
    let rValues = document.querySelectorAll(".r-matrix");
    let gValues = document.querySelectorAll(".g-matrix");
    let bValues = document.querySelectorAll(".b-matrix");
    
    if (rValues.length === 0 || gValues.length === 0 || bValues.length === 0) {
        alert("Vui lòng tạo ma trận trước khi chuyển đổi!");
        return;
    }
    
    ['Y', 'U', 'V'].forEach(component => {
        let title = document.createElement("h3");
        title.textContent = `Ma trận ${component}`;
        resultDiv.appendChild(title);
        
        let table = document.createElement("table");
        let index = 0;
        for (let i = 0; i < matrixSize; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < matrixSize; j++) {
                let r = parseInt(rValues[index]?.value || 0);
                let g = parseInt(gValues[index]?.value || 0);
                let b = parseInt(bValues[index]?.value || 0);
                let y = 0.299 * r + 0.587 * g + 0.114 * b;
                let u = 0.492 * (b - y);
                let v = 0.877 * (r - y);
                let value = component === 'Y' ? y : component === 'U' ? u : v;
                let cell = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.value = value.toFixed(2);
                input.readOnly = true;
                cell.appendChild(input);
                row.appendChild(cell);
                index++;
            }
            table.appendChild(row);
        }
        resultDiv.appendChild(table);
    });
});
