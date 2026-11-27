@ECHO OFF
SET count=0

:: Verifica cmd's abertos procurando pelo titulo EXATO 'Servidor Node - Jogos LEM'.
tasklist /V /FI "IMAGENAME eq cmd.exe" | find /I "Servidor Node - Jogos LEM" >NUL
TITLE Servidor Node - Jogos LEM

:: Se encontrar janela rodando retorno = 0
IF %ERRORLEVEL% EQU 0 (
    ECHO Servidor ja encontrado! Abrindo navegador...
    START "" "http://localhost:3000"
    GOTO :FIM
)

:: Caso não encontre o servidor funcionando
START "MySQL Server" /D "C:\xampp\mysql\bin" "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone
timeout /t 5

:: Tentativas de rodar o node em diversos caminhos 
CALL "C:\Program Files\nodejs\nodevars.bat" 2>NUL
IF %ERRORLEVEL% EQU 0 (
    echo Iniciando node...
    node index.js
    pause
    GOTO :FIM
)
echo Tentativa 1 - Nao encontrado: C:\Program Files\nodejs\nodevars.bat.


CALL "C:\Program Files (x86)\nodejs\nodevars.bat" 2>NUL
IF %ERRORLEVEL% EQU 0 (
    echo Iniciando node (Versao 32-bit)...
    node index.js
    pause
    GOTO :EOF
)
echo Tentativa 2 - Nao encontrado: C:\Program Files (x86)\nodejs\nodevars.bat.


CALL "C:\node\nodevarsJogos.bat" 2>NUL
IF %ERRORLEVEL% EQU 0 (
    echo Iniciando node...
    node index.js
    pause
    GOTO :FIM
)
echo Tentativa 3 - Nao encontrado: C:\node\nodevarsJogos.bat


CALL "C:\node\nodevars.bat" 2>NUL
IF %ERRORLEVEL% EQU 0 (
    echo Iniciando node...
    node index.js
    pause
    GOTO :FIM
)
echo Tentativa 4 - Nao encontrado: C:\node\nodevars.bat nao foi encontrado.


echo nodevars nao encontrado pelo start.bat
pause

:FIM