import { Collection, Db, MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Conectar ao banco de dados MongoDB
export async function conectarAoBancoDeDados(): Promise<Db> {
  const url = 'mongodb://localhost:27017';
  const dbName = 'controle-financeiro';

  const client = await MongoClient.connect(url);
  return client.db(dbName);
}

// Proteção contra Injeção de Código (Exemplo: Consulta parametrizada)
export async function consultarUsuarioPorNome(db: Db, nome: string): Promise<any> {
  const collection: Collection = db.collection('usuarios');
  const usuario = await collection.findOne({ nome: { $eq: nome } });
  return usuario;
}

// Evitar execução de código arbitrário (Exemplo: Validar e sanitizar entrada do usuário)
export function validarEntradaUsuario(entrada: string): boolean {
  // Implemente lógica de validação/sanitização adequada
  return entrada.length > 0;
}

// Implementar sistema robusto de autenticação
export async function autenticarUsuario(db: Db, nome: string, senha: string): Promise<boolean> {
  const collection: Collection = db.collection('usuarios');
  const usuario = await collection.findOne({ nome: { $eq: nome } });

  if (usuario) {
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    return senhaCorreta;
  }

  return false;
}

// Gerenciar sessões de usuário de forma segura usando tokens JWT
export function gerarTokenJWT(usuarioId: string): string {
  const segredo = 'seuSegredoJWT';

  const token = jwt.sign({ id: usuarioId }, segredo, { expiresIn: '1h' });
  return token;
}

// Configurar autorizações apropriadas (Exemplo: Middleware de autorização)
export function verificarAutorizacao(req: any, res: any, next: any): void {
  const token = req.headers.authorization;

  if (token) {
    const segredo = 'seuSegredoJWT';

    jwt.verify(token, segredo, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ mensagem: 'Token inválido' });
      } else {
        // Decodificado com sucesso, você pode adicionar informações ao objeto de solicitação se desejar
        req.usuario = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ mensagem: 'Token ausente' });
  }
}


