*** Settings ***
Library     Browser    auto_closing_level=KEEP
Library     Collections
Library     CryptoLibrary    variable_decryption=True
Resource    omasivu_key_words.robot
Resource    ../recources/secrets.robot
Variables   ../load_env.py

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No
    New Page       https://mikapoihyte.norwayeast.cloudapp.azure.com/login.html
    Wait For Elements State    form.loginForm    visible
    Type Text      form.loginForm [name="username"]    ${USERNAME}
    Type Secret    form.loginForm [name="password"]    $PASSWORD
    Click          form.loginForm input[type="submit"]
    Wait For Condition    url    ==    https://mikapoihyte.norwayeast.cloudapp.azure.com/rajapinnat/paivakirja.html
    Type Text    id=caloriesEatenInput    2800          delay=0.05s
    Type Text    id=caloriesUsedInput  2250             delay=0.05s
    Type Text    id=stepsInput  11205                   delay=0.05s
    Type Text    id=weightTodayInput  95                delay=0.05s
    Type Text    id=moodInput  Testailu fiilis          delay=0.05s
    Type Text    id=weightInput  103                    delay=0.05s
    Type Text    id=sleepHoursInput  5                  delay=0.05s
    Type Text    id=notesInput  Koulussa tehnyt kouluhommia ja testaillut toimintaa     delay=0.05s
    Type Text    id=entryDateInput  31-03-2026          delay=0.05s
    click  text=Lisää merkintä     