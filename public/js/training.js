const socket = io();
const btnTraining = document.getElementById('btn_train');
const formTrain = document.getElementById('form_Train');

formTrain.addEventListener("submit", training);

socket.on('connect',()=>{
    textConsole(socket.id);
    socket.emit('trainStartus','');
    socket.on('trainStartus',(msg)=>{
        if(!msg){
            btnTraining.disabled = false;
        }
        else {
            btnTraining.disabled = true;
        }
    });
});

async function training(event){
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    const formData = new FormData(form);
    const responseData = await postAPI({ url, formData });
}

async function postAPI({ url, formData }){
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
        body: formDataJsonString
    };

	const response = await fetch(url, fetchOptions);
    if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
    return response.json();
}

function textConsole(msg){
    const txtConsole = document.getElementById('console');
    txtConsole.scrollTop = txtConsole.scrollHeight;
    txtConsole.append(msg+'\n');
}