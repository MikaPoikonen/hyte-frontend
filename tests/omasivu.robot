*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    omasivu_key_words.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://mikapoihyte.norwayeast.cloudapp.azure.com/login.html
    Wait For Elements State    form.loginForm    visible
    Type Text    form.loginForm [name="username"]        ${Username}    delay=0.1 s 
    Type Secret  form.loginForm [name="password"]    $Password      delay=0.1 s
    Click    form.loginForm input[type="submit"]
    Wait For Condition    url    ==    https://mikapoihyte.norwayeast.cloudapp.azure.com/rajapinnat/paivakirja.html
  
