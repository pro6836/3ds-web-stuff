// classes don't work on the 3DS browser, so I had to make a workaround with objects
function createKeyboard(element) {
    var kb = {}
    kb.caps = false

    element.classList.add("virtual-keyboard")

    // QWERTY layout
    registerCharKey("`","~")
    registerCharKey("1","!")
    registerCharKey("2","@")
    registerCharKey("3","#")
    registerCharKey("4","$")
    registerCharKey("5","%")
    registerCharKey("6","^")
    registerCharKey("7","&")
    registerCharKey("8","*")
    registerCharKey("9","(")
    registerCharKey("0",")")
    addNewLine();
    registerSpecialCharKey("TAB","\u0009")
    registerCharKey("q")
    registerCharKey("w")
    registerCharKey("e")
    registerCharKey("r")
    registerCharKey("t")
    registerCharKey("y")
    registerCharKey("u")
    registerCharKey("i")
    registerCharKey("o")
    registerCharKey("p")
    registerCharKey("[","{")
    registerCharKey("]","}")
    registerCharKey("\\","|")
    addNewLine()
    registerSwitchKey("Caps Lock",setCaps)
    registerCharKey("a")
    registerCharKey("s")
    registerCharKey("d")
    registerCharKey("f")
    registerCharKey("g")
    registerCharKey("h")
    registerCharKey("j")
    registerCharKey("k")
    registerCharKey("l")
    registerCharKey(";",":")
    registerCharKey("'","\"")
    addNewLine()
    registerCharKey("z")
    registerCharKey("x")
    registerCharKey("c")
    registerCharKey("v")
    registerCharKey("b")
    registerCharKey("n")
    registerCharKey("m")
    registerCharKey(",","<")
    registerCharKey(".",">")
    registerCharKey("/","?")

    kb.focusElement = function (elm){
        kb.focusedElement = elm;
    }

    function typeChar(char){
        const pos = element.selectionStart;
        element.value = input.value.substr(0, cursorPos) + char + input.value.substr(cursorPos);
    }

    function setCaps(enabled){
        kb.caps = enabled
        const charKeys = document.getElementsByClassName("kb-char-key")
        for(var i=0;i<charKeys.length;i++){
            const key = charKeys[i]
            if(enabled) key.innerText = key.innerText.toUpperCase()
            else key.innerText = key.innerText.toLowerCase()
        }
    }

    function addNewLine(){
        element.appendChild(document.createElement("br"));
    }

    function registerSwitchKey(label,callback){
        const elm = document.createElement("button")
        elm.classList.add("kb-key","kb-switch-key")
        elm.innerText = label;
        var enabled = false
        elm.addEventListener("click",function (){
            enabled = !enabled;
            if(enabled) elm.style.backgroundColor = "red"
            else elm.style.backgroundColor = ""

            callback(enabled)
        })
        element.appendChild(elm)
    }

    function registerCharKey(normal,shift){
        shift = shift | normal.toUpperCase();
        const elm = document.createElement("button")
        elm.classList.add("kb-key","kb-char-key")
        elm.innerText = normal

        elm.addEventListener("click",function(){
            if(kb.focusedElement){
                kb.focusedElement.value += normal;
            }
        })

        element.appendChild(elm)
    }

    function registerSpecialCharKey(label,char){
        const elm = document.createElement("button")
        elm.classList.add("kb-key","kb-special-char-key")
        elm.innerText = label

        elm.addEventListener("click",function(){
            if(kb.focusedElement){
                kb.focusedElement.value += char;
            }
        })

        element.appendChild(elm)
    }

    return kb
}

var virtualKeyboard;

window.addEventListener("load",function(){
    const foundKeyboard = document.getElementById("keyboard");
    if(foundKeyboard){
        virtualKeyboard = createKeyboard(foundKeyboard)
    }
})