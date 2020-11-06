let choices = ["-", "MOUSE_UP", "MOUSE_DOWN", "MOUSE_LEFT", "MOUSE_RIGHT",
 "ENTER", "ESCAPE", "SPACE", "TAB", "SHIFT", "CONTROL",
 "ALT", "UP", "DOWN", "LEFT", "RIGHT"]

let f = "F"
let all_f = []

for (let i = 1; i<13; i++){
    all_f.push(f+i)
}

let all_choices = [...choices, ...all_f]

let min = 0
let max = all_choices.length

for (let i = min; i < max; i++) {
    $(".select").append(`<option value=${all_choices[i]}>${all_choices[i]}</option>`)
}

// Choices by default
//document.getElementById("select_rect1").value = "MOUSE_LEFT";
//document.getElementById("select_rect2").value = "MOUSE_UP";
