const cardsSensores =
document.getElementById(
  'cardsSensores'
)

const API =
'https://sistema-monitoramento-4sts.onrender.com'

const usuario =
JSON.parse(
  localStorage.getItem('usuario')
)

document.addEventListener(
  'DOMContentLoaded',
  () => {

    document.getElementById(
      'nomeUsuario'
    ).innerText =
      usuario.nome

  }
)

if (!usuario) {

  window.location.href =
    'login.html'

}

const api = 'http://localhost:3000/sensores';

const tabela = document.getElementById(
    'tabelaSensores'
);

const form = document.getElementById(
    'sensorForm'
);

const totalSensores = document.getElementById(
    'totalSensores'
);

const ativos = document.getElementById(
    'ativos'
);

const inativos = document.getElementById(
    'inativos'
);

const temperaturaMedia = document.getElementById(
    'temperaturaMedia'
);

const pesquisa = document.getElementById(
    'pesquisa'
);

let grafico;

let sensoresGlobais = [];

const modalEditar = new bootstrap.Modal(
    document.getElementById('modalEditar')
);

async function carregarSensores() {

    try {

        const response = await fetch(api);

        const sensores = await response.json();

        sensoresGlobais = sensores;

        renderizarTabela(sensores);

        atualizarDashboard(sensores);

        atualizarGrafico(sensores);

    } catch (error) {

        console.error(error);

    }
}

function renderizarTabela(sensores) {

    tabela.innerHTML = '';

    sensores.forEach(sensor => {

        tabela.innerHTML += `

            <tr>

                <td>${sensor.id}</td>

                <td>${sensor.nome}</td>

                <td>${sensor.localizacao}</td>

                <td>

                    <span class="badge
                        ${sensor.status === 'Ativo'
                            ? 'bg-success'
                            : 'bg-danger'}">

                        ${sensor.status}

                    </span>

                </td>

                <td>

                    ${sensor.temperatura}°C

                </td>

                <td class="d-flex gap-2">

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="abrirModalEdicao(
                            ${sensor.id},
                            '${sensor.nome}',
                            '${sensor.localizacao}',
                            '${sensor.status}',
                            '${sensor.temperatura}'
                        )">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deletarSensor(${sensor.id})">

                        Excluir

                    </button>

                </td>

            </tr>

        `;
    });
}

function atualizarDashboard(sensores) {

    const ativosCount = sensores.filter(
        sensor => sensor.status === 'Ativo'
    ).length;

    const inativosCount = sensores.filter(
        sensor => sensor.status === 'Inativo'
    ).length;

    totalSensores.innerText = sensores.length;

    ativos.innerText = ativosCount;

    inativos.innerText = inativosCount;

    const somaTemperaturas = sensores.reduce(
        (total, sensor) =>
            total + Number(sensor.temperatura),
        0
    );

    const media = sensores.length > 0
        ? (somaTemperaturas / sensores.length).toFixed(1)
        : 0;

    temperaturaMedia.innerText = `${media}°C`;
}

function atualizarGrafico(sensores) {

    const ativosCount = sensores.filter(
        sensor => sensor.status === 'Ativo'
    ).length;

    const inativosCount = sensores.filter(
        sensor => sensor.status === 'Inativo'
    ).length;

    const ctx = document.getElementById(
        'graficoSensores'
    );

    if (grafico) {

        grafico.destroy();

    }

    grafico = new Chart(ctx, {

        type: 'doughnut',

        data: {

            labels: [
                'Ativos',
                'Inativos'
            ],

            datasets: [{

                data: [
                    ativosCount,
                    inativosCount
                ],

                backgroundColor: [
                    '#22c55e',
                    '#ef4444'
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: 'bottom'

                }

            }

        }

    });
}

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const sensor = {

        nome: document.getElementById(
            'nome'
        ).value,

        localizacao: document.getElementById(
            'localizacao'
        ).value,

        status: document.getElementById(
            'status'
        ).value,

        temperatura: document.getElementById(
            'temperatura'
        ).value

    };

    await fetch(api, {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(sensor)

    });

    form.reset();

    carregarSensores();

});

async function deletarSensor(id) {

    const confirmar = confirm(
        'Deseja excluir este sensor?'
    );

    if (!confirmar) return;

    await fetch(`${api}/${id}`, {

        method: 'DELETE'

    });

    carregarSensores();

}

function abrirModalEdicao(
    id,
    nome,
    localizacao,
    status,
    temperatura
) {

    document.getElementById(
        'editId'
    ).value = id;

    document.getElementById(
        'editNome'
    ).value = nome;

    document.getElementById(
        'editLocalizacao'
    ).value = localizacao;

    document.getElementById(
        'editStatus'
    ).value = status;

    document.getElementById(
        'editTemperatura'
    ).value = temperatura;

    modalEditar.show();

}

async function salvarEdicao() {

    const id = document.getElementById(
        'editId'
    ).value;

    const sensor = {

        nome: document.getElementById(
            'editNome'
        ).value,

        localizacao: document.getElementById(
            'editLocalizacao'
        ).value,

        status: document.getElementById(
            'editStatus'
        ).value,

        temperatura: document.getElementById(
            'editTemperatura'
        ).value

    };

    await fetch(`${api}/${id}`, {

        method: 'PUT',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(sensor)

    });

    modalEditar.hide();

    carregarSensores();

}

pesquisa.addEventListener('input', () => {

    const valor = pesquisa.value.toLowerCase();

    const filtrados = sensoresGlobais.filter(
        sensor =>
            sensor.nome
                .toLowerCase()
                .includes(valor)
    );

    renderizarTabela(filtrados);

});

async function carregarDispositivos() {

  try {

    const response =
      await fetch(
        `${API}/sensores/${usuario.id}/lista`
      )

    const sensores =
      await response.json()
      console.log(sensores[0])

    totalSensores.innerText =
      sensores.length

    ativos.innerText =
      sensores.filter(
        s =>
          s.status
            .toLowerCase()
            .includes('ativo')
            ||
          s.status
            .toLowerCase()
            .includes('conectado')
      ).length

    inativos.innerText =
      sensores.length -
      Number(ativos.innerText)

    cardsSensores.innerHTML = ''

    cardsSensores.innerHTML = ''

const ultimaAtualizacao =
  new Date(
    sensores[0].created_at
  )

const agora =
  new Date()

const diferencaSegundos =
  (agora - ultimaAtualizacao)
  / 1000

const online =
  diferencaSegundos <= 30

let html = `

  <div class="card shadow border-0">

    <div class="card-body">

      <h3>
        📱 iPhone 14
      </h3>

      <p
        style="
          font-weight:bold;
          color:${
            online
              ? 'green'
              : 'red'
          };
        "
      >

        ${
          online
            ? '🟢 Online'
            : '🔴 Offline'
        }

      </p>

      <small>

        Última atualização:
        ${ultimaAtualizacao.toLocaleString()}

      </small>

      <hr>

`

    cardsSensores.innerHTML =
      html

  }

  catch(error) {

    console.log(error)

  }

}

carregarDispositivos();

setInterval(() => {

  carregarDispositivos()

}, 5000)

function logout() {

  localStorage.removeItem(
    'usuario'
  )

  window.location.href =
    'login.html'

}