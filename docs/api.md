> ### POST /users
>
>> Cria um novo usuário
>
> Deve receber _name_, _username_ e _password_ via corpo da requisição:
> ```json
> {
>   "name": "Nome do Usuário",
>   "username": "nome.usuario",
>   "password": "senhadousuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 201 Created
>>
>> ```json
>> {
>>   "username": "nome.usuario"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: usuário já existente):
>> - Status 422 Unprocessable Entity
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### POST /users/login
>
>> Autentica um usuário existente
>
> Deve receber _username_ e _password_ via corpo da requisição:
> ```json
> {
>   "username": "nome.usuario",
>   "password": "senhadousuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 200 Ok
>>
>> ```json
>> {
>>   "username": "nome.usuario"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: usuário e/ou senha incorretos):
>> - Status 422 Unprocessable Entity
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### POST /project
>
>> Cria um novo projeto
>
> Deve receber _cost_, _deadline_, _title_ e _zip_code_ via corpo da requisição:
> ```json
> {
>   "cost": 1000,
>   "deadline": "2022-12-02",
>   "title": "Nome do projeto",
>   "zip_code": "26700000"
> }
> ```
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 201 Created
>>
>> ```json
>> {
>>  "id": "uuid",
>>  "title": "'Nome do projeto'",
>>  "zip_code": "26700000",
>>  "cost": 1000,
>>  "done": false,
>>  "deadline": "2022-12-02T00:00:00.000Z",
>>  "username": "nome.usuario",
>>  "created_at": "2022-12-01T00:00:00.000Z",
>>  "updated_at": "2022-12-01T00:00:00.000Z"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### GET /project/:id
>
>> Busca um projeto pelo _id_
>
> Deve receber _id_ como parâmetro na rota
>
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 200 Ok
>>
>> ```json
>> {
>>  "id": "uuid",
>>  "title": "'Nome do projeto'",
>>  "location": "Mendes/RJ",
>>  "cost": 1000,
>>  "done": false,
>>  "deadline": "2022-12-02T00:00:00.000Z",
>>  "username": "nome.usuario",
>>  "created_at": "2022-12-01T00:00:00.000Z",
>>  "updated_at": "2022-12-01T00:00:00.000Z"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: projeto não encontrado):
>> - Status 404 Not Found
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### GET /projects
>
>> Busca todos os projetos
>
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 200 Ok
>>
>> ```json
>> {
>>   "projects": [
>>     {
>>       "id": "uuid",
>>       "title": "'Nome do projeto'",
>>       "location": "Mendes/RJ",
>>       "cost": 1000,
>>       "done": false,
>>       "deadline": "2022-12-02T00:00:00.000Z",
>>       "username": "nome.usuario",
>>       "created_at": "2022-12-01T00:00:00.000Z",
>>       "updated_at": "2022-12-01T00:00:00.000Z"
>>     }
>>   ]
>> }
>> ```
>
> ---
>
> Retorno (nenhum projeto encontrado):
>> - Status 200 Ok
>>
>> ```json
>> {
>>   "projects": []
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### PATCH /projects/:id/done
>
>> Marca um projeto como concluído
>
> Deve receber _id_ como parâmetro na rota
>
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 200 Ok
>>
>> ```json
>> {
>>   "id": "uuid",
>>   "title": "'Nome do projeto'",
>>   "zip_code": "26700000",
>>   "cost": 1000,
>>   "done": true,
>>   "deadline": "2022-12-02T00:00:00.000Z",
>>   "username": "nome.usuario",
>>   "created_at": "2022-12-01T00:00:00.000Z",
>>   "updated_at": "2022-12-01T00:00:00.000Z"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: o projeto não é do usuário):
>> - Status 403 Forbidden
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### PUT /project/:id
>
>> Altera as informações de um projeto
>
> Deve receber _id_ como parâmetro na rota
>
> Deve receber _cost_, _deadline_, _title_ e _zip_code_ via corpo da requisição:
> ```json
> {
>   "cost": 2000,
>   "deadline": "2023-11-03",
>   "title": "Nome do projeto atualizado",
>   "zip_code": "88010400"
> }
> ```
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 200 Ok
>>
>> ```json
>> {
>>   "id": "uuid",
>>   "title": "'Nome do projeto atualizado'",
>>   "zip_code": "88010400",
>>   "cost": 2000,
>>   "done": false,
>>   "deadline": "2023-11-03T00:00:00.000Z",
>>   "username": "nome.usuario",
>>   "created_at": "2022-12-01T00:00:00.000Z",
>>   "updated_at": "2022-12-01T00:00:00.000Z"
>> }
>> ```
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: o projeto não é do usuário):
>> - Status 403 Forbidden
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```

> ### DELETE /project/:id
>
>> Exclui um projeto
>
> Deve receber _id_ como parâmetro na rota
>
> Deve receber _username_ via header da requisição:
> ```json
> {
>   "username": "nome.usuario"
> }
> ```
>
> ---
>
> Retorno (sucesso):
>> - Status 204 No Content
>
> ---
>
> Retorno (erro: validação):
>> - Status 400 Bad Request
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
>
> ---
>
> Retorno (erro: o projeto não é do usuário):
>> - Status 403 Forbidden
>>
>> ```json
>> {
>>   "message": "Mensagem de erro"
>> }
>> ```
