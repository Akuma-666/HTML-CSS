let saldo = 1000;
let historico = ["1. Abertura da conta: R$ 1000.00"];
let selectOperacao = document.getElementById("operacao");
let inputValor = document.getElementById("valor");
let btnExecutar = document.getElementById("btnExecutar");
let divResultado = document.getElementById("resultado");
let spanSaldo = document.getElementById("saldoAtual");

btnExecutar.addEventListener("click", function() {
    let operacao = selectOperacao.value;
    let valorDigitado = Number(inputValor.value);

    switch (operacao) {
        case "consultar":
            divResultado.textContent = "Seu saldo atual é: R$ " + saldo.toFixed(2);
            break;

        case "depositar":

            if (Number.isInteger(valorDigitado) && valorDigitado > 0) {
                saldo = saldo + valorDigitado;
                spanSaldo.textContent = saldo.toFixed(2);
                
                divResultado.textContent = "Depósito de R$ " + valorDigitado.toFixed(2) + " realizado com sucesso! Novo saldo: R$ " + saldo.toFixed(2);
                

                historico.push((historico.length + 1) + ". Depósito: +R$ " + valorDigitado.toFixed(2));
            } else {
                divResultado.textContent = "Erro: informe um valor inteiro maior que zero para depósito.";
            }
            break;

        case "sacar":

            if (!Number.isInteger(valorDigitado) || valorDigitado <= 0) {
                divResultado.textContent = "Erro: o valor do saque deve ser um número inteiro maior que zero.";
            } else if (valorDigitado % 10 !== 0) {
                divResultado.textContent = "Erro: o valor do saque deve ser múltiplo de 10.";
            } else if (valorDigitado > saldo) {
                divResultado.textContent = "Erro: saldo insuficiente.";
            } else {

                saldo = saldo - valorDigitado;
                spanSaldo.textContent = saldo.toFixed(2);

                let restante = valorDigitado;
                let n100 = 0;
                let n50 = 0;
                let n20 = 0;
                let n10 = 0;

                while (restante >= 100) {
                    restante = restante - 100;
                    n100++;
                }

                while (restante >= 50) {
                    restante = restante - 50;
                    n50++;
                }

                while (restante >= 20) {
                    restante = restante - 20;
                    n20++;
                }

                while (restante >= 10) {
                    restante = restante - 10;
                    n10++;
                }

                let mensagem = "Saque de R$ " + valorDigitado.toFixed(2) + " realizado com sucesso!<br>Notas entregues:<br>";
                
                if (n100 > 0) { mensagem += n100 + " nota(s) de R$ 100<br>"; }
                if (n50 > 0) { mensagem += n50 + " nota(s) de R$ 50<br>"; }
                if (n20 > 0) { mensagem += n20 + " nota(s) de R$ 20<br>"; }
                if (n10 > 0) { mensagem += n10 + " nota(s) de R$ 10<br>"; }

                mensagem += "Saldo restante: R$ " + saldo.toFixed(2);
   
                divResultado.innerHTML = mensagem;

                historico.push((historico.length + 1) + ". Saque: -R$ " + valorDigitado.toFixed(2));
            }
            break;

        case "extrato":
            let textoExtrato = "<strong>EXTRATO</strong><br>";
            
            for (let i = 0; i < historico.length; i++) {
                textoExtrato += historico[i] + "<br>";
            }

            textoExtrato += "<br><strong>Saldo atual: R$ " + saldo.toFixed(2) + "</strong>";
            divResultado.innerHTML = textoExtrato;
            break;
    }

    inputValor.value = "";
});