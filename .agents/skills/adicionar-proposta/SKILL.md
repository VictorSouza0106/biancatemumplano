---
name: adicionar-proposta
description: Criar novas propostas de fotografia neste projeto com um questionário guiado, componentes em proposals, EventTemplateComponent e rota própria. Usar ao solicitar /adicionar-proposta ou uma nova proposta para um cliente; apresentar o link local e fazer o commit seguido de push somente após a confirmação da revisão.
---

# Adicionar proposta

Conduza a conversa em português. Crie uma proposta para o cliente seguindo a Opportunity, sem alterar o template compartilhado. Faça **uma pergunta por vez** e aguarde a resposta antes de continuar. Aproveite respostas já fornecidas pelo usuário, sem repetir perguntas resolvidas.

## Preparar

Considere todos os caminhos abaixo relativos à raiz do projeto.

- Leia `src/app/modules/proposals/proposals/opportunity/opportunity.component.ts` e seus arquivos HTML e SCSS para conhecer o modelo e os padrões atuais dos planos.
- Confira `src/app/modules/proposals/interfaces/proposal.interfaces.ts`, `src/app/modules/proposals/proposals.routes.ts` e `src/app/app.routes.ts` antes de gerar arquivos ou registrar a rota.
- Consulte `git status` e os diffs, incluindo o index, para distinguir o trabalho existente das alterações desta proposta. Preserve alterações anteriores durante toda a execução.

## Perguntar

1. Pergunte: **“Qual o nome do cliente?”** Use o nome em `IProposal.name`; não aceite um nome vazio.
2. Percorra os planos na ordem **Premium, Essencial e Clássico**. Para cada plano, faça as quatro perguntas abaixo separadamente:
   - **“Sobre o pacote {plano}, qual o valor? O padrão é {preço atual}. Deseja manter ou alterar?”** Aceite valor monetário positivo e normalize para o formato brasileiro usado em `price`, por exemplo `R$ 759,90`.
   - **“Quantas fotos? O padrão é {quantidade atual}. Deseja manter ou alterar?”** Grave um inteiro positivo em `photoCount`.
   - **“Deseja manter o prazo de entrega de {prazo atual}?”** Grave o prazo confirmado em `delivery`; se o usuário responder apenas que deseja alterar, pergunte o novo prazo antes de continuar.
   - Mostre a lista completa de `features` do plano, numerada, e pergunte: **“Deseja acrescentar ou retirar alguma característica deste pacote?”** Permita manter a lista, remover itens por número ou texto e acrescentar itens com o texto informado. Esclareça alterações ambíguas antes de seguir.
3. Pergunte: **“Qual será a URL da proposta? Sugestão: {slug do cliente}, para acessar /proposta/{slug}.”** Receba o identificador da rota, sem host nem o prefixo `proposta/`.

Use os valores e as características da Opportunity como padrões, apresentando-os em cada pergunta. Atualmente, os padrões são:

| Plano | Preço | Fotos | Prazo |
| --- | --- | --- | --- |
| Premium | R$ 759,90 | 300 | 2 a 3 dias úteis |
| Essencial | R$ 499,90 | 150 | até 10 dias úteis |
| Clássico | R$ 559,90 | 200 | 4 a 5 dias úteis |

Se o modelo mudar, prefira os valores lidos do componente à tabela acima. Uma resposta como “manter” aceita o padrão apresentado. Não interprete ausência de resposta como aceitação.

Ao mudar um prazo, atualize também a característica que informa a entrega, caso ela continue na lista, sem duplicá-la nem restaurar um item removido explicitamente.

Sugira um slug em letras minúsculas, sem acentos, com palavras separadas por hífen. Aceite apenas letras ASCII minúsculas, números e hífens entre segmentos. Confira se já existe uma rota ou pasta com esse identificador; em caso de colisão, peça outro. Não sobrescreva uma proposta existente.

## Gerar

- Crie a pasta **`src/app/modules/proposals/proposals/{slug}/`**, irmã de `opportunity`, e os arquivos `{slug}.component.ts`, `{slug}.component.html` e `{slug}.component.scss`, seguindo o padrão do modelo.
- Derive um nome de classe TypeScript válido do slug, com sufixo `Component`; use um prefixo como `Proposal` se o slug começar por número. Defina um seletor único, como `app-proposal-{slug}`.
- Importe **`EventTemplateComponent`** de `../../templates/event-template/event-template.component`, inclua-o nos imports do componente e use o HTML:

  ```html
  <app-event-template [contentData]="proposal"></app-event-template>
  ```

- Preencha `plans: IProposalPlan[]` com as respostas e `proposal: IProposal` com o nome do cliente e os planos. Preserve os IDs, a ordem dos planos, as estrelas e o destaque da Opportunity. Escape corretamente textos ao inseri-los no TypeScript.
- Reutilize o SCSS do modelo, inclusive se estiver vazio. Não copie os componentes internos do template nem altere interfaces ou componentes compartilhados para adicionar um cliente.
- Adicione uma entrada em `src/app/modules/proposals/proposals.routes.ts` com `path: '{slug}'` e `loadComponent` apontando para o componente criado. Preserve as rotas existentes e o prefixo `/proposta` configurado em `app.routes.ts`.

## Verificar e apresentar

1. Execute `npm run build` e corrija problemas introduzidos pela proposta. Se um problema anterior impedir a validação, informe o impedimento sem atribuir sucesso ao build.
2. Disponibilize a aplicação na porta 4200. Reutilize um servidor deste projeto já em execução; caso contrário, use `npm start -- --port 4200` em uma sessão persistente. Se a porta pertencer a outro processo, não o encerre; informe o impedimento. Só afirme que a página está disponível após confirmar que o servidor está pronto.
3. Mostre o link clicável e a mensagem: **“Acesse http://localhost:4200/proposta/{slug} para verificar as informações. Quando estiver verificado, me avise para fazer o commit.”**
4. Aguarde a confirmação explícita da revisão, como “verificado”. Não crie o commit antes dessa resposta. Se houver pedidos de ajustes, aplique-os, execute novamente a validação pertinente e apresente o link para uma nova revisão.

## Fazer o commit após a revisão

- A confirmação de que a proposta foi verificada autoriza o commit e o push previstos neste fluxo; não solicite uma segunda aprovação de rotina.
- Confira o diff e separe apenas os arquivos e trechos desta proposta. Não use `git add .` nem inclua alterações anteriores, inclusive as que já estavam no index. Se não for possível separá-las com segurança, explique o impedimento antes de fazer o commit.
- Verifique as alterações selecionadas com `git diff --cached --check` e faça o commit com a mensagem exata:

  ```text
  New Proposal {nome da proposta} - {DD/MM/AA}
  ```

- Use o nome do cliente confirmado e a data do momento do commit em `America/Sao_Paulo`, obtida, por exemplo, com `TZ=America/Sao_Paulo date +%d/%m/%y`. Não reutilize a data da Opportunity nem a data de início da conversa.

## Fazer o push após o commit

- Após o commit bem-sucedido, execute `git push` para o upstream da branch atual, sem solicitar nova confirmação de rotina.
- Se não houver upstream configurado ou o push falhar, informe o impedimento. Não use `--force`.
- Informe o hash e a mensagem do commit, o resultado do push e mantenha o link da proposta disponível.
