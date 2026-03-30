*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    select Options By  [name="my-select"]  label  Two     delay=0.1 s
    Type Text  [name="my-datalist"]  Seattle
    Check Checkbox    id=my-check-2
    Check Checkbox    id=my-radio-2 
    Evaluate JavaScript    css=input[name="my-colors"]    (el) => { el.value = '#ff0000'; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }
    Type Text  [name="my-date"]  30-03-2026
    Fill Text    css=input[name="my-range"]    8
    Click  text=submit
    
