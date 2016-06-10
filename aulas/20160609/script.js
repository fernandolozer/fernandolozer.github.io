
		var mySid = null;	//id do servidor
		var send = null;	//botão de envio
		var ws = null;		//conexão
		var ta = null;		//texto
		var username = null;//nickname
		var friendname= null;

		onload = function(){
			username = prompt('Qual seu nome?');
			friendname = prompt('Qual nome do amigo?');
			ws = new WebSocket("ws://achex.ca:4010");
			send = document.getElementById('send');
			ta = document.getElementById('ta');

			send.addEventListener("click", function(){
				ws.send('{"to":"'+friendname+'","msg":"'+ta.value+'"}');
				document.getElementById('log').innerHTML+="<br>Eu: "+ ta.value;
			});		

			//Socket Listeners
			ws.onmessage = function(evt){
				console.log(evt);
				var response = JSON.parse(evt.data);
				if(!mySid){
					mySid = response.SID;
					setTimeout(function(){
						ws.send('{"setID":"'+username+'","passwd":"none"}');
					},200);
				}else if(response.msg){
					document.getElementById('log').innerHTML+="<br>"+response.FROM + ': '+ response.msg;
				}
			}
		}
