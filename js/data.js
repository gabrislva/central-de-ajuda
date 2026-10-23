/*
  CONTEÚDO DO SITE: edite só este arquivo para adicionar ou alterar artigos.
  Cada item: { id, cat, type, title, sum, steps[], note?, img? }
  - id: sem espaços (vira o link direto, ex.: index.html#vpn)
  - type: "Tutorial", "FAQ" ou "Política"
  - img: { src, alt } (opcional)
*/
const CONTENT = {
  suporte: {
    label: "Suporte",
    title: "Resolva você mesmo, rápido",
    intro: "Passo a passo para os problemas mais comuns do dia a dia. Não achou? Fale com a equipe de infraestrutura.",
    placeholder: "Busque: wifi, senha, VPN, lento…",
    ordered: true,
    help: {
      title: "Ainda com problema?",
      text: "Abra um chamado em <strong>[link do sistema de chamados]</strong> ou ligue para o ramal <strong>[0000]</strong>. Informe seu nome, o patrimônio do notebook e o que aparece na tela."
    },
    items: [
      { id: "lento", cat: "Notebook", type: "Tutorial", title: "Notebook lento ou travando", sum: "Passos rápidos antes de abrir chamado.",
        img: { src: "assets/img/taskmgr.svg", alt: "Gerenciador de Tarefas com o Chrome consumindo muita CPU e memória" },
        steps: ["Salve seu trabalho e reinicie o notebook (fechar a tampa não conta).", "Abra o Gerenciador de Tarefas com <code>Ctrl + Shift + Esc</code> e ordene por CPU ou Memória.", "Feche o que você não está usando e desative apps de inicialização desnecessários.", "Confira o espaço livre no disco C:. Abaixo de 10% o sistema fica lento.", "Instale as atualizações em Configurações → Windows Update."],
        note: "Continua lento? Abra um chamado dizendo quais programas estavam abertos." },
      { id: "disco", cat: "Notebook", type: "Tutorial", title: "Liberar espaço em disco", sum: "Limpeza segura, sem apagar o que importa.",
        steps: ["Abra Configurações → Sistema → Armazenamento.", "Ative o <strong>Sensor de Armazenamento</strong> para limpar temporários automaticamente.", "Esvazie a Lixeira e a pasta Downloads.", "Mova arquivos grandes para o OneDrive ou para o servidor de arquivos.", "Desinstale apenas programas que você mesmo instalou."] },
      { id: "nao-liga", cat: "Notebook", type: "Tutorial", title: "Notebook não liga ou tela preta", sum: "Teste isto antes de levar ao suporte.",
        steps: ["Conecte o carregador original e espere 10 minutos.", "Desconecte pen drives, docking station e monitor externo.", "Segure o botão de energia por 20 segundos, solte e ligue de novo.", "Se a luz do carregador não acende, teste outra tomada.", "Tela preta com o notebook ligado? Tente <code>Win + Ctrl + Shift + B</code>."],
        note: "Sem sinal de vida: abra um chamado e leve o equipamento ao suporte." },
      { id: "wifi", cat: "Rede e VPN", type: "Tutorial", title: "Conectado ao Wi-Fi, mas sem internet", sum: "Aparece conectado e nada abre.",
        img: { src: "assets/img/wifi.svg", alt: "Lista de redes Wi-Fi com o botão Esquecer destacado" },
        steps: ["Desligue e ligue o Wi-Fi (ícone de rede ou modo avião).", "Clique na rede, escolha <strong>Esquecer</strong> e conecte de novo.", "Teste outro site e outro app para saber se é só um serviço.", "Reinicie o notebook.", "Mude de lugar: perto de parede grossa ou elevador o sinal cai."],
        note: "Vários colegas com o mesmo problema? Avise a TI: pode ser a rede, não o seu notebook." },
      { id: "vpn", cat: "Rede e VPN", type: "Tutorial", title: "VPN não conecta", sum: "Erros comuns ao trabalhar de casa.",
        img: { src: "assets/img/vpn.svg", alt: "Janela da VPN com mensagem de falha na conexão" },
        steps: ["Confirme que sua internet funciona abrindo qualquer site.", "Feche a VPN por completo e abra de novo.", "Confira usuário e senha (se a senha mudou, use a nova).", "Data e hora do notebook precisam estar automáticas e corretas.", "Teste outra rede, como o 4G do celular, para descartar bloqueio do provedor."],
        note: "Anote o código do erro ou tire um print e anexe ao chamado." },
      { id: "senha", cat: "Acesso", type: "FAQ", title: "Esqueci ou expirou minha senha", sum: "Como recuperar o acesso.",
        steps: ["Use o portal de autoatendimento: <strong>[link do portal]</strong>.", "Confirme sua identidade (celular ou e-mail pessoal cadastrado).", "Crie a nova senha e atualize em todos os dispositivos (celular, e-mail, VPN).", "Sem acesso ao portal? Abra um chamado ou ligue para a TI."],
        note: "A TI nunca pede sua senha por e-mail, chat ou telefone." },
      { id: "teams", cat: "Reuniões e E-mail", type: "Tutorial", title: "Sem áudio ou câmera no Teams/Meet", sum: "Checklist antes de entrar na reunião.",
        img: { src: "assets/img/teams.svg", alt: "Tela de configurações de microfone, alto-falante e câmera" },
        steps: ["Nas configurações do app, escolha o microfone, o alto-falante e a câmera certos.", "No Windows: Configurações → Privacidade → Microfone / Câmera.", "Veja se o fone está mudo por botão físico.", "Feche outros apps que usam a câmera.", "Reinicie o aplicativo e, se preciso, o notebook."] },
      { id: "outlook", cat: "Reuniões e E-mail", type: "Tutorial", title: "E-mail não sincroniza ou não envia", sum: "Outlook parado em “Tentando conectar”.",
        steps: ["Desmarque <strong>Trabalhar offline</strong> na aba Enviar/Receber.", "Confirme a internet e, fora do escritório, a VPN ativa.", "Feche e abra o Outlook.", "Veja se a caixa não está cheia ou se o anexo não é grande demais.", "Teste o webmail: se funcionar lá, o problema é o aplicativo."] },
      { id: "impressora", cat: "Impressoras", type: "Tutorial", title: "Impressora não imprime", sum: "O que checar antes de chamar a TI.",
        steps: ["Veja se está ligada, com papel e sem aviso no visor.", "Abra a fila de impressão e cancele trabalhos travados.", "Confirme que escolheu a impressora certa.", "Desligue, espere 30 segundos e ligue de novo.", "Primeira vez? Peça a instalação ao suporte informando a etiqueta da impressora."] },
      { id: "chamado", cat: "Acesso", type: "FAQ", title: "Como abrir um chamado de forma eficiente?", sum: "O que acelera o atendimento.",
        steps: ["Descreva o problema e quando começou.", "Informe o patrimônio do notebook (etiqueta no equipamento).", "Anexe um print da tela ou do erro.", "Diga o que já tentou e a urgência: travado por completo ou só atrapalha?"] }
    ]
  },

  seguranca: {
    label: "Segurança e Privacidade",
    title: "Segurança é responsabilidade de todos",
    intro: "Regras básicas adotadas por empresas de tecnologia para proteger você, seus colegas, nossos clientes e os dados que manipulamos.",
    placeholder: "Busque: MFA, phishing, LGPD, BYOD…",
    ordered: false,
    help: {
      title: "Suspeitou de algo? Avise na hora.",
      text: "Clicou em um link estranho, perdeu um equipamento ou viu um acesso indevido? Reporte em <strong>[e-mail ou canal de segurança]</strong>. Reportar rápido evita um problema maior e ninguém será punido por avisar."
    },
    items: [
      { id: "mfa", cat: "Acesso", type: "Política", title: "Senhas e autenticação em dois fatores (MFA)", sum: "A proteção mais eficaz contra roubo de conta.",
        steps: ["Use senhas longas (frases de 12+ caracteres) e únicas para cada serviço.", "Guarde as senhas em um gerenciador aprovado pela empresa, nunca em planilhas ou post-its.", "Ative o MFA em todos os sistemas que oferecem, de preferência por aplicativo autenticador.", "Nunca compartilhe senhas nem códigos de verificação, nem com a TI."] },
      { id: "acessos", cat: "Acesso", type: "Política", title: "Menor privilégio e pedidos de acesso", sum: "Cada pessoa acessa só o que precisa para trabalhar.",
        steps: ["Peça acessos pelo canal oficial, com justificativa e aprovação do gestor.", "Acessos temporários têm data para acabar.", "Ao mudar de área ou sair da empresa, os acessos antigos são revisados e removidos.", "Não use contas de outras pessoas ou contas genéricas compartilhadas."] },
      { id: "dados", cat: "Dados e Privacidade", type: "Política", title: "Classificação da informação e LGPD", sum: "Saiba qual dado exige mais cuidado.",
        steps: ["<strong>Público:</strong> pode ser divulgado. <strong>Interno:</strong> só para colaboradores. <strong>Confidencial:</strong> acesso restrito, como contratos e dados de clientes.", "Dados pessoais (nome, CPF, e-mail, telefone) só são coletados e usados para uma finalidade clara.", "Colete o mínimo necessário e apague o que não é mais preciso.", "Pedidos de titulares sobre seus dados vão para o encarregado de dados: <strong>[contato do DPO]</strong>."] },
      { id: "compartilhar", cat: "Dados e Privacidade", type: "Política", title: "Compartilhamento de arquivos e uso de IA", sum: "Onde pode e onde não pode colocar informação da empresa.",
        steps: ["Use apenas ferramentas aprovadas (OneDrive, SharePoint, etc.). Evite e-mail pessoal e WhatsApp para arquivos de trabalho.", "Dê acesso a pessoas específicas, não a “qualquer pessoa com o link”.", "Não cole dados de clientes, senhas, código-fonte ou contratos em ferramentas de IA públicas.", "Na dúvida sobre uma ferramenta nova, consulte a TI antes de usar."] },
      { id: "dispositivos", cat: "Dispositivos", type: "Política", title: "Uso aceitável e dispositivos pessoais (BYOD)", sum: "O que pode e não pode no notebook da empresa.",
        steps: ["O equipamento da empresa é para trabalho. Não instale programas sem autorização.", "Não desative antivírus, firewall ou criptografia do disco.", "Dispositivos pessoais só acessam sistemas da empresa se estiverem cadastrados e com bloqueio de tela.", "Perdeu ou teve o equipamento roubado? Avise imediatamente para bloqueio remoto."] },
      { id: "mesa", cat: "Dispositivos", type: "Política", title: "Tela bloqueada e mesa limpa", sum: "Pequenos hábitos que evitam grandes vazamentos.",
        steps: ["Bloqueie a tela sempre que se afastar: <code>Win + L</code>.", "Não deixe documentos, anotações com senhas ou crachá à vista.", "Em locais públicos, cuidado com quem olha a sua tela e com conversas sobre trabalho.", "Descarte papéis confidenciais em triturador, nunca no lixo comum."] },
      { id: "atualizacoes", cat: "Dispositivos", type: "Política", title: "Atualizações e antivírus", sum: "Falhas conhecidas são a porta de entrada mais comum.",
        steps: ["Instale as atualizações do sistema e dos aplicativos assim que forem solicitadas.", "Reinicie o notebook ao menos uma vez por semana para concluir as atualizações.", "Mantenha o antivírus ativo e nunca ignore alertas dele.", "Não conecte pen drives de origem desconhecida."] },
      { id: "phishing", cat: "Ameaças e Incidentes", type: "Política", title: "Como identificar phishing e golpes", sum: "A maioria dos ataques começa com uma mensagem falsa.",
        steps: ["Desconfie de urgência, ameaças ou prêmios inesperados.", "Passe o mouse sobre o link antes de clicar e confira o endereço do remetente.", "Ninguém legítimo pede senha ou código por e-mail, chat ou telefone.", "Pedidos de pagamento ou troca de dados bancários devem ser confirmados por outro canal.", "Suspeitou? Não clique, não responda e reporte ao canal de segurança."],
        note: "Mesmo a mensagem parecendo vir do seu chefe ou da TI, confirme por outro meio." },
      { id: "incidente", cat: "Ameaças e Incidentes", type: "FAQ", title: "O que é um incidente e como reportar?", sum: "Quando e a quem avisar.",
        steps: ["É incidente: clicar em link suspeito, enviar dado ao destinatário errado, perder equipamento, ver acesso que não deveria ter.", "Desconecte o equipamento da rede se suspeitar de vírus, mas não o desligue nem apague nada.", "Avise o canal de segurança em até 1 hora, com o que aconteceu e quando.", "A equipe vai orientar os próximos passos."] }
    ]
  }
};
