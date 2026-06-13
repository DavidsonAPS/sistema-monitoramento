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

document.getElementById(
  'nomeUsuario'
).innerText =
  usuario.nome

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

    let icone = '📡'

    if (
      sensor.sensor === 'Bateria'
    )
      icone = '🔋'

    if (
      sensor.sensor === 'Internet'
    )
      icone = '🌐'

    if (
      sensor.sensor === 'Energia'
    )
      icone = '⚡'

    if (
      sensor.sensor === 'Sistema'
    )
      icone = '📲'

    if (
      sensor.sensor === 'Modelo'
    )
      icone = '📱'

    html += `

      <div
        class="d-flex justify-content-between py-2"
      >

        <strong>

          ${icone}
          ${sensor.sensor}

        </strong>

        <span>

          ${sensor.valor}

        </span>

      </div>

    `

})
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


async function carregarDispositivos() {

  try {

    const response =
      await fetch(
        `${API}/sensores/${usuario.id}/lista`
      )

    const sensores =
      await response.json()
      console.log(sensores)

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

const ultimoRegistro =
  sensores.reduce(
    (maisNovo, atual) =>

      new Date(atual.created_at) >
      new Date(maisNovo.created_at)

        ? atual
        : maisNovo
  )

const ultimaAtualizacao =
  new Date(
    ultimoRegistro.created_at
  )

const agora =
  new Date()

const diferencaSegundos =
  (agora - ultimaAtualizacao)
  / 1000

const online =
  diferencaSegundos <= 90

  console.log(
  'Agora:',
  agora
)

console.log(
  'Ultima atualização:',
  ultimaAtualizacao
)

console.log(
  'Diferença:',
  diferencaSegundos
)

console.log(
  'Online:',
  online
)

let html = `

<div class="card shadow border-0 mb-4">

  <div class="card-body">

    <div
      class="d-flex justify-content-between"
    >

      <h3>
        📱 ${sensores[0].dispositivo}
      </h3>

      <span
        class="badge ${
          online
            ? 'bg-success'
            : 'bg-danger'
        }"
      >

        ${
          online
            ? '🟢 ONLINE'
            : '🔴 OFFLINE'
        }

      </span>

    </div>

    <hr>

`

sensores.forEach(sensor => {

  let icone = '📡'

  if (sensor.sensor === 'Bateria')
    icone = '🔋'

  if (sensor.sensor === 'Internet')
    icone = '🌐'

  if (sensor.sensor === 'Energia')
    icone = '⚡'

  if (sensor.sensor === 'Sistema')
    icone = '📲'

  if (sensor.sensor === 'Modelo')
    icone = '📱'

  html += `

<div class="mb-2">

  <strong>

    ${icone}
    ${sensor.sensor}:

  </strong>

  ${sensor.valor}

</div>

`

  html += `

<hr>

<div class="text-muted">

  🕒 Última atualização

  <br>

  ${ultimaAtualizacao.toLocaleTimeString()}

</div>

`

})

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

carregarDispositivos()

setInterval(() => {

  carregarDispositivos()

}, 5000)