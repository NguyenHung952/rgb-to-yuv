const WEIGHT_R = 0.299;
const WEIGHT_G = 0.587;
const WEIGHT_B = 0.114;
const U_DENOMINATOR = 2.03;
const V_DENOMINATOR = 1.14;

// Chỉ làm tròn ở bước hiển thị, không làm tròn trung gian.
function round2(value) {
    return Math.round((value + Math.sign(value) * Number.EPSILON) * 100) / 100;
}

function format2(value) {
    return round2(value).toFixed(2);
}

function calculateYUV(r, g, b) {
    // Theo công thức tài liệu: Y = 0.299R + 0.587G + 0.114B
    const y = WEIGHT_R * r + WEIGHT_G * g + WEIGHT_B * b;

    // Giữ phép chia gốc của tài liệu thay vì dùng hệ số 0.492/0.877 đã làm tròn.
    // U = (B - Y) / 2.03 ; V = (R - Y) / 1.14
    const u = (b - y) / U_DENOMINATOR;
    const v = (r - y) / V_DENOMINATOR;

    return { y, u, v };
}

document.getElementById("generateMatrix").addEventListener("click", function () {
    const size = Number(document.getElementById("matrixSize").value);
    const matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";

    if (!Number.isInteger(size) || size < 1 || size > 10) {
        alert("Kích thước ma trận phải là số nguyên từ 1 đến 10!");
        return;
    }

    ['R', 'G', 'B'].forEach(color => {
        const title = document.createElement("h3");
        title.textContent = `Ma trận ${color}`;
        matrixInput.appendChild(title);

        const table = document.createElement("table");
        for (let i = 0; i < size; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.max = "255";
                input.step = "1";
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
    const matrixSize = Number(document.getElementById("matrixSize").value);
    const resultDiv = document.getElementById("matrixResult");
    resultDiv.innerHTML = "";

    const rValues = document.querySelectorAll(".r-matrix");
    const gValues = document.querySelectorAll(".g-matrix");
    const bValues = document.querySelectorAll(".b-matrix");

    if (rValues.length === 0 || gValues.length === 0 || bValues.length === 0) {
        alert("Vui lòng tạo ma trận trước khi chuyển đổi!");
        return;
    }

    // Tính một lần cho mỗi pixel rồi dùng kết quả cho cả 3 ma trận.
    const yuvMatrix = [];
    let index = 0;

    for (let i = 0; i < matrixSize; i++) {
        const row = [];
        for (let j = 0; j < matrixSize; j++) {
            const r = Number(rValues[index]?.value ?? 0);
            const g = Number(gValues[index]?.value ?? 0);
            const b = Number(bValues[index]?.value ?? 0);

            if (![r, g, b].every(Number.isFinite) ||
                ![r, g, b].every(value => Number.isInteger(value) && value >= 0 && value <= 255)) {
                alert(`Giá trị RGB tại ô ${i + 1},${j + 1} phải là số nguyên từ 0 đến 255!`);
                return;
            }

            row.push(calculateYUV(r, g, b));
            index++;
        }
        yuvMatrix.push(row);
    }

    ['Y', 'U', 'V'].forEach(component => {
        const title = document.createElement("h3");
        title.textContent = `Ma trận ${component}`;
        resultDiv.appendChild(title);

        const table = document.createElement("table");

        for (let i = 0; i < matrixSize; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < matrixSize; j++) {
                const value = yuvMatrix[i][j][component.toLowerCase()];
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.value = format2(value);
                input.readOnly = true;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        resultDiv.appendChild(table);
    });
});
