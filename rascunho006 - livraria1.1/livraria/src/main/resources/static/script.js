var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var apiUrl = "http://localhost:8080/api/livraria";
var listaLivros = document.getElementById("listaLivros");
var livroForm = document.getElementById("livroForm");
var inNome = document.getElementById("inNome");
var inAutor = document.getElementById("inAutor");
var editandoId = null;
function carregarLivros() {
    return __awaiter(this, void 0, void 0, function () {
        var res, livros;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    livros = _a.sent();
                    listaLivros.innerHTML = "";
                    livros.forEach(function (livro) {
                        var li = document.createElement("li");
                        li.dataset.id = livro.id.toString();
                        li.textContent = "".concat(livro.nome, " - ").concat(livro.autor, " ");
                        var btnDelete = document.createElement("button");
                        btnDelete.textContent = "Excluir";
                        btnDelete.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch("".concat(apiUrl, "/").concat(livro.id), { method: "DELETE" })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, carregarLivros()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        var btnEditar = document.createElement("button");
                        btnEditar.textContent = "Editar";
                        btnEditar.addEventListener("click", function () {
                            inNome.value = livro.nome;
                            inAutor.value = livro.autor;
                            editandoId = livro.id;
                        });
                        li.appendChild(btnDelete);
                        li.appendChild(btnEditar);
                        listaLivros.appendChild(li);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
livroForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var livro;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                livro = { nome: inNome.value, autor: inAutor.value };
                if (!(editandoId !== null)) return [3 /*break*/, 2];
                return [4 /*yield*/, fetch("".concat(apiUrl, "/").concat(editandoId), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(livro)
                    })];
            case 1:
                _a.sent();
                editandoId = null;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(livro)
                })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                inNome.value = "";
                inAutor.value = "";
                return [4 /*yield*/, carregarLivros()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
carregarLivros();
