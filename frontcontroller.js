class ExtracaoController {
    iniciar() {
        console.log("Máquinas de extração iniciadas...");
    }

    parar() {
        console.log("Máquinas de extração desligadas...");
    }
}

class RegistroController {
    registrar(dados) {
        console.log(`Registro de produção: ${dados} kg de ouro.`);
    }
}

class FrontController {
    constructor() {
        this.extracaoController = new ExtracaoController();
        this.registroController = new RegistroController();
    }

    handleRequest(acao, params) {
        switch (acao) {
            case "iniciar_extracao":
                this.extracaoController.iniciar();
                break;
            case "parar_extracao":
                this.extracaoController.parar();
                break;
            case "registrar_producao":
                this.registroController.registrar(params);
                break;
            default:
                console.log("Ação inválida!");
        }
    }
}

const frontController = new FrontController();

frontController.handleRequest("iniciar_extracao"); 
frontController.handleRequest("registrar_producao", 50); 
frontController.handleRequest("parar_extracao");  
