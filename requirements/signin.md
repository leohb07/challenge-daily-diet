# Login

### Caso de sucesso

✅ Recebe uma requisição do tipo POST na rota /api/signin
✅ Valida dados obrigatórios email e password
✅ Valida que o campo email é um e-mail válido
✅ Valida que password e valido
✅ Valida se existe um usuário com o email fornecido
✅ Gera um token de acesso JWT
✅ Retorna o token gerado para o usuario

### Exceções

✅ Retorna erro 404 se a API não existir
✅ Retorna erro 400 se email ou password
✅ Retorna erro 400 se password nao for valida
✅ Retorna erro 400 se o campo email for um e-mail inválido
✅ Retorna erro 403 se o email fornecido nao existe no banco
✅ Retorna erro 500 se der erro ao tentar gerar o token de acesso
