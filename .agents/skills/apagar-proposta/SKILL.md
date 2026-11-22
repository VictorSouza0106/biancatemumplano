---
name: apagar-proposta
description: Apagar uma proposta de fotografia deste projeto, listando as propostas existentes e solicitando escolha e confirmação explícita antes de remover seus arquivos e sua rota, validar, fazer o commit e executar git push. Usar ao solicitar /apagar-proposta ou excluir uma proposta de cliente.
---

# Apagar proposta

Conduza a conversa em português. Faça **uma pergunta por vez** e aguarde a resposta. A seleção identifica a proposta; somente a confirmação explícita autoriza a exclusão, o commit e o push, sem uma segunda aprovação de rotina para esses passos.

Todos os caminhos abaixo são relativos à raiz do projeto.

## Preparar e listar

- Consulte `git status`, `git diff` e `git diff --cached` para distinguir alterações anteriores. Preserve o trabalho existente, inclusive arquivos não rastreados e alterações já no index.
- Leia `src/app/modules/proposals/proposals.routes.ts`, `src/app/app.routes.ts` e as pastas em `src/app/modules/proposals/proposals/`.
- Relacione cada rota ao componente carregado e obtenha o nome do cliente em `IProposal.name`. Liste todas as propostas em uma tabela numerada com nome, identificador e URL `/proposta/{slug}`. Mostre também eventuais pastas sem rota e rotas com arquivos ausentes, indicando a inconsistência.
- Identifique `Opportunity` como o modelo usado pela skill `adicionar-proposta`, caso ainda exista. Inclua-a na lista.
- Se não houver propostas, informe isso e encerre sem alterar arquivos.
- Pergunte: **“Qual proposta deseja apagar? Informe o número, o nome ou o identificador.”** Mesmo que haja apenas uma proposta, aguarde a escolha.
- Aceite somente uma proposta identificada na lista. Se a resposta corresponder a mais de uma ou não existir, esclareça antes de continuar. Não transforme uma resposta livre em um caminho de exclusão.

## Confirmar a exclusão

- Confira os arquivos, a rota e as referências da proposta escolhida antes de pedir confirmação. Use a pasta real do componente, restrita a `src/app/modules/proposals/proposals/`; não siga links simbólicos para excluir arquivos externos.
- Mostre o nome, a URL e os arquivos que serão removidos, além da alteração necessária na rota. Se houver trabalho anterior nesses arquivos, informe-o e não o descarte sem autorização explícita para esses trechos.
- Caso a escolhida seja `Opportunity`, explique na mesma confirmação que ela também serve de modelo para `adicionar-proposta`. A exclusão não autoriza alterar outras skills ou apagar componentes compartilhados.
- Confira a branch atual e seu upstream. Informe o destino do push; se houver commits locais pendentes além desta exclusão, explicite que também serão enviados na confirmação. Se não houver upstream, informe essa limitação, sem escolher outro remoto silenciosamente.
- Pergunte: **“Deseja mesmo apagar a proposta {nome}, em /proposta/{slug}, remover seus arquivos e sua rota, fazer o commit e executar o git push? Responda sim ou não.”** Inclua no contexto da pergunta as consequências adicionais identificadas acima.
- Aguarde uma resposta afirmativa inequívoca. Ausência de resposta, ambiguidade ou apenas a escolha da proposta não autorizam a exclusão. Se responder “não” ou cancelar, encerre sem alterações.
- Se a escolha mudar, mostre o novo escopo e obtenha a confirmação para a nova proposta antes de excluir.

## Excluir e validar

- Após a confirmação, confira novamente o estado do Git. Se houver novas alterações que mudem o escopo confirmado, esclareça antes de descartá-las.
- Remova apenas os arquivos exclusivos da proposta confirmada e sua pasta, quando ficar vazia. Evite exclusões recursivas amplas. Preserve arquivos compartilhados ou usados por outras propostas; se a exclusão depender de modificá-los, informe o impedimento.
- Retire somente a entrada correspondente em `src/app/modules/proposals/proposals.routes.ts` e eventuais imports exclusivos dessa entrada. Preserve as demais rotas, o prefixo `/proposta` em `app.routes.ts`, as interfaces e os templates compartilhados.
- Confira se restaram imports ou referências de código aos arquivos removidos. Não aproveite a exclusão para limpar ou refatorar outros recursos.
- Execute `npm run build`. Corrija problemas introduzidos pela exclusão. Se o build continuar falhando ou houver um problema anterior que impeça a validação, informe o impedimento e não faça commit nem push.

## Fazer o commit

- Confira o diff final e selecione somente os arquivos e trechos desta exclusão. Não use `git add .`, não inclua alterações anteriores e preserve alterações alheias já no index. Se não for possível isolar o commit com segurança, informe o impedimento antes de commitar.
- Revise a lista e o diff dos arquivos selecionados e execute `git diff --cached --check`. Corrija problemas desta exclusão antes de continuar.
- Obtenha a data no momento do commit em `America/Sao_Paulo`, por exemplo com `TZ=America/Sao_Paulo date +%d/%m/%y`.
- Faça o commit com a mensagem:

  ```text
  Delete Proposal {nome da proposta} - {DD/MM/AA}
  ```

- Use o nome da proposta confirmada e a data obtida. Se não houver alterações a commitar, informe isso e não execute push como se uma exclusão tivesse sido registrada.

## Fazer o push e informar o resultado

- Somente após o commit bem-sucedido, execute `git push` para o upstream da branch atual, conforme o destino apresentado na confirmação.
- Se não houver upstream configurado ou o push falhar, informe o impedimento e o hash do commit local. Não use `--force`, não altere o histórico e não declare que o envio foi concluído.
- Informe a proposta e a rota removidas, o resultado do build, o hash e a mensagem do commit, o resultado do push e eventuais alterações que continuem no diretório de trabalho.
