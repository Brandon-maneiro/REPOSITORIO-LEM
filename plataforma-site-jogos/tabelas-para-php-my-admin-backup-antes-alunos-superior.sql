-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15/10/2025 às 20:16
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `jogosdolem`
--
CREATE DATABASE IF NOT EXISTS `jogosdolem` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `jogosdolem`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `combinar`
--

CREATE TABLE `combinar` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `perguntas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`perguntas`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `combinar`
--

INSERT INTO `combinar` (`id`, `nome`, `descricao`, `autor`, `perguntas`) VALUES
(2, 'Test', 'Quiz pego do wordwall para fins de teste', 'João / Wordwall', '[{\"pergunta\":\"O dobro de um número\",\"resposta\":\"2x\"},{\"pergunta\":\"O quadrado da soma de dois números.\",\"resposta\":\"(x+y)²\"},{\"pergunta\":\"A diferença entre dois números.\",\"resposta\":\"x-y\"},{\"pergunta\":\"A terça parte de um número\",\"resposta\":\"x/3\"},{\"pergunta\":\"A diferença entre um número e 8.\",\"resposta\":\"x-8\"},{\"pergunta\":\"A diferença entre um número e a metade dele.\",\"resposta\":\"x-x/2\"},{\"pergunta\":\"A soma de dois números.\",\"resposta\":\"x+y\"},{\"pergunta\":\"O triplo de um número.\",\"resposta\":\"3x\"},{\"pergunta\":\"A quarta parte de um número menos 5.\",\"resposta\":\"x/4-5\"}]'),
(13, 'Geometria', '', 'Diego', '[{\"pergunta\":\"Polígono de 5 lados\",\"resposta\":\"Pentágono\"},{\"pergunta\":\"Medida do ângulo reto\",\"resposta\":\"90º\"},{\"pergunta\":\"Metade do diâmetro\",\"resposta\":\"raio\"}]');

-- --------------------------------------------------------

--
-- Estrutura para tabela `nonogram`
--

CREATE TABLE `nonogram` (
  `id` int(11) NOT NULL,
  `nome` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nonogram`
--

INSERT INTO `nonogram` (`id`, `nome`) VALUES
(1, '5X5'),
(2, '10X10'),
(3, '15X15');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pontuacao`
--

CREATE TABLE `pontuacao` (
  `usuarioId` int(11) NOT NULL,
  `jogoId` int(11) NOT NULL,
  `pontuacao` varchar(20) NOT NULL,
  `total` varchar(20) DEFAULT NULL,
  `tempo` varchar(20) DEFAULT NULL,
  `erros` int(11) DEFAULT NULL,
  `jogoNome` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pontuacao`
--

INSERT INTO `pontuacao` (`usuarioId`, `jogoId`, `pontuacao`, `total`, `tempo`, `erros`, `jogoNome`) VALUES
(16, 1, '178', NULL, '07:58', NULL, 'hanoi'),
(16, 27, '8', '20', '', 0, 'questionario'),
(12, 27, '11', '20', '', 0, 'questionario'),
(24, 27, '15', '20', '', 0, 'questionario'),
(30, 27, '10', '20', '', 0, 'questionario'),
(14, 27, '8', '20', '', 0, 'questionario'),
(29, 27, '6', '20', '', 0, 'questionario'),
(13, 27, '9', '20', '', 0, 'questionario'),
(28, 27, '7', '20', '', 0, 'questionario'),
(26, 27, '5', '20', '', 0, 'questionario'),
(22, 27, '2', '20', '', 0, 'questionario'),
(24, 1, '17', '', '00:00', 0, 'tabuada'),
(13, 1, '2', '', '00:01', 2, 'tabuada'),
(28, 1, '5', '', '00:01', 0, 'tabuada'),
(14, 1, '5', '', '00:00', 1, 'tabuada'),
(12, 1, '27', '', '00:01', 0, 'tabuada'),
(16, 1, '24', '', '00:00', 0, 'tabuada'),
(29, 1, '8', '', '00:00', 0, 'tabuada'),
(30, 1, '20', '', '00:00', 0, 'tabuada'),
(26, 1, '12', '', '00:00', 0, 'tabuada'),
(14, 1, '15', '', '00:00', 0, 'tabuada'),
(24, 1, '20', '', '00:01', 0, 'tabuada'),
(13, 1, '11', '', '00:00', 0, 'tabuada'),
(12, 1, '22', '', '00:00', 0, 'tabuada'),
(16, 1, '24', '', '00:00', 0, 'tabuada'),
(28, 1, '6', '', '00:00', 1, 'tabuada'),
(29, 1, '7', '', '00:00', 0, 'tabuada'),
(30, 1, '16', '', '00:00', 1, 'tabuada'),
(22, 1, '4', '', '00:00', 0, 'tabuada'),
(26, 1, '17', '', '00:01', 1, 'tabuada'),
(13, 1, '16', '', '00:00', 3, 'tabuada'),
(16, 1, '26', '', '00:01', 0, 'tabuada'),
(12, 1, '25', '', '00:01', 1, 'tabuada'),
(14, 1, '14', '', '00:01', 0, 'tabuada'),
(28, 1, '6', '', '00:01', 6, 'tabuada'),
(24, 1, '26', '', '00:00', 0, 'tabuada'),
(22, 1, '1', '', '00:01', 2, 'tabuada'),
(30, 1, '18', '', '00:00', 0, 'tabuada'),
(29, 1, '6', '', '00:00', 0, 'tabuada'),
(13, 1, '12', '', '00:00', 6, 'tabuada'),
(28, 1, '8', '', '00:00', 2, 'tabuada'),
(14, 1, '12', '', '00:00', 3, 'tabuada'),
(24, 1, '25', '', '00:01', 0, 'tabuada'),
(12, 1, '21', '', '00:00', 1, 'tabuada'),
(30, 1, '8', '', '00:00', 0, 'tabuada'),
(29, 1, '9', '', '00:00', 1, 'tabuada'),
(13, 1, '16', '', '00:00', 1, 'tabuada'),
(16, 1, '23', '', '00:00', 0, 'tabuada'),
(28, 1, '12', '', '00:00', 2, 'tabuada'),
(22, 1, '3', '', '00:00', 0, 'tabuada'),
(26, 1, '13', '', '00:01', 0, 'tabuada'),
(24, 1, '24', '', '00:00', 0, 'tabuada'),
(12, 1, '24', '', '00:00', 0, 'tabuada'),
(14, 1, '45', '', '00:01', 0, 'tabuada'),
(13, 1, '21', '', '00:00', 1, 'tabuada'),
(28, 1, '9', '', '00:00', 3, 'tabuada'),
(29, 1, '5', '', '00:00', 2, 'tabuada'),
(16, 1, '24', '', '00:01', 0, 'tabuada'),
(30, 1, '19', '', '00:00', 0, 'tabuada'),
(24, 1, '29', '', '00:00', 0, 'tabuada'),
(26, 1, '20', '', '00:01', 0, 'tabuada'),
(12, 1, '25', '', '00:00', 1, 'tabuada'),
(22, 1, '8', '', '00:00', 0, 'tabuada'),
(14, 1, '11', '', '00:00', 2, 'tabuada'),
(16, 1, '27', '', '00:00', 1, 'tabuada'),
(29, 1, '14', '', '00:00', 2, 'tabuada'),
(28, 1, '7', '', '00:00', 1, 'tabuada'),
(30, 1, '20', '', '00:01', 0, 'tabuada'),
(13, 1, '18', '', '00:00', 5, 'tabuada'),
(22, 1, '6', '', '00:00', 5, 'tabuada'),
(26, 1, '21', '', '00:00', 1, 'tabuada'),
(12, 1, '28', '', '00:01', 0, 'tabuada'),
(29, 1, '11', '', '00:01', 2, 'tabuada'),
(28, 1, '6', '', '00:00', 10, 'tabuada'),
(13, 1, '21', '', '00:00', 2, 'tabuada'),
(30, 1, '21', '', '00:00', 0, 'tabuada'),
(14, 1, '9', '', '00:00', 1, 'tabuada'),
(16, 1, '29', '', '00:00', 0, 'tabuada'),
(22, 1, '2', '', '00:00', 2, 'tabuada'),
(24, 1, '27', '', '00:00', 0, 'tabuada'),
(26, 1, '19', '', '00:01', 0, 'tabuada'),
(29, 1, '26', '', '00:01', 1, 'tabuada'),
(28, 1, '12', '', '00:00', 3, 'tabuada'),
(12, 1, '24', '', '00:01', 1, 'tabuada'),
(13, 1, '17', '', '00:01', 9, 'tabuada'),
(22, 1, '6', '', '00:00', 4, 'tabuada'),
(16, 1, '29', '', '00:00', 0, 'tabuada'),
(26, 1, '24', '', '00:00', 3, 'tabuada'),
(14, 1, '2', '', '00:00', 6, 'tabuada'),
(12, 1, '20', '', '00:00', 0, 'tabuada'),
(28, 1, '164', NULL, '06:52', NULL, 'hanoi'),
(28, 1, '5', NULL, NULL, NULL, 'snake'),
(28, 1, '2', NULL, NULL, NULL, 'genius'),
(28, 1, '9', NULL, NULL, NULL, 'genius'),
(30, 1, '3', '8', NULL, 5, 'caixas'),
(16, 1, '5', '8', NULL, 3, 'caixas'),
(29, 1, '2', '8', NULL, 6, 'caixas'),
(12, 1, '5', '8', NULL, 3, 'caixas'),
(14, 1, '4', '8', NULL, 4, 'caixas'),
(24, 1, '6', '8', NULL, 2, 'caixas'),
(13, 1, '1', '8', NULL, 7, 'caixas'),
(26, 1, '4', '8', NULL, 4, 'caixas'),
(14, 1, '1', '', '', 0, 'maior-menor'),
(30, 1, '1', '', '', 0, 'maior-menor'),
(13, 1, '00000180', '1', NULL, NULL, 'brick-breaker'),
(13, 1, '00000150', '1', NULL, NULL, 'brick-breaker'),
(13, 1, '00000410', '2', NULL, NULL, 'brick-breaker'),
(13, 1, '00000150', '1', NULL, NULL, 'brick-breaker'),
(24, 1, '1', '', '', 0, 'maior-menor'),
(13, 1, '00000180', '1', NULL, NULL, 'brick-breaker'),
(14, 1, '1', '', '', 0, 'maior-menor'),
(14, 1, '1', '', '', 0, 'maior-menor'),
(13, 1, '00000070', '1', NULL, NULL, 'brick-breaker'),
(13, 1, '00000120', '1', NULL, NULL, 'brick-breaker'),
(13, 1, '00000070', '1', NULL, NULL, 'brick-breaker'),
(30, 1, '1', '', '', 0, 'maior-menor'),
(13, 1, '00000310', '2', NULL, NULL, 'brick-breaker'),
(13, 1, '00000110', '1', NULL, NULL, 'brick-breaker'),
(29, 1, '200', NULL, NULL, NULL, 'tetris'),
(13, 1, '300', NULL, NULL, NULL, 'tetris'),
(22, 1, '200', NULL, NULL, NULL, 'tetris'),
(28, 1, '300', NULL, NULL, NULL, 'tetris'),
(29, 1, '100', NULL, NULL, NULL, 'tetris'),
(13, 1, '200', NULL, NULL, NULL, 'tetris'),
(22, 1, '100', NULL, NULL, NULL, 'tetris'),
(28, 1, '300', NULL, NULL, NULL, 'tetris'),
(29, 1, '700', NULL, NULL, NULL, 'tetris'),
(13, 1, '700', NULL, NULL, NULL, 'tetris'),
(22, 1, '100', NULL, NULL, NULL, 'tetris'),
(28, 1, '200', NULL, NULL, NULL, 'tetris'),
(13, 1, '600', NULL, NULL, NULL, 'tetris'),
(22, 1, '200', NULL, NULL, NULL, 'tetris'),
(29, 1, '1100', NULL, NULL, NULL, 'tetris'),
(13, 1, '400', NULL, NULL, NULL, 'tetris'),
(28, 1, '100', NULL, NULL, NULL, 'tetris'),
(28, 1, '100', NULL, NULL, NULL, 'tetris'),
(29, 1, '1300', NULL, NULL, NULL, 'tetris'),
(13, 1, '900', NULL, NULL, NULL, 'tetris'),
(29, 1, '200', NULL, NULL, NULL, 'tetris'),
(22, 1, '400', NULL, NULL, NULL, 'tetris'),
(1, 1, '00002700', '4', NULL, NULL, 'brick-breaker'),
(1, 1, '36500', NULL, NULL, NULL, 'tetris'),
(1, 1, '1272', '146', NULL, NULL, '2048');

-- --------------------------------------------------------

--
-- Estrutura para tabela `questionarios`
--

CREATE TABLE `questionarios` (
  `id` int(11) NOT NULL,
  `nome_questionario` varchar(50) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `perguntas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`perguntas`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `questionarios`
--

INSERT INTO `questionarios` (`id`, `nome_questionario`, `descricao`, `autor`, `perguntas`) VALUES
(1, 'Quiz do LEM', 'Teste quiz do lem v2', 'João', '{\"0\":{\"pergunta\":\"Em um avião há 4 romanos e 1 inglês. Qual o nome da aeromoça?\",\"respostas\":[\"Luiza\",\"Leticia\",\"Ivone\",\"Maria\",\"\",\"\"],\"respostaCerta\":\"Ivone\"},\"1\":{\"pergunta\":\"A mãe de Henrique teve 4 filhos: Abril, Maio e Junho foram os três primeiros. Qual o nome do quarto?\",\"respostas\":[\"Agosto\",\"Setembro\",\"Julho\",\"Henrique\",\"\",\"\"],\"respostaCerta\":\"Henrique\"},\"2\":{\"pergunta\":\"Uma mulher tem 30 reais para dividir entre suas duas filhas. Que horas são?\",\"respostas\":[\"21:55\",\"13:45\",\"02:30\",\"15:00\",\"\",\"\"],\"respostaCerta\":\"13:45\"},\"3\":{\"pergunta\":\"Se ontem fosse amanhã, hoje seria sexta-feira. Que dia é hoje?\",\"respostas\":[\"Segunda-feira\",\"Quarta-feira\",\"Sexta-feira\",\"Domingo\",\"\",\"\"],\"respostaCerta\":\"Quarta-feira\"},\"4\":{\"pergunta\":\"O relâmpago é visto antes de ser ouvido porque a luz viaja mais rápido que o som.\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Verdadeiro\"},\"5\":{\"pergunta\":\"O Monte Fuji é a montanha mais alta do japão.\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Verdadeiro\"},\"6\":{\"pergunta\":\"Tomates são frutas.\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Verdadeiro\"},\"7\":{\"pergunta\":\"Em Ohio, EUA, é ilegal embriagar um peixe\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Falso\"},\"8\":{\"pergunta\":\"Todos os mamíferos vivem em terra.\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Falso\"},\"9\":{\"pergunta\":\"Uma fábrica produz barras de chocolates no formato de paralelepípedos e de cubos, com o mesmo volume. As arestas da barra de chocolate no formato de paralelepípedo medem 3 cm de largura, 18 cm de comprimento e 4 cm de espessura. Analisando as características das figuras geométricas descritas, a medida das arestas dos chocolates que têm o formato de cubo é igual a\",\"respostas\":[\"5 cm\",\"6 cm\",\"12 cm\",\"24 cm\",\"25 cm\",\"\"],\"respostaCerta\":\"6 cm\"}}'),
(3, 'Dízimas Periódicas', 'Questões envolvendo dizimas', 'João', '{\"0\":{\"pergunta\":\"(PUC - RJ) A soma de 1,3333... + 0,1666666... é igual a:\",\"respostas\":[\"1/2\",\"5/2\",\"4/3\",\"5/3\",\"3/2\",\"\"],\"respostaCerta\":\"3/2\"},\"1\":{\"pergunta\":\"A fração: 12/45. Podemos afirmar que ela é a fração geratriz da dízima:\",\"respostas\":[\"2,77\",\"0,62626262...\",\"2,55...\",\"0.2666...\",\"0,27272727...\",\"\"],\"respostaCerta\":\"0.2666...\"},\"2\":{\"pergunta\":\"(MS Concursos) Sejam x e y dois números reais, sendo x = 2,333... e y = 0,1212..., dízimas periódicas. A soma das frações geratrizes de x e y é:\",\"respostas\":[\"7/3\",\"4/33\",\"27/11\",\"27/33\",\"27/3\",\"\"],\"respostaCerta\":\"27/11\"},\"3\":{\"pergunta\":\"Seja x = 1,123123... A diferença entre o numerador e o denominador da sua representação fracionária é:\",\"respostas\":[\"123\",\"999\",\"321\",\"112\",\"1122\",\"\"],\"respostaCerta\":\"123\"},\"4\":{\"pergunta\":\"A fração geratriz da dizima periódica 3,151515... é igual a:\",\"respostas\":[\"104/33\",\"15/99\",\"5/33\",\"115/99\",\"18/99\",\"\"],\"respostaCerta\":\"104/33\"},\"5\":{\"pergunta\":\"(TRT) Renato dividiu dois números inteiros positivos em sua calculadora e obteve como resultado a dízima periódica 0,454545... Se a divisão tivesse sido feita na outra ordem, ou seja, o maior dos dois números dividido pelo menor deles, o resultado obtido por Renato na calculadora teria sido:\",\"respostas\":[\"0,22.\",\"0,222...\",\"2,22.\",\"2,222...\",\"2,2.\",\"\"],\"respostaCerta\":\"2,2.\"},\"6\":{\"pergunta\":\"A fração geratriz da dízima 1,52222... é?\",\"respostas\":[\"133/99\",\"90/134\",\"137/90\",\"135/90\",\"2/9\",\"\"],\"respostaCerta\":\"137/90\"},\"7\":{\"pergunta\":\"(EFOMM - 2021) Toda dízima periódica pode ser escrita de forma de sua fração geratriz. Considerando a fração geratriz 22229/27027, então o digito que ocupará a 50ª casa decimal é\",\"respostas\":[\"2\",\"3\",\"4\",\"7\",\"8\",\"\"],\"respostaCerta\":\"2\"},\"8\":{\"pergunta\":\"Assinale a alternativa que corresponde a uma dízima periódica composta.\",\"respostas\":[\"3,14159284...\",\"2,21111\",\"0,3333...\",\"1,21111...\",\"\",\"\"],\"respostaCerta\":\"1,21111...\"},\"9\":{\"pergunta\":\"(TJ CE - ESAF). Qual a fração que dá origem à dízima 2,54646... em representação decimal?\",\"respostas\":[\"2.521/990\",\"2.546/999\",\"2.546/990\",\"2.546/900\",\"2.521/999\",\"\"],\"respostaCerta\":\"2.521/990\"}}'),
(4, 'Matematica', 'Matematica', 'Diego', '{\"0\":{\"pergunta\":\"Qual o único número primo que é par?\",\"respostas\":[\"2\",\"3\",\"0\",\"7\",\"12\",\"4\"],\"respostaCerta\":\"2\"},\"1\":{\"pergunta\":\"O quadrado é um retângulo?\",\"respostas\":[\"Verdadeiro\",\"Falso\",\"\",\"\",\"\",\"\"],\"respostaCerta\":\"Verdadeiro\"},\"2\":{\"pergunta\":\"O que pode se dizer em relação aos números 10/5 e a raiz quadrada de 4?\",\"respostas\":[\"10/5 é maior\",\"São iguais\",\"10/5 é menor\",\"\",\"\",\"\"],\"respostaCerta\":\"São iguais\"},\"3\":{\"pergunta\":\"Qual o sinal de uma potência de um número negativo?\",\"respostas\":[\"Sempre positivo\",\"Sempre negativo\",\"Depende apenas da base\",\"Depende da base e do expoente\",\"\",\"\"],\"respostaCerta\":\"Depende da base e do expoente\"},\"4\":{\"pergunta\":\"Qual o valor de i elevado a potência 11?\",\"respostas\":[\"1\",\"i\",\"-1\",\"-i\",\"11\",\"\"],\"respostaCerta\":\"-i\"}}'),
(22, 'Questionário de Decimais', 'Questionario com perguntas sobre decimais', 'João', '{\"0\":{\"pergunta\":\"Mariana foi até a padaria e comprou um pedaço de torta de frango por R$ 6,50, um copo de suco por R$ 5,25 e, de sobremesa, dois brigadeiros por R$ 0,75 cada. O valor total pago por ela foi de:\",\"respostas\":[\"R$ 13,25\",\"R$ 12,50\",\"R$ 11,75\",\"R$ 10,00\",\"R$ 7,50\",\"\"],\"respostaCerta\":\"R$ 13,25\"},\"1\":{\"pergunta\":\"Para fazer a decoração de Natal, seu Jerivaldo decidiu alugar um forro para a sua mesa. O comprimento e a largura do forro são de 2,20 metros e 1,10 metros, respectivamente. Podemos afirmar que a área da peça é de:\",\"respostas\":[\"2,30 m²\",\"2,42 m²\",\"2,50 m²\",\"2,69 m²\",\"2,85 m²\",\"\"],\"respostaCerta\":\"2,42 m²\"},\"2\":{\"pergunta\":\"Durante o ano, um dos itens com valor que sofreu aumentos consecutivos foi a carne bovina. Em um supermercado, no início de janeiro, pagava-se R$ 22,50 pelo quilo de determinada carne. Após os sucessivos aumentos, essa carne passou a custar R$ 39,90 em dezembro. A diferença paga por um cliente que comprou 2,5 kg desse produto em dezembro e em janeiro é igual a:\",\"respostas\":[\"R$ 99,75\",\"R$ 56,25\",\"R$ 43,50\",\"R$ 39,90\",\"R$ 30,75\",\"\"],\"respostaCerta\":\"R$ 43,50\"},\"3\":{\"pergunta\":\"Ao abastecer seu veículo, um cliente pagou R$ 145,20. Sabendo que o litro de combustível naquele dia custava R$ 6,60, a quantidade de combustível colocada no veículo foi igual a:\",\"respostas\":[\"11 litros\",\"12 litros\",\"15 litros\",\"18 litros\",\"22 litros\",\"\"],\"respostaCerta\":\"22 litros\"},\"4\":{\"pergunta\":\"Para ladrilhar determinada região, foram utilizados 32 pisos de cerâmica com 25,8 cm² cada. Portanto, a área dessa região é igual a:\",\"respostas\":[\"825,6 cm³\",\"735,4 cm³\",\"690,0 cm³\",\"642,2 cm³\",\"512,0 cm³\",\"\"],\"respostaCerta\":\"825,6 cm³\"},\"5\":{\"pergunta\":\"O Índice de Massa Corporal (IMC) é calculado pela massa dividida pelo quadrado da altura. Uma pessoa que possui 1,80 metro e pesa 80 kg tem um IMC igual a, aproximadamente:\",\"respostas\":[\"22,8\",\"24,7\",\"25,3\",\"26,0\",\"27,5\",\"\"],\"respostaCerta\":\"24,7\"},\"6\":{\"pergunta\":\"Durante a copa do mundo, é comum a venda de figurinhas para álbuns nas bancas de revistas. Durante um mês, uma banca vendeu um total de 823 pacotes de figurinhas. Sabendo que cada pacote é vendido por R$ 2,50, qual foi o faturamento dessa loja com as vendas?\",\"respostas\":[\"R$ 1625,00\",\"R$ 1980,00\",\"R$ 2057,50\",\"R$ 2120,50\",\"R$ 2300,00\",\"\"],\"respostaCerta\":\"R$ 2057,50\"}}'),
(27, 'MARATONA DE MATEMÁTICA', '', 'João', '{\"0\":{\"pergunta\":\"Qual o próximo número? 25, 24, 22, 19, 15\",\"respostas\":[\"8\",\"12\",\"13\",\"10\",\"9\",\"\"],\"respostaCerta\":\"10\"},\"1\":{\"pergunta\":\"Se são precisos 5 minutos para 5 máquinas produzirem 5 produtos, quanto tempo demorariam 100 máquinas a produzir 100 produtos?\",\"respostas\":[\"10 minutos\",\"100 minutos\",\"1000 minutos\",\"5 minutos\",\"\",\"\"],\"respostaCerta\":\"5 minutos\"},\"2\":{\"pergunta\":\"Alguns meses têm 30 dias, outros 31. Quantos têm 28 dias?\",\"respostas\":[\"1\",\"2\",\"Nenhum\",\"12\",\"\",\"\"],\"respostaCerta\":\"12\"},\"3\":{\"pergunta\":\"Quando entrei em um táxi, escontrei 9 passageiros. Depois de alguns minutos, desceram duas pessoas e entrou uma. Quantas pessoas há no táxi.\",\"respostas\":[\"7\",\"8\",\"9\",\"10\",\"11\",\"\"],\"respostaCerta\":\"10\"},\"4\":{\"pergunta\":\"Qual o quinto número primo?\",\"respostas\":[\"7\",\"11\",\"13\",\"9\",\"10\",\"\"],\"respostaCerta\":\"11\"},\"5\":{\"pergunta\":\"CALCULE RÁPIDO: 5+5x5+5 = ?\",\"respostas\":[\"55\",\"60\",\"35\",\"100\",\"65\",\"\"],\"respostaCerta\":\"35\"},\"6\":{\"pergunta\":\"João tem 23 anos. Se ele tivesse nascido 10 anos atrás que idade ele teria hoje?\",\"respostas\":[\"10\",\"12\",\"13\",\"20\",\"33\",\"\"],\"respostaCerta\":\"10\"},\"7\":{\"pergunta\":\"Minha tia tem 2 filhos a mais do que minha mãe. Se as duas juntas tem 8 filhos. Quantos filhos minha tia tem?\",\"respostas\":[\"7\",\"5\",\"3\",\"4\",\"6\",\"\"],\"respostaCerta\":\"5\"},\"8\":{\"pergunta\":\"Meu avô tem 4 filhos e cada filho tem 4 filhos. Quantos primos eu tenho?\",\"respostas\":[\"10\",\"16\",\"12\",\"15\",\"\",\"\"],\"respostaCerta\":\"12\"},\"9\":{\"pergunta\":\"Uma garrafa com sua rolha custa R$ 1,10. Sabendo que a garrafa custa R$ 1,00 a mais que a rolha, qual é o preço da rolha?\",\"respostas\":[\"R$ 0,05\",\"R$ 0,10\",\"R$ 0,15\",\"R$ 0,20\",\"R$ 1,00\",\"\"],\"respostaCerta\":\"R$ 0,05\"},\"10\":{\"pergunta\":\"Você está em uma corrida de carro, ao ultrapassar o segundo colocado em que posição você fica?\",\"respostas\":[\"Primeiro\",\"Segundo\",\"Terceiro\",\"Desclassificado\",\"\",\"\"],\"respostaCerta\":\"Segundo\"},\"11\":{\"pergunta\":\"Um tijolo pesa 1Kg mais meio tijolo. Quanto pesa este tijolo?\",\"respostas\":[\"1kg\",\"1,5kg\",\"2kg\",\"3kg\",\"0,5kg\",\"\"],\"respostaCerta\":\"2kg\"},\"12\":{\"pergunta\":\"Eu tenho uma certa quantidade de livros, minha irmã tem o dobro de livros que eu tenho. Se juntos temos 60 livros. Quanto livros eu tenho?\",\"respostas\":[\"20\",\"25\",\"30\",\"40\",\"45\",\"\"],\"respostaCerta\":\"20\"},\"13\":{\"pergunta\":\"Andando por uma rua, um homem conta 10 árvores à sua direita. Na volta, conta 10 árvores à sua esquerda. Quantas árvores ele viu no total?\",\"respostas\":[\"10\",\"15\",\"20\",\"30\",\"\",\"\"],\"respostaCerta\":\"10\"},\"14\":{\"pergunta\":\"O Sr. Smith tem 4 filhas. Cada uma de suas filhas tem 1 irmão. Quantos filhos Sr. Smith tem ao todo?\",\"respostas\":[\"5\",\"6\",\"7\",\"8\",\"9\",\"\"],\"respostaCerta\":\"5\"},\"15\":{\"pergunta\":\"Quando eu tinha seis anos, a minha irmã tinha a metade da minha idade. Agora que tenho 70 anos, com quantos anos minha irmã está?\",\"respostas\":[\"35\",\"67\",\"40\",\"37\",\"\",\"\"],\"respostaCerta\":\"67\"},\"16\":{\"pergunta\":\"Existem 100 pares de cães num canil. Nascem dois pares de filhotes para cada cão. Infelizmente, 23 cãezinhos não sobreviveram após o parto. Quantos cães restaram no total?\",\"respostas\":[\"556\",\"187\",\"977\",\"577\",\"337\",\"\"],\"respostaCerta\":\"977\"},\"17\":{\"pergunta\":\"Um homem rouba 100 reais de uma loja de roupas. Na sequência, o ladrão cara de pau volta para essa mesma loja e compra uma calça que custa 70 reais. Ele paga pela calça com a nota roubada e recebe 30 reais de troco. Quantos reais o dono da loja perdeu?\",\"respostas\":[\"30 reais\",\"70 reais\",\"100 reais\",\"200 reais\",\"O dono não perdeu nada\",\"\"],\"respostaCerta\":\"100 reais\"},\"18\":{\"pergunta\":\"Se ontem fosse amanhã, hoje seria sexta-feira. Que dia é hoje?\",\"respostas\":[\"Segunda-feira\",\"Quarta-feira\",\"Quinta-feira\",\"Sexta-feira\",\"Domingo\",\"\"],\"respostaCerta\":\"Quarta-feira\"},\"19\":{\"pergunta\":\"Maria comprou um vaso de flores por 20 reais e o vendeu por 25 reais. Arrependida da venda, comprou o mesmo vaso por 35 reais, mas logo decidiu vendê-lo por 40 reais. No final, quanto ela lucrou?\",\"respostas\":[\"20 reais\",\"25 reais\",\"5 reais\",\"10 reais\",\"Maria não lucrou\",\"\"],\"respostaCerta\":\"10 reais\"}}');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quizes`
--

CREATE TABLE `quizes` (
  `id` int(11) NOT NULL,
  `pergunta` longtext DEFAULT NULL,
  `resposta1` varchar(50) DEFAULT NULL,
  `resposta2` varchar(50) DEFAULT NULL,
  `resposta3` varchar(50) DEFAULT NULL,
  `resposta4` varchar(50) DEFAULT NULL,
  `resposta_certa` varchar(50) DEFAULT NULL,
  `imagem` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `quizes`
--

INSERT INTO `quizes` (`id`, `pergunta`, `resposta1`, `resposta2`, `resposta3`, `resposta4`, `resposta_certa`, `imagem`) VALUES
(1, '123', '123', '123', '123', '123', '123', ''),
(2, 'Pedro é casado com Maria, eles têm quatro filhas e cada filha tem dois irmãos. O casal tem ainda três netos, filhos de uma das filhas. Nesse caso, o número de pessoas dessa família é.', '11', '13', '16', '12', '11', NULL),
(3, 'Qual o quinto número primo?', '11', '9', '13', '10', '11', NULL),
(4, 'Você está em uma corrida de carro, ao ultrapassar o segundo colocado em que posição você fica?', 'Segundo', 'Terceiro', 'Primeiro', 'Desclassificado', 'Segundo', NULL),
(5, 'João tem 23 anos. Se ele tivesse nascido 10 anos atrás que idade ele teria hoje?', '10', '13', '12', '20', '10', NULL),
(6, 'Um tijolo pesa 1Kg mais meio tijolo. Quanto pesa este tijolo?', '1kg', '1,5kg', '2kg', '3kg', '2kg', NULL),
(7, '', '83', '78', '87', '09', '87', '../imagens/quiz/pergunta_estacionamento.png'),
(8, 'Alguns meses têm 30 dias, outros 31. Quantos têm 28 dias?', '12', '1', '2', 'Nenhum', '12', NULL),
(9, 'Uma cobra está percorrendo uma caverna de 10 metros. Durante o dia, ela consegue andar dois metros. Porém, todas as noites, ela volta um metro. Em quanto tempo ela conseguirá chegar ao final da caverna?', '10 dias', '9 dias', '12 dias', '7 dias', '9 dias', NULL),
(10, 'O Sr. Smith tem 4 filhas. Cada uma de suas filhas tem 1 irmão. Quantos filhos Sr. Smith tem ao todo?', '5', '8', '9', '6', '5', NULL),
(11, 'Andando por uma rua, um homem conta 10 árvores à sua direita. Na volta, conta 10 árvores à sua esquerda. Quantas árvores ele viu no total?', '10', '20', '15', '30', '10', NULL),
(12, 'Se são precisos 5 minutos para 5 máquinas produzirem 5 produtos, quanto tempo demorariam 100 máquinas a produzir 100 produtos?', '5 Minutos', '10 Minutos', '100 Minutos', '1000 Minutos', '5 Minutos', NULL),
(13, 'Meu avô tem 4 filhos e cada filho tem 4 filhos. Quantos primos eu tenho?', '16', '15', '12', '10', '12', NULL),
(14, 'Uma mulher tem 30 reais para dividir entre suas duas filhas. Que horas são?', '13:45', '21:55', '15:00', '02:30', '13:45', NULL),
(15, 'Qual o próximo número? 25, 24, 22, 19, 15', '10', '13', '12', '8', '10', NULL),
(16, 'Quando eu tinha seis anos, a minha irmã tinha a metade da minha idade. Agora que tenho 70 anos, com quantos anos minha irmã está?', '67', '35', '40', '37', '67', NULL),
(17, 'Uma garrafa com sua rolha custa R$ 1,10. Sabendo que a garrafa custa R$ 1,00 a mais que a rolha, qual é o preço da rolha?', 'R$ 0,05', 'R$ 0,10', 'R$ 0,15', 'R$ 0,20', 'R$ 0,05', NULL),
(18, 'Em um avião há 4 romanos e 1 inglês. Qual o nome da aeromoça?', 'Maria', 'Letícia', 'Luiza', 'Ivone', 'Ivone', NULL),
(19, 'A mãe de Henrique teve 4 filhos: Abril, Maio e Junho foram os três primeiros. Qual o nome do quarto?', 'Henrique', 'Julho', 'Agosto', 'Setembro', 'Henrique', NULL),
(20, 'CALCULE RÁPIDO: 5+5x5+5 = ?', '35', '55', '100', '60', '35', NULL),
(21, 'Quando entrei em um táxi, escontrei 9 passageiros. Depois de alguns minutos, desceram duas pessoas e entrou uma. Quantas pessoas há no táxi.', '7', '8', '9', '10', '10', NULL),
(22, NULL, 'M', 'O', 'P', 'H', 'M', '../imagens/quiz/pergunta_numeros.png'),
(23, 'Qual o próximo número na sequência: 2, 10, 12, 16, 17, 18, 19', '20', '21', '200', '32', '200', NULL),
(24, 'Eu tenho uma certa quantidade de livros, minha irmã tem o dobro de livros que eu tenho. Se juntos temos 60 livros. Quanto livros eu tenho?', '20', '30', '40', '25', '20', NULL),
(25, 'Minha tia tem 2 filhos a mais do que minha mãe. Se as duas juntas tem 8 filhos. Quantos filhos minha tia tem?', '3', '5', '4', '6', '5', NULL),
(26, NULL, '13', '15', '17', '18', '17', '../imagens/quiz/pergunta_gato.jpg'),
(27, NULL, '1', '2', '3', '4', '2', '../imagens/quiz/pergunta_aneis_2.png'),
(28, NULL, '1', '2', '3', '4', '3', '../imagens/quiz/pergunta_piramide.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tabuada`
--

CREATE TABLE `tabuada` (
  `id` int(11) NOT NULL,
  `desafio` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tabuada`
--

INSERT INTO `tabuada` (`id`, `desafio`) VALUES
(1, '1 - Minuto'),
(2, '2 - Minutos'),
(3, '20 Acertos'),
(4, '50 Acertos'),
(5, '100 Acertos'),
(6, 'Sem erros');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `permissao` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `permissao`) VALUES
(1, 'João Vitor Rodrigues Morrudo', '10160145@restinga.ifrs.edu.br', 'lem2023', 'admin'),
(2, 'Diego Chaves', 'diego.chaves@restinga.ifrs.edu.br', 'M@t3m@tic@', 'admin'),
(3, 'Diana Marona', 'diana.marona@restinga.ifrs.edu.br', 'matematica', 'admin'),
(4, 'Artur Monitor', '10040335@aluno.restinga.ifrs.edu.br', 'joaogay', 'aluno'),
(6, 'André Bomfim', '10040237@restinga.ifrs.edu.br', '91399366', 'aluno'),
(7, 'marcos ph ', '10040346@aluno.restingaifrs.edu.br', 'Paimaeenzo141516', 'aluno'),
(11, 'Nicolas Silva Velloso', '10160223@aluno.restinga.ifrs.edu.br', '12072006', 'aluno'),
(12, 'Vinícius Morais da Piedade', '10160240@aluno.restinga.ifrs.edu.br', 'Viniciusmdap2105.', 'aluno'),
(13, 'Andrey newton da silva coleho', '10160167@aluno.restinga.ifrs.edu.br', 'andreynewton', 'aluno'),
(14, 'Dionatha olinto machado Fernandes ', '10040379@aluno.restinga.ifrs.edu.br', 'Diodio55', 'aluno'),
(15, 'Juan silva sant anna ', 'Jssantanna7@gmail.com', 'Juan#2212', 'aluno'),
(16, 'George Hanry Rodrigues Pinto ', '10040356@aluno.restinga.ifrs.edu.br', '09112006', 'aluno'),
(17, 'Giovanni Rodrigues Rotth ', 'giovannirodrigues1284@gmail.com', 'GILOKO1284', 'aluno'),
(18, 'Ayrton Myra Braile ', '10040310@restinga.ifrs.edu.br', '402412', 'aluno'),
(19, 'Felipe Lima de Souza ', '10160186@aluno.restinga.ifrs.edu.br', '11102005', 'aluno'),
(20, 'Gustavo Azevedo da Silveira', '10160143@restinga.ifrs.edu.br', 'Tonicoetinoc0', 'aluno'),
(21, 'joão vitor dos santos rodrigues de sousa ', 'joaotv855@gmail.com', 'Eusouele335', 'aluno'),
(22, 'Wesley Silveira Machado ', '10040366@aluno.restinga.ifrs.edu.br', 'Tatazinha22', 'aluno'),
(23, 'Nycole Oliveira da silva', '10160224@aluno.restinga.ifrs.edu.br', 'Nycole2007', 'aluno'),
(24, 'Nicolas Ribeiro Azevedo ', '10160222@aluno.restinga.ifrs.edu.br', 'naoseiman', 'aluno'),
(25, 'Gabrielly da Silva Maia', '10160234@aluno.restinga.ifrs.edu.br', '25136089*', 'aluno'),
(26, 'Vinícius Nunes de Oliveira', '10160236@aluno.restinga.ifrs.edu.br', '*#V03060306#*', 'aluno'),
(27, 'Leonardo Soares Athanasio ', '10040358@aluno.restinga.ifrs.edu.br', 'Pizza7519', 'aluno'),
(28, 'Beatriz Maciel Subtil Moura', '10140188@aluno.restinga.ifrs.edu.br', 'bio281792', 'aluno'),
(29, 'João Vitor Silva de Souza ', '10040389@aluno.restinga.ifrs.edu.br', '04122003', 'aluno'),
(30, 'Nycollas Anthony Carrilho ramires ', '10040397@aluno.restinga.ifrs.edu.br', '19022007', 'aluno');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `combinar`
--
ALTER TABLE `combinar`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `nonogram`
--
ALTER TABLE `nonogram`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `questionarios`
--
ALTER TABLE `questionarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `quizes`
--
ALTER TABLE `quizes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tabuada`
--
ALTER TABLE `tabuada`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `combinar`
--
ALTER TABLE `combinar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `nonogram`
--
ALTER TABLE `nonogram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `questionarios`
--
ALTER TABLE `questionarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `quizes`
--
ALTER TABLE `quizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `tabuada`
--
ALTER TABLE `tabuada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Banco de dados: `newschema`
--
CREATE DATABASE IF NOT EXISTS `newschema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `newschema`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `teest`
--

CREATE TABLE `teest` (
  `idteest` int(11) NOT NULL,
  `teestcol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `teest`
--
ALTER TABLE `teest`
  ADD PRIMARY KEY (`idteest`);
--
-- Banco de dados: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

--
-- Despejando dados para a tabela `pma__export_templates`
--

INSERT INTO `pma__export_templates` (`id`, `username`, `export_type`, `template_name`, `template_data`) VALUES
(1, 'root', 'server', 'LEM-banco_de_dados', '{\"quick_or_custom\":\"quick\",\"what\":\"sql\",\"db_select[]\":[\"jogosdolem\",\"newschema\",\"phpmyadmin\"],\"aliases_new\":\"\",\"output_format\":\"sendit\",\"filename_template\":\"@SERVER@\",\"remember_template\":\"on\",\"charset\":\"utf-8\",\"compression\":\"none\",\"maxsize\":\"\",\"codegen_structure_or_data\":\"data\",\"codegen_format\":\"0\",\"csv_separator\":\",\",\"csv_enclosed\":\"\\\"\",\"csv_escaped\":\"\\\"\",\"csv_terminated\":\"AUTO\",\"csv_null\":\"NULL\",\"csv_columns\":\"something\",\"csv_structure_or_data\":\"data\",\"excel_null\":\"NULL\",\"excel_columns\":\"something\",\"excel_edition\":\"win\",\"excel_structure_or_data\":\"data\",\"json_structure_or_data\":\"data\",\"json_unicode\":\"something\",\"latex_caption\":\"something\",\"latex_structure_or_data\":\"structure_and_data\",\"latex_structure_caption\":\"Estrutura da tabela @TABLE@\",\"latex_structure_continued_caption\":\"Estrutura da tabela @TABLE@ (continuação)\",\"latex_structure_label\":\"tab:@TABLE@-structure\",\"latex_relation\":\"something\",\"latex_comments\":\"something\",\"latex_mime\":\"something\",\"latex_columns\":\"something\",\"latex_data_caption\":\"Conteúdo da tabela @TABLE@\",\"latex_data_continued_caption\":\"Conteúdo da tabela @TABLE@ (continuação)\",\"latex_data_label\":\"tab:@TABLE@-data\",\"latex_null\":\"\\\\textit{NULL}\",\"mediawiki_structure_or_data\":\"data\",\"mediawiki_caption\":\"something\",\"mediawiki_headers\":\"something\",\"htmlword_structure_or_data\":\"structure_and_data\",\"htmlword_null\":\"NULL\",\"ods_null\":\"NULL\",\"ods_structure_or_data\":\"data\",\"odt_structure_or_data\":\"structure_and_data\",\"odt_relation\":\"something\",\"odt_comments\":\"something\",\"odt_mime\":\"something\",\"odt_columns\":\"something\",\"odt_null\":\"NULL\",\"pdf_report_title\":\"\",\"pdf_structure_or_data\":\"data\",\"phparray_structure_or_data\":\"data\",\"sql_include_comments\":\"something\",\"sql_header_comment\":\"\",\"sql_use_transaction\":\"something\",\"sql_compatibility\":\"NONE\",\"sql_structure_or_data\":\"structure_and_data\",\"sql_create_table\":\"something\",\"sql_auto_increment\":\"something\",\"sql_create_view\":\"something\",\"sql_create_trigger\":\"something\",\"sql_backquotes\":\"something\",\"sql_type\":\"INSERT\",\"sql_insert_syntax\":\"both\",\"sql_max_query_size\":\"50000\",\"sql_hex_for_binary\":\"something\",\"sql_utc_time\":\"something\",\"texytext_structure_or_data\":\"structure_and_data\",\"texytext_null\":\"NULL\",\"yaml_structure_or_data\":\"data\",\"\":null,\"as_separate_files\":null,\"csv_removeCRLF\":null,\"excel_removeCRLF\":null,\"json_pretty_print\":null,\"htmlword_columns\":null,\"ods_columns\":null,\"sql_dates\":null,\"sql_relation\":null,\"sql_mime\":null,\"sql_disable_fk\":null,\"sql_views_as_tables\":null,\"sql_metadata\":null,\"sql_drop_database\":null,\"sql_drop_table\":null,\"sql_if_not_exists\":null,\"sql_simple_view_export\":null,\"sql_view_current_user\":null,\"sql_or_replace_view\":null,\"sql_procedure_function\":null,\"sql_truncate\":null,\"sql_delayed\":null,\"sql_ignore\":null,\"texytext_columns\":null}'),
(2, 'root', 'server', 'Banco de dados LEM', '{\"quick_or_custom\":\"quick\",\"what\":\"sql\",\"db_select[]\":[\"jogosdolem\",\"newschema\",\"phpmyadmin\"],\"aliases_new\":\"\",\"output_format\":\"sendit\",\"filename_template\":\"@SERVER@\",\"remember_template\":\"on\",\"charset\":\"utf-8\",\"compression\":\"none\",\"maxsize\":\"\",\"codegen_structure_or_data\":\"data\",\"codegen_format\":\"0\",\"csv_separator\":\",\",\"csv_enclosed\":\"\\\"\",\"csv_escaped\":\"\\\"\",\"csv_terminated\":\"AUTO\",\"csv_null\":\"NULL\",\"csv_columns\":\"something\",\"csv_structure_or_data\":\"data\",\"excel_null\":\"NULL\",\"excel_columns\":\"something\",\"excel_edition\":\"win\",\"excel_structure_or_data\":\"data\",\"json_structure_or_data\":\"data\",\"json_unicode\":\"something\",\"latex_caption\":\"something\",\"latex_structure_or_data\":\"structure_and_data\",\"latex_structure_caption\":\"Estrutura da tabela @TABLE@\",\"latex_structure_continued_caption\":\"Estrutura da tabela @TABLE@ (continuação)\",\"latex_structure_label\":\"tab:@TABLE@-structure\",\"latex_relation\":\"something\",\"latex_comments\":\"something\",\"latex_mime\":\"something\",\"latex_columns\":\"something\",\"latex_data_caption\":\"Conteúdo da tabela @TABLE@\",\"latex_data_continued_caption\":\"Conteúdo da tabela @TABLE@ (continuação)\",\"latex_data_label\":\"tab:@TABLE@-data\",\"latex_null\":\"\\\\textit{NULL}\",\"mediawiki_structure_or_data\":\"data\",\"mediawiki_caption\":\"something\",\"mediawiki_headers\":\"something\",\"htmlword_structure_or_data\":\"structure_and_data\",\"htmlword_null\":\"NULL\",\"ods_null\":\"NULL\",\"ods_structure_or_data\":\"data\",\"odt_structure_or_data\":\"structure_and_data\",\"odt_relation\":\"something\",\"odt_comments\":\"something\",\"odt_mime\":\"something\",\"odt_columns\":\"something\",\"odt_null\":\"NULL\",\"pdf_report_title\":\"\",\"pdf_structure_or_data\":\"data\",\"phparray_structure_or_data\":\"data\",\"sql_include_comments\":\"something\",\"sql_header_comment\":\"\",\"sql_use_transaction\":\"something\",\"sql_compatibility\":\"NONE\",\"sql_structure_or_data\":\"structure_and_data\",\"sql_create_table\":\"something\",\"sql_auto_increment\":\"something\",\"sql_create_view\":\"something\",\"sql_create_trigger\":\"something\",\"sql_backquotes\":\"something\",\"sql_type\":\"INSERT\",\"sql_insert_syntax\":\"both\",\"sql_max_query_size\":\"50000\",\"sql_hex_for_binary\":\"something\",\"sql_utc_time\":\"something\",\"texytext_structure_or_data\":\"structure_and_data\",\"texytext_null\":\"NULL\",\"yaml_structure_or_data\":\"data\",\"\":null,\"as_separate_files\":null,\"csv_removeCRLF\":null,\"excel_removeCRLF\":null,\"json_pretty_print\":null,\"htmlword_columns\":null,\"ods_columns\":null,\"sql_dates\":null,\"sql_relation\":null,\"sql_mime\":null,\"sql_disable_fk\":null,\"sql_views_as_tables\":null,\"sql_metadata\":null,\"sql_drop_database\":null,\"sql_drop_table\":null,\"sql_if_not_exists\":null,\"sql_simple_view_export\":null,\"sql_view_current_user\":null,\"sql_or_replace_view\":null,\"sql_procedure_function\":null,\"sql_truncate\":null,\"sql_delayed\":null,\"sql_ignore\":null,\"texytext_columns\":null}');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Despejando dados para a tabela `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-10-15 18:13:45', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"pt_BR\"}');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Índices de tabela `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Índices de tabela `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Índices de tabela `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Índices de tabela `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Índices de tabela `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Índices de tabela `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Índices de tabela `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Índices de tabela `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Índices de tabela `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Índices de tabela `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Índices de tabela `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Índices de tabela `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Índices de tabela `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
